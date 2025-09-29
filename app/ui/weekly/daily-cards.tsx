import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import {
  dateToStringLocal,
  getOffsetDate,
  formatDate,
  formatLink,
  determineWinner,
} from "@/app/lib/utils";
import Leaderboard from "@/app/ui/leaderboard";
import Crossword from "@/app/ui/weekly/crossword";
import { DailyBoard, PuzzleBoard } from "@/app/lib/definitions";
import Crown from "@/app/ui/crown";
import { fetchWeek } from "@/app/lib/data";

const placeholderBoard: PuzzleBoard = {
  rows: 2,
  cols: 2,
  board: "#   ",
};

export async function CardWrapper({ weekStartDate }: { weekStartDate: Date }) {
  const dailyBoards = await fetchWeek(
    dateToStringLocal(weekStartDate),
    dateToStringLocal(getOffsetDate(weekStartDate, 6))
  );
  const cards = dailyBoards.map((dailyBoard) => {
    return <Card key={dailyBoard.date} dailyBoard={dailyBoard} />;
  });
  return <div className="w-full flex flex-row flex-wrap gap-4">{cards}</div>;
}

export function Card({ dailyBoard }: { dailyBoard: DailyBoard }) {
  const { date, puzzle_board, entries } = dailyBoard;
  const { dayOfWeek, formattedDate } = formatDate(date);

  return (
    <div className="grow-1 flex flex-col items-center min-w-48 max-w-96 gap-6 pt-6 pb-10 px-6 bg-white rounded-lg border border-gray-400 hover:drop-shadow-[0_3px_0] drop-shadow-neutral-400">
      <div className="flex flex-col items-center gap-3">
        <Crown winner={determineWinner(entries)} />
        <h3>
          <span className="font-semibold">{dayOfWeek},</span> {formattedDate}
        </h3>
      </div>
      <Leaderboard entries={entries} type="seconds" />
      <div className="grow flex flex-col justify-center">
        <Crossword
          puzzleBoard={
            !puzzle_board || !entries || entries.length < 2
              ? placeholderBoard
              : puzzle_board
          }
        />
      </div>
      <a
        href={formatLink(date)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center gap-1 border-b border-b-gray-500 font-light text-sm text-gray-500 hover:border-b-black hover:text-black"
      >
        <ArrowUpRightIcon weight="regular" size={14} />
        <div>Link to puzzle</div>
      </a>
    </div>
  );
}
