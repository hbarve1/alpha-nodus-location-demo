export function getTimeInFormat(date: Date): string {
  const newDate = new Date(date);

  return `${newDate.getHours().toString().padStart(2, "0")}:${newDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}
