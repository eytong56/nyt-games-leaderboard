"use server";

import postgres from "postgres";
import {
  User,
  NYTPuzzlesResponse,
  NYTPuzzle,
  NYTSolveResponse,
  BoardRaw,
} from "./definitions";
import { revalidatePath } from "next/cache";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });
const BASE = "https://www.nytimes.com/svc/crosswords";
const COMMON_DIMENSIONS = [
  { rows: 5, cols: 5 },
  { rows: 7, cols: 7 },
  { rows: 8, cols: 7 },
  { rows: 7, cols: 8 },
  { rows: 5, cols: 6 },
  { rows: 9, cols: 9 },
  { rows: 6, cols: 9 },
];

async function getUserId(user: User) {
  const userResult = await sql`
      SELECT id FROM users WHERE name = ${user}
    `;

  if (userResult.length === 0) {
    throw new Error("User not found");
  }
  return userResult[0].id;
}

async function getAllPuzzlesRaw(
  dateRange: { startDate: string; endDate: string },
  cookieValue: string
) {
  const params = new URLSearchParams({
    publish_type: "mini",
    sort_order: "asc",
    sort_by: "print_date",
    date_start: dateRange.startDate,
    date_end: dateRange.endDate,
  });
  const url = new URL(`${BASE}/v3/puzzles.json?${params}`);

  const response = await fetch(url, {
    headers: {
      Cookie: `NYT-S=${cookieValue}; nyt-gdpr=0`,
    },
  });

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }
  const result: NYTPuzzlesResponse = await response.json();
  return result.results;
}

function filterSolvedPuzzles(puzzles: NYTPuzzle[]) {
  const solvedRawPuzzles = puzzles.filter((puzzle) => puzzle.solved);
  const solvedPuzzles = solvedRawPuzzles.map((puzzle) => ({
    date: puzzle.print_date,
    id: puzzle.puzzle_id,
  }));

  return solvedPuzzles;
}

async function filterNewPuzzles(userId: string, allPuzzles: NYTPuzzle[]) {
  const solvedPuzzles = filterSolvedPuzzles(allPuzzles);
  const solvedIds = solvedPuzzles.map((puzzle) => puzzle.id);
  const existingIdsResult = await sql`
      SELECT puzzle_id
      FROM solves
      WHERE user_id = ${userId} AND puzzle_id = ANY(${solvedIds})
    `;

  const existingIds = new Set(existingIdsResult.map((row) => row.puzzle_id));
  const newPuzzles = solvedPuzzles.filter(
    (puzzle) => !existingIds.has(puzzle.id)
  );

  return newPuzzles;
}

function calculateDimensions(boardArr: string[]) {
  const length = boardArr.length;
  for (const { rows, cols } of COMMON_DIMENSIONS) {
    if (rows * cols == length) {
      return { rows, cols };
    }
  }
  return { rows: 1, cols: length };
}

function processBoard(boardRaw: BoardRaw) {
  const boardArr = boardRaw.cells.map((cell) => {
    if ("blank" in cell) {
      return "#";
    } else {
      return cell.guess;
    }
  });
  const { rows, cols } = calculateDimensions(boardArr);
  return { board: boardArr.join(""), rows, cols };
}

async function getSolveData(
  cookieValue: string,
  puzzle: { date: string; id: number }
) {
  const url = new URL(`${BASE}/v6/game/${puzzle.id}.json`);
  const response = await fetch(url, {
    headers: {
      Cookie: `NYT-S=${cookieValue}; nyt-gdpr=0`,
    },
  });
  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }
  const result: NYTSolveResponse = await response.json();
  const seconds = result.calcs.secondsSpentSolving;
  const { board, rows, cols } = processBoard(result.board);
  return { id: puzzle.id, date: puzzle.date, board, rows, cols, seconds };
}

async function insertPuzzleSolves(
  userId: string,
  cookieValue: string,
  puzzles: { date: string; id: number }[]
) {
  const solvesDataRequests = puzzles.map((puzzle) =>
    getSolveData(cookieValue, puzzle)
  );
  const solvesData = await Promise.all(solvesDataRequests);

  console.log(solvesData);

  // Extract arrays for each column
  const ids = solvesData.map((s) => s.id);
  const dates = solvesData.map((s) => s.date);
  const boards = solvesData.map((s) => s.board);
  const rows = solvesData.map((s) => s.rows);
  const cols = solvesData.map((s) => s.cols);
  const seconds = solvesData.map((s) => s.seconds);

  console.log("Inserting puzzles...");
  // Insert puzzles if don't exist
  const puzzlesResult = await sql`
    INSERT INTO puzzles (id, date, board, rows, cols)
    SELECT * FROM UNNEST(
      ${ids}::int[],
      ${dates}::date[],
      ${boards}::text[],
      ${rows}::int[],
      ${cols}::int[]
    )
    ON CONFLICT (id) DO NOTHING
    RETURNING date, id
  `;
  console.log("Num of puzzles inserted:", puzzlesResult.length);

  console.log("Inserting solves...");
  const solvesResult = await sql`
    INSERT INTO solves (user_id, puzzle_id, seconds)
    SELECT ${userId}, puzzle_id, seconds
    FROM UNNEST(
      ${ids}::int[],
      ${seconds}::int[]
    ) AS t(puzzle_id, seconds)
    ON CONFLICT (user_id, puzzle_id) DO NOTHING
    RETURNING *
  `;
  console.log("Num of solves inserted:", solvesResult.length);

  return { puzzlesSynced: puzzlesResult, numSolvesSynced: solvesResult.length };
}

async function syncUser(
  user: User,
  dateRange: { startDate: string; endDate: string }
) {
  try {
    const userId = await getUserId(user);
    const cookieValue =
      user === "shapes" ? process.env.NYT_TOKEN_0! : process.env.NYT_TOKEN_1!;

    const allPuzzlesRaw = await getAllPuzzlesRaw(dateRange, cookieValue);
    const newPuzzles = await filterNewPuzzles(userId, allPuzzlesRaw);
    if (newPuzzles.length === 0) {
      return { puzzlesSynced: [], numSolvesSynced: 0 };
    }
    const stats = await insertPuzzleSolves(userId, cookieValue, newPuzzles);

    return stats;
  } catch (error) {
    throw new Error(`User syncing failed: ${error}`);
  }
}

// startDate and endDate INCLUSIVE
export async function syncData(dateRange: {
  startDate: string;
  endDate: string;
}) {
  try {
    const stats0 = await syncUser("shapes", dateRange);
    const stats1 = await syncUser("tcng", dateRange);

    // Insert sync attempt into metadata
    await sql`
      INSERT INTO sync_metadata (last_sync_status, start_date, end_date, puzzles_synced, solves_synced)
      VALUES ('success', ${dateRange.startDate}, ${dateRange.endDate}, ${
        stats0.puzzlesSynced.length + stats1.puzzlesSynced.length
      }, ${stats0.numSolvesSynced + stats1.numSolvesSynced})
    `;

    revalidatePath("/");
    return {
      success: true,
      stats: {
        puzzlesSynced: [...stats0.puzzlesSynced, ...stats1.puzzlesSynced],
        numSolvesSynced: stats0.numSolvesSynced + stats1.numSolvesSynced,
      },
    };
  } catch (error) {
    console.error("Sync error:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred"
    // Insert sync attempt into metadata
    await sql`
      INSERT INTO sync_metadata (last_sync_status, start_date, end_date, error_message)
      VALUES ('failed', ${dateRange.startDate}, ${dateRange.endDate}, ${message})
    `;

    return {
      success: false,
      error: message,
    };
  }
}
