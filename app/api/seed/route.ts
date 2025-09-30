import postgres from "postgres";
import { users, puzzles, solves } from "@/app/lib/placeholder-data";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

async function seedUsers(client = sql) {
  await client`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(
      (name) => client`
      INSERT INTO users (name)
      VALUES (${name})
      ON CONFLICT (name) DO NOTHING;
    `
    )
  );

  return insertedUsers;
}

async function seedPuzzles(client = sql) {
  await client`
    CREATE TABLE IF NOT EXISTS puzzles (
      id INT PRIMARY KEY,
      date DATE NOT NULL UNIQUE,
      board VARCHAR(255) NOT NULL,
      rows INT NOT NULL,
      cols INT NOT NULL
    );
  `;

  const insertedPuzzles = await Promise.all(
    puzzles.map(
      (puzzle) => client`
      INSERT INTO puzzles (id, date, board, rows, cols)
      VALUES (${puzzle.id}, ${puzzle.date}, ${puzzle.board}, ${puzzle.rows}, ${puzzle.cols})
      ON CONFLICT (id) DO NOTHING;
    `
    )
  );

  return insertedPuzzles;
}

async function seedSolves(client = sql) {
  await client`
    CREATE TABLE IF NOT EXISTS solves (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      puzzle_id INT NOT NULL REFERENCES puzzles(id) ON DELETE CASCADE,
      seconds INT NOT NULL,
      UNIQUE(user_id, puzzle_id)
    );
  `;

  const [user] = await client`SELECT id FROM users WHERE name = ${"shapes"}`;

  if (!user) {
    throw new Error("shapes user not found");
  }

  const shapesId = user.id;

  const insertedSolves = await Promise.all(
    solves.map(
      (solve) => client`
      INSERT INTO solves (user_id, puzzle_id, seconds)
      VALUES (${shapesId}, ${solve.puzzle_id}, ${solve.seconds})
      ON CONFLICT (user_id, puzzle_id) DO NOTHING;
    `
    )
  );

  return insertedSolves;
}

export async function GET() {
  // Do some check here
  try {
    await sql.begin(async (transaction) => {
      await seedUsers(transaction);
      await seedPuzzles(transaction);
      await seedSolves(transaction);
    });

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
