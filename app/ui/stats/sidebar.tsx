import StatBoard from "@/app/ui/stats/stat-board";
import { alltimeStats, yearStats, monthStats } from "@/app/lib/placeholder-data";

export default function Sidebar() {
  return (
    <div className="w-full md:w-64 flex flex-row md:flex-col flex-wrap justify-between md:justify-start items-center gap-8">
      <StatBoard title="All-time" entries={alltimeStats}/>
      <StatBoard title="This Year" entries={yearStats} />
      <StatBoard title="This Month" entries={monthStats}/>
    </div>
  );
}
