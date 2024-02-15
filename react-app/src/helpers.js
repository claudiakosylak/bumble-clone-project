export const dateTransformer = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getUTCFullYear();
  const dayOfWeek = dateObj.getUTCDay();
  const daysOfWeek = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday",
  };
  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  const month = dateObj.getUTCMonth();
  const day = dateObj.getUTCDate();
  let hour = dateObj.getUTCHours();
  let amPm;

  if (hour > 12) {
    hour -= 12;
    amPm = "PM";
  } else if (hour < 12) {
    amPm = "AM";
  } else {
    amPm = "PM";
  }

  let minutes = dateObj.getUTCMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes.toString();
  }

  return {
    dayOfWeek: daysOfWeek[dayOfWeek],
    month: months[month],
    day: day,
    hour: hour,
    minutes: minutes,
    amPm: amPm,
    year: year,
  };
};

export const niceDateString = (dateObj) => {
  const day = dateObj.day.toString();
  let ending;
  if (day[day.length - 1] === "1" && day[0] !== "1") {
    ending = "st";
  } else if (day[day.length - 1] === "2" && day[0] !== "1") {
    ending = "nd";
  } else if (day[day.length - 1] === "3" && day[0] !== "1") {
    ending = "rd";
  } else {
    ending = "th";
  }
  return `${dateObj.dayOfWeek}, ${dateObj.month} ${dateObj.day}${ending} at ${dateObj.hour}:${dateObj.minutes} ${dateObj.amPm}`;
};
