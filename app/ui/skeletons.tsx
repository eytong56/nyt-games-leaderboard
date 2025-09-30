import { CrownSimpleIcon } from "@phosphor-icons/react/dist/ssr";

function LeaderboardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <div className="w-36 h-6 bg-neutral-400 opacity-50 rounded-md" />
      <div className="w-36 h-6 bg-neutral-400 opacity-50 rounded-md" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse grow-1 flex flex-col items-center min-w-48 max-w-96 gap-6 pt-6 pb-10 px-6 bg-neutral-300 rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <CrownSimpleIcon
          weight="fill"
          size={24}
          color="#a1a1a1"
          className="opacity-50"
        />
        <div className="w-36 h-6 bg-neutral-400 opacity-50 rounded-md" />
      </div>
      <LeaderboardSkeleton />
      <div className="grow flex flex-col justify-center">
        <div className="w-[42px] h-[42px] bg-neutral-400 opacity-50 rounded-md" />
      </div>
      <div className="w-28 h-6 bg-neutral-400 opacity-50 rounded-md" />
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function StatBoardSkeleton() {
  return (
    <div className="animate-pulse flex-grow md:grow-0 md:w-full min-w-40 flex flex-col gap-3 ">
      <div className="flex flex-row gap-2">
        <div className="w-24 h-6 bg-neutral-300 rounded-md" />
        <CrownSimpleIcon weight="fill" size={24} color="#d4d4d4" />
      </div>
      <div className="flex flex-col p-6 rounded-lg bg-neutral-300">
        <LeaderboardSkeleton />
      </div>
    </div>
  );
}

export function StatBoardsSkeleton() {
  return (
    <>
      <StatBoardSkeleton />
      <StatBoardSkeleton />
      <StatBoardSkeleton />
    </>
  );
}
