export function getDayMonthFormat(date: Date): string {
  const newDate = new Date(date);

  return `${newDate.toLocaleString("en-US", {
    month: "short",
  })}-${newDate.getDate()}`;
}
