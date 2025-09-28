import StatBoard from "@/app/ui/stats/stat-board";

export default function Sidebar() {
  return (
    <div className="w-full md:w-64 flex flex-row md:flex-col flex-wrap justify-between md:justify-start items-center gap-8">
      <StatBoard title="All-time" />
      <StatBoard title="This Year" />
      <StatBoard title="This Month" />
    </div>
  );
}
