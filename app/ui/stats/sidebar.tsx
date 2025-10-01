import { StatBoardWrapper } from "@/app/ui/stats/stat-board";
import { Suspense } from "react";
import { StatBoardsSkeleton } from "../skeletons";
import { dateToStringLocal } from "@/app/lib/utils";


export default function Sidebar({ weekStartDate }: { weekStartDate: Date }) {
  // const monthYearKey = `${weekStartDate.getFullYear()}-${weekStartDate.getMonth()}`;
  return (
    <div className="w-full md:w-64 flex flex-row md:flex-col flex-wrap justify-between md:justify-start items-center gap-8">
      <Suspense key={dateToStringLocal(weekStartDate)} fallback={<StatBoardsSkeleton />}>
        <StatBoardWrapper weekStartDate={weekStartDate} />
      </Suspense>
    </div>
  );
}
