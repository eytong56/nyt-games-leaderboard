import { Entry } from "@/app/lib/definitions";

export const setDateToLocal = (date: Date) => {
  const localHour = Number(new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    timeZone: "America/Los_Angeles",
    hour12: false,
  }).format(date));
  let offset;
  if (localHour > date.getUTCHours()) {
    offset = (localHour - 24) - date.getUTCHours()
  } else {
    offset = localHour - date.getUTCHours()
  }
  date.setHours(date.getUTCHours() + offset);
};

export const dateToStringLocal = (date: Date) => {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getUTCDate()).padStart(2, "0")}`;
};

export const dateToStringUTC = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const getOffsetDate = (startDate: Date, offset: number) => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + offset);
  return endDate;
};

export const setDateToMonday = (date: Date) => {
  const offset = (date.getUTCDay() + 6) % 7;
  date.setDate(date.getUTCDate() - offset);
};

export const formatDateRange = (startDate: Date) => {
  const endDate = getOffsetDate(startDate, 6);
  if (startDate.getUTCFullYear() === endDate.getUTCFullYear()) {
    if (startDate.getUTCMonth() === endDate.getUTCMonth()) {
      return `${monthNameShort[startDate.getUTCMonth()]} ${startDate.getUTCDate()} - ${endDate.getUTCDate()}, ${endDate.getUTCFullYear()}
    `;
    } else {
      return `${startDate.toLocaleString("en-US", {
        month: "short",
      })} ${startDate.getUTCDate()} - ${endDate.toLocaleString("en-US", {
        month: "short",
      })} ${endDate.getUTCDate()}, ${endDate.getUTCFullYear()}
    `;
    }
  } else {
    return `${monthNameShort[startDate.getUTCMonth()]} ${startDate.getUTCDate()}, ${startDate.getUTCFullYear()} - ${monthNameShort[endDate.getUTCMonth()]} ${endDate.getUTCDate()}, ${endDate.getUTCFullYear()}
    `;
  }
};

export const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeekOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const dayOfWeekFormatter = new Intl.DateTimeFormat("en-US", dayOfWeekOptions);
  const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);

  return {
    dayOfWeek: dayOfWeekFormatter.format(date),
    formattedDate: dateFormatter.format(date),
  };
};

export const formatLink = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return `https://www.nytimes.com/crosswords/game/mini/${year}/${month}/${day}`;
};

export const formatSeconds = (seconds: number) => {
  return (
    String(Math.floor(seconds / 60)) +
    ":" +
    String(seconds % 60).padStart(2, "0")
  );
};

export const determineWinner = (entries: Entry[] | undefined) => {
  return !entries || entries.length < 2
    ? "none"
    : entries[0].rank === entries[1].rank
    ? "tie"
    : entries[0].user;
};

export const monthNameShort = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
