export function formatDateTime(inputDate) {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    hour12: true,
  };

  const formattedDateTime = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );

  return formattedDateTime;
}

export function trimStatus(str) {
  return str?.replace(/_/g, " ").toUpperCase();
}

export function convertTimeTo12HourFormat(timeString) {
  // Split the time string into start and end times
  var times = timeString.split("-");

  // Convert start time to 12-hour format
  var startTime = convertTo12Hour(times[0]);

  // Convert end time to 12-hour format
  var endTime = convertTo12Hour(times[1]);

  // Concatenate start and end times with a hyphen
  return startTime + " - " + endTime;
}

function convertTo12Hour(time) {
  // Split time string into hours and minutes
  var parts = time.split(":");
  var hours = parseInt(parts[0]);
  var minutes = parts[1];

  // Determine AM or PM
  var meridiem = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // '0' should be converted to '12'

  // Return formatted time
  return hours + ":" + minutes + " " + meridiem;
}
