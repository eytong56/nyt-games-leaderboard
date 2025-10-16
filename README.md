# Custom NYT Games Leaderboard
A custom NYT Games leaderboard for my friends and I, built using Next.js with TypeScript, PostgreSQL, and Tailwind CSS. Deployed and hosted on Vercel (with Neon) at [nyt-games-leaderboard.vercel.app](https://nyt-games-leaderboard.vercel.app/)

## Motivation
The current NYT Games leaderboard is no longer supported on desktop (mobile-only), and only shows rankings day-by-day. I want to be able to see how I'm doing against my friends across the entire week, month, or even year without having to manually count.

## Requirements for MVP
- Ability to see head-to-head rankings for all-time, the current year, and the current month.
- Visual overview of the rankings for the week, with easy navigation between consecutive weeks and dropdown to select a specific week/date.
    - Can quickly view the Mini puzzle board (for discussion/reminder), and quickly navigate to the actual puzzle page.
- Automated daily sync and manual sync button (to backfill or when solving older Minis).

## Visual Inspiration

- Reminiscent of the NYT News and Games desktop sites and mobile apps to invoke the feeling of still being on the NYT site.
- Rounded edges, harsh shadows, gray-scale with pops of colors.

# Implementation Details
## Frontend
Created server components that query the database directly, and utilized `<Suspense>` around data heavy server components to improve user experience while puzzle and solve data is being fetched from the database.

Used client components for navigation so that the interface remains interactive while data is streaming in.

## Backend

Most challenging part of the implementation was making multiple queries to the external NYT Games API, and filtering out unnecessary information as to not overwhelm the endpoint and fetch redundant information. Relevant information from the API is then inserted into my database.

The database includes: 
- `users` table to store users on the leaderboards.
- `puzzles` table to store information about each puzzle including date, puzzle_id, and the puzzle board itself.
- `solves` table to store each user's solve statistics for puzzles.

