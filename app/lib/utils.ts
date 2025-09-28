import { Entry } from "@/app/lib/definitions";

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
