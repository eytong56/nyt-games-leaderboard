"use client";

import {
  dateToStringLocal,
  formatDateRange,
  getOffsetDate,
} from "@/app/lib/utils";
import { NavButton } from "@/app/ui/buttons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Navigation({ weekStartDate }: { weekStartDate: Date }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (direction: "left" | "right") => {
    const offset = direction === "left" ? -7 : 7;
    const params = new URLSearchParams(searchParams);
    params.set("date", dateToStringLocal(getOffsetDate(weekStartDate, offset)));
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex flex-row justify-between gap-16">
      <NavButton direction="left" handleClick={handleClick} />
      <div className="px-4 py-3 rounded-lg border border-black bg-white">
        {formatDateRange(weekStartDate)}
      </div>
      <NavButton direction="right" handleClick={handleClick} />
    </div>
  );
}
