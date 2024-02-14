export const formatDate = (date: Date | string) => {
  const dateObj = date instanceof Date ? date : new Date(date);

  const diff = new Date().getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diff / 1000 / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInYears > 0) {
    return `${diffInYears}y ago`;
  }
  if (diffInMonths > 0) {
    return `${diffInMonths}m ago`;
  }
  if (diffInDays > 0) {
    return `${diffInDays}d ago`;
  }
  if (diffInHours > 0) {
    return `${diffInHours}h ago`;
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes}m ago`;
  }
  return "now";
};

export const dateParser = (num: Date | string) => {
  let timestamp: number;

  if (num instanceof Date) {
    // Si num est de type Date, pas besoin de le parser
    timestamp = num.getTime();
  } else {
    // Si num est de type string, le parser
    timestamp = Date.parse(num);
  }

  let options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    // weekday: "long",
    second: "2-digit",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour12: false,
  };

  // let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("en-EN", options);

  return (
    date.toString().split(",", 2).join(",") +
    " " +
    "at" +
    " " +
    date.toString().split(",").slice(2)
  );
};
