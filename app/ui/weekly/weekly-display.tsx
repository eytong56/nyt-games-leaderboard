import Navigation from "@/app/ui/weekly/navigation";
import { CardWrapper } from "@/app/ui/weekly/daily-cards";
import { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { dateToStringUTC } from "@/app/lib/utils";

export default function WeeklyDisplay({
  weekStartDate,
}: {
  weekStartDate: Date;
}) {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-12">
      <Navigation weekStartDate={weekStartDate} />
      <Suspense key={dateToStringUTC(weekStartDate)} fallback={<CardsSkeleton />}>
        <CardWrapper weekStartDate={weekStartDate} />
      </Suspense>
    </div>
  );
}
