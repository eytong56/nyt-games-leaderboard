import { CrownSimpleIcon } from "@phosphor-icons/react/ssr";
import Leaderboard from "@/app/ui/leaderboard";

export default function StatBoard({ title }: { title: string }) {
  return (
    <div className="flex-grow md:grow-0 md:w-full min-w-40 flex flex-col gap-3">
      <div className="flex flex-row gap-2">
        <h3 className="font-bold">{title.toUpperCase()}</h3>
        <CrownSimpleIcon weight="regular" size={24} />
      </div>
      <div className="flex flex-col p-6 rounded-lg bg-white border border-gray-400">
        <Leaderboard />
      </div>
    </div>
  );
}
