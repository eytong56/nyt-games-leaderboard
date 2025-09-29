import Navigation from "@/app/ui/weekly/navigation";
import { CardWrapper } from "@/app/ui/weekly/daily-cards";

export default function WeeklyDisplay({
  weekStartDate,
}: {
  weekStartDate: Date;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-12">
      <Navigation weekStartDate={weekStartDate} />
      <CardWrapper weekStartDate={weekStartDate} />
    </div>
  );
}
