import Header from "@/app/ui/header";
import Sidebar from "@/app/ui/stats/sidebar";
import WeeklyDisplay from "@/app/ui/weekly/weekly-display";
import { setDateToLocal, setDateToMonday } from "@/app/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const dateSearchParams = await searchParams;
  const today = new Date();
  setDateToLocal(today)
  const weekStartDate = dateSearchParams.date
    ? new Date(dateSearchParams.date)
    : today;
  
  // console.log(weekStartDate)
  setDateToMonday(weekStartDate);

  return (
    <div className="w-full flex flex-col items-center gap-16 pb-16">
      <Header weekStartDate={weekStartDate}/>
      <div className="w-full max-w-300 flex flex-col md:flex-row gap-8 px-8">
        <Sidebar weekStartDate={weekStartDate} />
        <WeeklyDisplay weekStartDate={weekStartDate} />
      </div>
    </div>
  );
}
