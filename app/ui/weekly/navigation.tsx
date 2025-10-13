"use client";

import {
  dateToStringUTC,
  formatDateRange,
  getOffsetDate,
} from "@/app/lib/utils";
import { NavButton } from "@/app/ui/buttons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Datepicker, createTheme, ThemeProvider } from "flowbite-react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

const customTheme = createTheme({
  datepicker: {
    root: {
      base: "relative",
    },
    popup: {
      root: {
        base: "absolute top-10 z-50 block pt-2 right-1/2 translate-x-1/2",
        inline: "relative top-0 z-auto",
        inner:
          "inline-block bg-white rounded-md p-4 shadow-none border border-black",
      },
      header: {
        base: "",
        title:
          "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
        selectors: {
          base: "mb-2 flex justify-between",
          button: {
            base: "rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black hover:bg-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
            prev: "",
            next: "",
            view: "",
          },
        },
      },
      view: {
        base: "p-1",
      },
      footer: {
        base: "mt-2 flex space-x-2",
        button: {
          base: "w-full rounded-full px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-primary-300",
          today:
            "bg-white text-black border border-black hover:bg-neutral-200 dark:bg-white dark:hover:bg-neutral-200",
          clear:
            "hidden bg-white text-black border border-black hover:bg-neutral-200 dark:bg-white dark:hover:bg-neutral-200",
        },
      },
    },
    views: {
      days: {
        header: {
          base: "mb-1 grid grid-cols-7",
          title:
            "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-500",
        },
        items: {
          base: "grid w-64 grid-cols-7",
          item: {
            base: "block flex-1 cursor-pointer rounded-full border-0 text-center text-sm font-medium leading-9 text-black hover:bg-neutral-200 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-black text-white hover:bg-gray-500",
            disabled: "text-gray-500",
          },
        },
      },
      months: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-medium leading-9 text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-black text-white hover:bg-gray-500",
            disabled: "text-gray-500",
          },
        },
      },
      years: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-medium leading-9 text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-black text-white hover:bg-gray-500",
            disabled: "text-gray-500",
          },
        },
      },
      decades: {
        items: {
          base: "grid w-64 grid-cols-4",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-medium leading-9 text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
            selected: "bg-black text-white hover:bg-gray-500",
            disabled: "text-gray-500",
          },
        },
      },
    },
  },
});

export default function Navigation({ weekStartDate }: { weekStartDate: Date }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [datePicked, setDatePicked] = useState(weekStartDate);
  const [datepickerVisible, setDatepickerVisible] = useState(false);

  const handleClick = (direction: "left" | "right") => {
    setDatepickerVisible(false);
    const offset = direction === "left" ? -7 : 7;
    const newStartDate = getOffsetDate(weekStartDate, offset);
    setDatePicked(newStartDate);
    const params = new URLSearchParams(searchParams);
    params.set("date", dateToStringUTC(newStartDate));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleDateChange = (date: Date | null) => {
    setDatepickerVisible(false);
    if (date === null) {
      return;
    } else {
      setDatePicked(date);
      const params = new URLSearchParams(searchParams);
      params.set("date", dateToStringUTC(date));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const handleDateClick = () => {
    setDatepickerVisible(!datepickerVisible);
  };

  return (
    <div className="w-full max-w-120 flex flex-row justify-between gap-4">
      <NavButton direction="left" handleClick={handleClick} />
      <div
        className={`relative shrink w-60 max-w-60 px-4 py-3 rounded-lg border border-black ${
          !datepickerVisible ? "bg-white" : "bg-neutral-200 text-gray-500"
        } hover:bg-neutral-200 cursor-pointer`}
      >
        <div
          className="flex flex-row justify-center items-center gap-2 w-full h-full"
          onClick={handleDateClick}
        >
          <div className="text-center">{formatDateRange(weekStartDate)}</div>
          <CaretDownIcon
            weight="fill"
            className={`${
              datepickerVisible ? "rotate-180" : ""
            } transition-all duration-200`}
          />
        </div>
        <div
          hidden={!datepickerVisible}
          className="absolute left-1/2 -translate-x-1/2 translate-y-2 z-10"
        >
          <ThemeProvider theme={customTheme}>
            <Datepicker
              inline
              weekStart={1}
              value={datePicked}
              onChange={handleDateChange}
            />
          </ThemeProvider>
        </div>
      </div>

      <NavButton direction="right" handleClick={handleClick} />
    </div>
  );
}
