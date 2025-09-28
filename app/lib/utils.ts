export const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-').map(Number);
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

  return { dayOfWeek: (dayOfWeekFormatter.format(date)), formattedDate: (dateFormatter.format(date)) };
};
