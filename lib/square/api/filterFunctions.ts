const options: Intl.DateTimeFormatOptions = {
  // year: "numeric",
  // month: "long",
  // day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Los_Angeles",
};

export const isMorningTimestamp = (timestamp: string) => {
  var date = new Date(timestamp);
  var localeTimeString = date.toLocaleString("en-US", options);
  var hours = parseInt(localeTimeString, 10);
  return hours >= 0 && hours < 12; // Assuming morning is from 00:00 to 11:59
};
export const isNoonTimestamp = (timestamp: string) => {
  var date = new Date(timestamp);
  var localeTimeString = date.toLocaleString("en-US", options);
  var hours = parseInt(localeTimeString, 10);
  return hours >= 12 && hours < 18; // Assuming morning is from 00:00 to 11:59
};
export const isEveningTimestamp = (timestamp: string) => {
  var date = new Date(timestamp);
  var localeTimeString = date.toLocaleString("en-US", options);
  var hours = parseInt(localeTimeString, 10);
  return hours >= 18 && hours <= 23;
};
export const toTimezoneTime_Name = (dateString: string | undefined | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/Los_Angeles",
    timeZoneName: "short",
  };

  return date.toLocaleString("en-US", options);
};

export const toTimezoneDateTime = (dateString: string | undefined | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/Los_Angeles",
  };

  return date.toLocaleString("en-US", options);
};
export const toTimezoneDateNumeric = (dateString: CalendarMonthType) => {
  const date = new Date(
    dateString.year,
    dateString.month,
    dateString.day,
    0,
    0,
    0
  );

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  };
  return date.toLocaleString("en-US", options);
};
export const toTimezoneDate = (dateString: string | undefined | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  };

  return date.toLocaleString("en-US", options);
};
