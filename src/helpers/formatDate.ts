export function formatDate(str: string, short: boolean = true): string {
  const date = new Date(str);
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  if (short) {
    return `${day.toString().padStart(2, "0")} ${months[monthIndex]} ${year}`;
  }
  return `${day.toString().padStart(2, "0")} ${
    months[monthIndex]
  } ${year} ${hours}:${minutes}:${seconds}`;
}
