export type User = "shapes" | "tcng";

export type PuzzleBoard = {
  board: string;
  rows: number;
  cols: number;
};

export type Entry = {
  user: User;
  stat: number;
  rank: number;
};

export type DailyBoard = {
  date: string;
  puzzle_board?: PuzzleBoard;
  entries?: Entry[];
};

// Database types

export type UsersTable = {
  id: string; // UUID
  name: string;
  // token_hash: string;
};

export type PuzzlesTable = {
  id: number;
  date: string;
  board: string;
  rows: number;
  cols: number;
};

export type SolvesTable = {
  id: string;
  user_id: string;
  puzzle_id: number;
  seconds: number;
};
