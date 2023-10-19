import { CalendarMonthType } from "../data/types";
import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz";

const options: Intl.DateTimeFormatOptions = {
  // year: "numeric",
  // month: "long",
  // day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Los_Angeles",
};
/**
 * Checks if the given timestamp is in the morning (00:00 to 11:59).
 *
 * @param timestamp The timestamp to check.
 * @returns True if the timestamp is in the morning, false otherwise.
 */
export const isMorningTimestamp = (timestamp: string) => {
  var date = new Date(timestamp);
  var localeTimeString = date.toLocaleString("en-US", options);
  var hours = parseInt(localeTimeString, 10);
  return hours >= 0 && hours < 12; // Assuming morning is from 00:00 to 11:59
};
/**
 * Checks if the given timestamp is in the noon (12:00 to 17:59).
 *
 * @param timestamp The timestamp to check.
 * @returns True if the timestamp is in the noon, false otherwise.
 */
export const isNoonTimestamp = (timestamp: string) => {
  var date = new Date(timestamp);
  var localeTimeString = date.toLocaleString("en-US", options);
  var hours = parseInt(localeTimeString, 10);
  return hours >= 12 && hours < 18; // Assuming morning is from 00:00 to 11:59
};

/**
 * Checks if the given timestamp is in the evening (18:00 to 23:59).
 *
 * @param timestamp The timestamp to check.
 * @returns True if the timestamp is in the evening, false otherwise.
 */
export const isEveningTimestamp = (timestamp: string) => {
  var date = new Date(timestamp);
  var localeTimeString = date.toLocaleString("en-US", options);
  var hours = parseInt(localeTimeString, 10);
  return hours >= 18 && hours <= 23;
};

/**
 * Formats the given date string to a localized time string in the America/Los_Angeles time zone, with the time zone name in short format.
 *
 * @param dateString The date string to format.
 * @returns The localized time string, or an empty string if the date string is undefined or null.
 */
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

/**
 * Formats the given date string to a localized date and time string in the America/Los_Angeles time zone.
 *
 * @param dateString The date string to format.
 * @returns The localized date and time string, or an empty string if the date string is undefined or null.
 */
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

/**
 * Calculates the difference in hours between the two given dates.
 *
 * @param date1 The first date.
 * @param date2 The second date.
 * @returns The difference in hours between the two dates.
 */
export const twoDateDifference = (date1: Date, date2: Date) => {
  var Difference_In_Hours = date1.getHours() - date2.getHours();

  return Difference_In_Hours;
};

/**
 * Parses the given date in the given time zone and returns a formatted date string.
 *
 * @param date The date to parse.
 * @param timeZone The time zone to parse the date in.
 * @returns The formatted date string, or an empty string if the date or time zone is undefined or null.
 */
export const parseDateWithTimeZone = (date: Date, timeZone: string) => {
  const zonedDate = utcToZonedTime(date, timeZone);
  // zonedDate could be used to initialize a date picker or display the formatted local date/time

  if (zonedDate.getDate() != date.getDate()) {
    zonedDate.setDate(date.getDate());
  }

  const pattern = "MMMM dd, yyyy";
  const output = format(zonedDate, pattern, { timeZone: timeZone });

  return output;
};

/**
 * Formats the given date string to a localized date string in the America/Los_Angeles time zone, with the date in numeric format.
 *
 * @param dateString The date string to format.
 * @returns The localized date string, or an empty string if the date string is undefined or null.
 */
export const toTimezoneDateNumeric = (date: string) => {
  const timeZone = "America/Los_Angeles";

  const theDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: timeZone,
  };
  return theDate.toLocaleString("en-US", options);
};

/**
 * Formats the given date string to a localized date string in the America/Los_Angeles time zone.
 *
 * @param dateString The date string to format.
 * @returns The localized date string, or an empty string if the date string is undefined or null.
 */
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
