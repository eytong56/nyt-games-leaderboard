import Navigation from "@/app/ui/weekly/navigation";
import { CardWrapper } from "@/app/ui/weekly/daily-cards";
import { Car } from "@phosphor-icons/react";

export default function WeeklyDisplay() {
  return <div className="w-full flex flex-col justify-center items-center gap-12">
    <Navigation />
    <CardWrapper />
  </div>
}