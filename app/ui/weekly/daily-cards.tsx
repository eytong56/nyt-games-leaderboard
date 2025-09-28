import { CrownSimpleIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { formatDate } from "@/app/lib/utils";
import Leaderboard from "@/app/ui/leaderboard";
import Crossword from "@/app/ui/weekly/crossword";

export function CardWrapper() {
  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      <Card dateStr="2025-09-15" />
      <Card dateStr="2025-09-16" />
      <Card dateStr="2025-09-17" />
      <Card dateStr="2025-09-18" />
      <Card dateStr="2025-09-19" />
      <Card dateStr="2025-09-20" />
      <Card dateStr="2025-09-21" />
    </div>
  );
}

const crosswordPlaceholder = {
  rows: 5,
  cols: 5,
  board: [
    "",
    "D",
    "I",
    "R",
    "T",
    "G",
    "E",
    "N",
    "A",
    "I",
    "O",
    "L",
    "D",
    "I",
    "E",
    "A",
    "V",
    "I",
    "D",
    "",
    "T",
    "E",
    "A",
    "",
    "",
  ],
};

export function Card({ dateStr }: { dateStr: string }) {
  const { dayOfWeek, formattedDate } = formatDate(dateStr);

  return (
    <div className="grow-1 flex flex-col items-center min-w-48 max-w-96 gap-6 pt-6 pb-10 px-6 bg-white rounded-lg border border-gray-400">
      <div className="flex flex-col items-center gap-3">
        <CrownSimpleIcon weight="regular" size={24} />
        <h3>
          <span className="font-semibold">{dayOfWeek},</span> {formattedDate}
        </h3>
      </div>
      <Leaderboard />
      {/* <div className="w-36 h-36 border-2 border-black">Crossword</div> */}
      <Crossword crossword={crosswordPlaceholder} />
      <a
        href=""
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
