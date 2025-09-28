import Crown from "@/app/ui/crown";
import Leaderboard from "@/app/ui/leaderboard";
import { Entry } from "@/app/lib/definitions";
import { determineWinner } from "@/app/lib/utils";

export default function StatBoard({ title, entries }: { title: string, entries : Entry[] | undefined }) {
  return (
    <div className="flex-grow md:grow-0 md:w-full min-w-40 flex flex-col gap-3 ">
      <div className="flex flex-row gap-2">
        <h3 className="font-bold">{title.toUpperCase()}</h3>
        <Crown winner={determineWinner(entries)}/>
      </div>
      <div className="flex flex-col p-6 rounded-lg bg-white border border-gray-400 hover:drop-shadow-[0_3px_0] drop-shadow-neutral-400">
        <Leaderboard entries={entries} type="count"/>
      </div>
    </div>
  );
}
