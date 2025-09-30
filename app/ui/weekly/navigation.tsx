"use client";

import {
  dateToStringLocal,
  formatDateRange,
  getOffsetDate,
} from "@/app/lib/utils";
import { NavButton } from "@/app/ui/buttons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Navigation({ weekStartDate }: { weekStartDate: Date }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (direction: "left" | "right") => {
    const offset = direction === "left" ? -7 : 7;
    const newStartDate = getOffsetDate(weekStartDate, offset);
    const params = new URLSearchParams(searchParams);
    params.set("date", dateToStringLocal(newStartDate));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full max-w-120 flex flex-row justify-between">
      <NavButton direction="left" handleClick={handleClick} />
      <div className="w-48 px-4 py-3 text-center rounded-lg border border-black bg-white">
        {formatDateRange(weekStartDate)}
      </div>
      <NavButton direction="right" handleClick={handleClick} />
    </div>
  );
}
