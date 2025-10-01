"use client";

import {
  CircleNotchIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react/dist/ssr";

import { syncData, backfillYearData } from "@/app/lib/services";
import { dateToStringLocal, getOffsetDate } from "../lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SyncButton({ weekStartDate }: { weekStartDate: Date }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      const result = await syncData({
        startDate: dateToStringLocal(weekStartDate),
        endDate: dateToStringLocal(getOffsetDate(weekStartDate, 6)),
      });

      // const result = await backfillYearData(2024);

      if (result.success) {
        console.log("Sync successful:", result.stats);
        router.refresh();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Sync failed:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading || error}
        className={
          "flex flex-row justify-center items-center py-2 w-30 gap-2 bg-white rounded-full border border-gray-700 hover:bg-neutral-200 cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-gray-500"
        }
      >
        <CircleNotchIcon className={loading ? "animate-spin" : "hidden"} />
        {!error ? <div>Sync</div> : <div className="text-red-900">Sync failed</div>}
      </button>
    </>
  );
}

export function NavButton({
  direction,
  handleClick,
}: {
  direction: "left" | "right";
  handleClick: (direction: "left" | "right") => void;
}) {
  const icon =
    direction === "left" ? (
      <CaretLeftIcon size={24} />
    ) : (
      <CaretRightIcon size={24} />
    );
  return (
    <button
      onClick={() => handleClick(direction)}
      className="w-12 h-12 flex justify-center items-center bg-white rounded-full border border-gray-400 cursor-pointer hover:bg-neutral-200"
    >
      {icon}
    </button>
  );
}
