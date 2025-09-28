import { DailyBoard, Entry } from "@/app/lib/definitions";
const dailyBoards: DailyBoard[] = [
  {
    date: "2025-09-15",
    puzzle_board: {
      rows: 5,
      cols: 5,
      board: "#DIRTGENAIOLDIEAVID#TEA##",
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
      rows: 5,
      cols: 5,
      board: "HITCHIDAHOTEXASMAINEELS##",
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
      rows: 5,
      cols: 5,
      board: "#SOSO#HUNKDATESIKEA#PERK#",
    },
  },
  {
    date: "2025-09-18",
    puzzle_board: {
      rows: 5,
      cols: 5,
      board: "CHI##TOWN#ORIONSALSA#SLEW",
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
      rows: 5,
      cols: 5,
      board: "FLAKELILACAMINOIBET#RON##",
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
      rows: 8,
      cols: 7,
      board: "###FIFE##MOOED#MEOWEDFANTASYSNUB###TABASCOONALERTPARLAYS",
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

export { dailyBoards, alltimeStats, yearStats, monthStats };
