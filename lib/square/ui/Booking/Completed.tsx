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
  useCreateBooking,
  useGetBooking,
  useGetLocationInfo,
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
  const [cart] = useLocalStorage("cart", []);
  const availabitlyMutation = useAvailabilityAny(locationId);
  const { data: bookingData, isLoading } = useGetBooking(locationId, bookingId);
  const [selectedHourAndStaff, setSelectedHourAndStaff] = useState<
    Availability | undefined
  >(undefined);

  const [availability, setAvailability] = useState<
    | {
        startDate: CalendarMonthType;
        availabilities: Availability[];
        availabilities2: Availability[];
      }
    | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = useState<CalendarMonthType>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
  });

  const router = useRouter();
  const goBack = () => {
    router.push("/square/" + locationId);
  };

  return (
    <AppLayout>
      <>
        {availabitlyMutation.isLoading && <Spinner></Spinner>}
        {!availabitlyMutation.isLoading && availability && (
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        {locationData && locationData.timezone != userTimezone() && (
          <Text>
            ⚠ HEADS UP! It looks like you are in a different timezone(
            {userTimezone()}). Times below are shown in {locationData.timezone}{" "}
            time.
          </Text>
        )}

        <Flex flexWrap={"wrap"} justifyContent={"flex-start"}>
          {availability?.availabilities
            .filter(
              (r) =>
                ConvertToGivenTimezoneDate(r.startAt) ==
                ConvertToGivenTimezone(selectedDate)
            )
            .map((item, key) => {
              return (
                <Box
                  mr="2"
                  mb={2}
                  w="24"
                  bg={
                    selectedHourAndStaff?.startAt == item.startAt
                      ? "green"
                      : "none"
                  }
                  key={key}
                  onClick={() => {
                    onTimeSelectAndSearchSecondOption({
                      startAt: item.startAt,
                      appointmentSegments: item.appointmentSegments,
                    });
                  }}
                >
                  <TimeBox dateString={item.startAt} />
                </Box>
              );
            })}
        </Flex>
        <Box>
          <Button onClick={goBack}>Back</Button>
          <Button onClick={onBooking}>Book</Button>
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
