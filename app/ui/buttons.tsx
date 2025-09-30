"use client";

import {
  CircleNotchIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react/dist/ssr";

import { syncData } from "@/app/lib/services";
import { dateToStringLocal } from "../lib/utils";
import { useState } from "react";

export function SyncButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    console.log("Sync button pressed on client side");
    setLoading(true);
    try {
      const today = dateToStringLocal(new Date());
      const result = await syncData(today, today);
      if (result.success) {
        console.log("Sync successful:", result.data);
      } else {
        console.error("Sync failed:", result.error);
        // show error
      }
    } catch (error) {
      console.error("Client-side error syncing:", error);
      // show generic error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={
          "flex flex-row justify-center items-center py-2 w-30 gap-2 bg-white rounded-full border border-gray-700 hover:bg-neutral-200 cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-gray-500"
        }
      >
        <CircleNotchIcon className={loading ? "animate-spin" : "hidden"} />
        <div>Sync</div>
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
