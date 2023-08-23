import {
  Calendar,
  CalendatMonthType as CalendarMonthType,
} from "@ui/components/calendar/calendar";
import { AppLayout, Box, Button, Flex, Spinner, Text } from "@ui/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Availability } from "square";
import {
  useAvailabilityAny,
  useGetBooking,
  useLocalStorage,
} from "../../data/hooks";
import { CartModel } from "../../data/types";

export const Completed = ({
  locationId,
  bookingId,
}: {
  locationId: string;
  bookingId: string;
}) => {
  const { data: bookingData, isLoading } = useGetBooking(locationId, bookingId);

  useEffect(() => {
    useGetBooking(locationId, bookingId);
  }, []);

  const router = useRouter();
  const goBack = () => {
    router.push("/square/" + locationId);
  };

  return (
    <AppLayout>
      <>
        {isLoading && <Spinner></Spinner>}
        {bookingData && (
          <Text>
            ⚠ HEADS UP! It looks like you are in a different timezone( time.
          </Text>
        )}

        <Flex flexWrap={"wrap"} justifyContent={"flex-start"}>
          {bookingData != null && JSON.stringify(bookingData)}
        </Flex>
        <Box>
          <Button onClick={goBack}>Back</Button>
        </Box>
      </>
    </AppLayout>
  );
};
export const TimeBox = ({
  dateString,
}: {
  dateString: string | undefined | null;
}) => {
  if (!dateString) return <></>;
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    // year: "numeric",
    // month: "long",
    // day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
  };

  const formattedTime = date.toLocaleString("en-US", options);
  return (
    <Box w="24" border="1px" p={1}>
      {formattedTime}
    </Box>
  );
};
const ConvertToGivenTimezone = (dateString: CalendarMonthType) => {
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
export const ConvertToGivenTimezoneDate = (
  dateString: string | undefined | null
) => {
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
