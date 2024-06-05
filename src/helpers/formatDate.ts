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

export function dateOnly(dateString: any) {
  // Parse the date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date as any)) {
    throw new Error("Invalid date string");
  }

  // Extract the day, month, and year
  const day = date.getDate();
  const month = date.getMonth(); // Note: months are zero-based in JavaScript
  const year = date.getFullYear();

  // Function to get the ordinal suffix for a day
  function getOrdinalSuffix(day: any) {
    if (day > 3 && day < 21) return "th"; // special case for 11th to 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Format the day with the appropriate suffix
  const formattedDay = day + getOrdinalSuffix(day);

  // Get the month name
  const formattedMonth = monthNames[month];

  // Construct the formatted date string
  return `${formattedDay} ${formattedMonth}`;
}
