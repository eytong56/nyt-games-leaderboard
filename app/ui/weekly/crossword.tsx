import { PuzzleBoard } from "@/app/lib/definitions";

export default function Crossword({
  puzzleBoard,
}: {
  puzzleBoard: PuzzleBoard;
}) {
  const { rows, cols, board } = puzzleBoard;
  if (rows * cols !== board.length) {
    return <div>Invalid crossword board!</div>;
  }
  const cells = board.split("").map((letter, index) => {
    return (
      <div
        key={index}
        className={`w-5 h-5 flex justify-center items-center ${
          letter === "#" ? "bg-black" : "bg-white"
        } border-[0.5px] border-black`}
      >
        {letter.toUpperCase()}
      </div>
    );
  });
  return (
    <div
      className={`w-max grid gap-0 border border-black`}
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {cells}
    </div>
  );
}
