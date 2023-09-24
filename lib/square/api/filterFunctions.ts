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

export const twoDateDifference = (date1: Date, date2: Date) => {
  var Difference_In_Hours = date1.getHours() - date2.getHours();

  return Difference_In_Hours;
};

export const toTimezoneDateNumeric = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  };

  // console.log(date,'___-date');

  return "";

  // console.log(date?.toLocaleDateString("en-US", options), "-----");
  // return date?.toLocaleString("en-US", options);

  // return "";
};
export const toTimezoneDate = (dateString: string | undefined | null) => {
  if (!dateString) return "";
  //Pacific time irj baigaa eniig Localization-ruu hurhvvlj haruulna

  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/Los_Angeles",
  };

  const rawDate = date.toLocaleString("en-US", options);

  console.log(rawDate, "--startAt");

  return date.toLocaleString("en-US", options);
};
