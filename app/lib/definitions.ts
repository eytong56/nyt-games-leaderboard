export type User = "shapes" | "tcng";

export type PuzzleBoard = {
  rows: number;
  cols: number;
  board: string;
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
  id: string;
  name: string;
  nyt_s: string;
};

export type PuzzlesTable = {
  id: number;
  date: string;
  rows: number;
  columns: number;
  puzzle_board: string;
};

export type SolvesTable = {
  id: string;
  user_id: string;
  puzzle_id: number;
  seconds: number;
};
