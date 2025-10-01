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

export interface NYTPuzzle {
  author: string;
  editor: string;
  format_type: string;
  print_date: string;
  publish_type: string;
  puzzle_id: number;
  title: string;
  version: number;
  percent_filled: number;
  solved: boolean;
  star: string | null;
}

// NYT API

export interface NYTPuzzlesResponse {
  status: string;
  results: NYTPuzzle[];
}

export interface BoardRaw {
  cells: ({ guess: string; timestamp: number } | { blank: boolean })[];
}

export interface NYTSolveResponse {
  board: BoardRaw;
  calcs: {
    percentFilled: number;
    secondsSpentSolving: number;
    solved: boolean;
  };
  firsts: {
    opened: number;
    solved: number;
  };
  lastCommitID: string;
  puzzleID: number;
  timestamp: number;
  userID: number;
  minGuessTime: number;
  lastSolve: number;
}
