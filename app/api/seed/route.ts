import postgres from "postgres";
import { users, puzzles, solves } from "@/app/lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(
      (name) => sql`
      INSERT INTO users (name)
      VALUES (${name})
    `
    )
  );

  return insertedUsers;
}

async function seedPuzzles() {
  await sql`
    CREATE TABLE IF NOT EXISTS puzzles (
      id INT PRIMARY KEY,
      date DATE NOT NULL,
      board VARCHAR(255) NOT NULL
      rows INT NOT NULL,
      cols INT NOT NULL,
    );
  `;

  const insertedPuzzles = await Promise.all(
    puzzles.map(
      (puzzle) => sql`
      INSERT INTO puzzles (id, date, board, rows, cols)
      VALUES (${puzzle.id}), ${puzzle.date}, ${puzzle.board}, ${puzzle.rows}, ${puzzle.cols})
      ON CONFLICT (id) DO NOTHING;
    `
    )
  );

  return insertedPuzzles;
}

async function seedSolves() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      puzzle_id INT NOT NULL REFERENCES puzzles(id) ON DELETE CASCADE,
      seconds INT NOT NULL
    );
  `;

  const [user] = await sql`SELECT id FROM users WHERE name = 'shapes'`;

  if (!user) {
    throw new Error("shapes user not found");
  }

  const shapesId = user.id;

  const insertedSolves = await Promise.all(
    solves.map(
      (solve) => sql`
      INSERT INTO solves (user_id, puzzle_id, seconds)
      VALUES (${shapesId}), ${solve.puzzle_id}, ${solve.seconds})
      ON CONFLICT (id) DO NOTHING;
    `
    )
  );

  return insertedSolves;
}

export async function GET() {
  try {
    await sql.begin(async (sql) => [seedUsers(), seedPuzzles(), seedSolves()]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
