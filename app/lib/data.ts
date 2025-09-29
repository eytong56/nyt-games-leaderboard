import postgres from "postgres";
import { DailyBoard } from "@/app/lib/definitions";
import { dateToStringUTC } from "@/app/lib/utils";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export async function fetchStats() {
  try {
    const data = await sql`

    `;
  } catch (error) {}
}

export async function fetchWeek(startDate: string, endDate: string) {
  try {
    if (new Date(startDate) > new Date(endDate)) {
      throw new Error("Start date later than end date")
    }
    // Thank you to Claude for this SQL query
    const data = await sql`
      WITH date_series AS (
      -- Generate every date in the range
      SELECT generate_series(
        ${startDate}::date,
        ${endDate}::date,
        '1 day'::interval
      )::date AS date
      ),
      ranked_solves AS (
        -- Pre-calculate ranks for each solve within their puzzle
        SELECT 
          puzzles.id AS puzzle_id,
          puzzles.date,
          puzzles.board,
          puzzles.rows,
          puzzles.cols,
          users.name,
          solves.seconds,
          RANK() OVER (
            PARTITION BY puzzles.id -- Separate ranking for each puzzle
            ORDER BY solves.seconds -- Fastest time = rank 1
          ) as daily_rank
        FROM solves 
        JOIN puzzles ON solves.puzzle_id = puzzles.id 
        JOIN users ON solves.user_id = users.id
      )
      SELECT 
        date_series.date, -- Every date, even if no puzzle
        CASE 
          WHEN ranked_solves.puzzle_id IS NOT NULL THEN
            json_build_object(
              'board', ranked_solves.board,
              'rows', ranked_solves.rows,
              'cols', ranked_solves.cols
            )
          ELSE NULL
        END as puzzle_board,
        COALESCE(
          json_agg(
            json_build_object(
              'user', ranked_solves.name,
              'stat', ranked_solves.seconds,
              'rank', ranked_solves.daily_rank
            ) ORDER BY ranked_solves.daily_rank
          ) FILTER (WHERE ranked_solves.puzzle_id IS NOT NULL),
          '[]'::json -- No puzzle, entries is empty array
        ) as entries
      FROM date_series
      LEFT JOIN ranked_solves ON date_series.date = ranked_solves.date
      GROUP BY date_series.date, ranked_solves.puzzle_id, ranked_solves.board, ranked_solves.rows, ranked_solves.cols
      ORDER BY date_series.date;
    `;
    console.log(data)
    const dailyBoards = data.map(
      (dailyBoard): DailyBoard => ({
        ...dailyBoard,
        date: dateToStringUTC(dailyBoard.date),
      })
    );
    
    return dailyBoards;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the weekly leaderboards.");
  }
}
