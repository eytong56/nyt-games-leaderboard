import {
  DailyBoard,
  Entry,
  PuzzlesTable,
  SolvesTable,
} from "@/app/lib/definitions";

const users: string[] = ["shapes", "tcng"];

const puzzles: PuzzlesTable[] = [
  {
    id: 23148,
    date: "2025-09-15",
    board: "#DIRTGENAIOLDIEAVID#TEA##",
    rows: 5,
    cols: 5,
  },
  {
    id: 23150,
    date: "2025-09-16",
    board: "HITCHIDAHOTEXASMAINEELS##",
    rows: 5,
    cols: 5,
  },
  {
    id: 23169,
    date: "2025-09-17",
    board: "#SOSO#HUNKDATESIKEA#PERK#",
    rows: 5,
    cols: 5,
  },
  {
    id: 23092,
    date: "2025-09-18",
    board: "CHI##TOWN#ORIONSALSA#SLEW",
    rows: 5,
    cols: 5,
  },
  {
    id: 23109,
    date: "2025-09-19",
    board: "FLAKELILACAMINOIBET#RON##",
    rows: 5,
    cols: 5,
  },
  {
    id: 23154,
    date: "2025-09-20",
    board: "###FIFE##MOOED#MEOWEDFANTASYSNUB###TABASCOONALERTPARLAYS",
    rows: 8,
    cols: 7,
  },
];

const solves: SolvesTable[] = [
  {
    id: "placeholder",
    user_id: "placeholder",
    puzzle_id: 23148,
    seconds: 32,
  },
  {
    id: "placeholder",
    user_id: "placeholder",
    puzzle_id: 23150,
    seconds: 62,
  },
  {
    id: "placeholder",
    user_id: "placeholder",
    puzzle_id: 23092,
    seconds: 205,
  },
  {
    id: "placeholder",
    user_id: "placeholder",
    puzzle_id: 23109,
    seconds: 38,
  },
  {
    id: "placeholder",
    user_id: "placeholder",
    puzzle_id: 23154,
    seconds: 196,
  },
];

const dailyBoards: DailyBoard[] = [
  {
    date: "2025-09-15",
    puzzle_board: {
      board: puzzles[0].board,
      rows: puzzles[0].rows,
      cols: puzzles[0].cols,
    },
    entries: [
      {
        user: "shapes",
        stat: 38,
        rank: 1,
      },
      {
        user: "tcng",
        stat: 68,
        rank: 2,
      },
    ],
  },
  {
    date: "2025-09-16",
    puzzle_board: {
      board: puzzles[1].board,
      rows: puzzles[1].rows,
      cols: puzzles[1].cols,
    },
    entries: [
      {
        user: "tcng",
        stat: 56,
        rank: 1,
      },
      {
        user: "shapes",
        stat: 62,
        rank: 2,
      },
    ],
  },
  {
    date: "2025-09-17",
    puzzle_board: {
      board: puzzles[2].board,
      rows: puzzles[2].rows,
      cols: puzzles[2].cols,
    },
  },
  {
    date: "2025-09-18",
    puzzle_board: {
      board: puzzles[3].board,
      rows: puzzles[3].rows,
      cols: puzzles[3].cols,
    },
    entries: [
      {
        user: "tcng",
        stat: 176,
        rank: 1,
      },
      {
        user: "shapes",
        stat: 205,
        rank: 2,
      },
    ],
  },
  {
    date: "2025-09-19",
    puzzle_board: {
      board: puzzles[4].board,
      rows: puzzles[4].rows,
      cols: puzzles[4].cols,
    },
    entries: [
      {
        user: "shapes",
        stat: 38,
        rank: 1,
      },
      {
        user: "tcng",
        stat: 38,
        rank: 1,
      },
    ],
  },
  {
    date: "2025-09-20",
    puzzle_board: {
      board: puzzles[5].board,
      rows: puzzles[5].rows,
      cols: puzzles[5].cols,
    },
    entries: [
      {
        user: "shapes",
        stat: 196,
        rank: 1,
      },
      {
        user: "shapes",
        stat: 203,
        rank: 2,
      },
    ],
  },
  {
    date: "2025-09-21",
    puzzle_board: undefined,
    entries: [
      {
        user: "shapes",
        stat: 60,
        rank: 1,
      },
    ],
  },
];

const alltimeStats: Entry[] = [
  {
    user: "shapes",
    stat: 205,
    rank: 1,
  },
  {
    user: "tcng",
    stat: 178,
    rank: 2,
  },
];

const yearStats: Entry[] = [
  {
    user: "tcng",
    stat: 81,
    rank: 1,
  },
  {
    user: "shapes",
    stat: 60,
    rank: 2,
  },
];

const monthStats: Entry[] = [
  {
    user: "tcng",
    stat: 11,
    rank: 1,
  },
  {
    user: "shapes",
    stat: 11,
    rank: 1,
  },
];

export { puzzles, solves, users, dailyBoards, alltimeStats, yearStats, monthStats };
