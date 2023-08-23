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
  useGetLocationInfo,
  useLocalStorage,
} from "../data/hooks";
import { CartModel } from "../data/types";

export const DatePage = ({ locationId }: { locationId: string }) => {
  const [cart] = useLocalStorage("cart", []);
  const availabitlyMutation = useAvailabilityAny(locationId);
  const createMutation = useCreateBooking(locationId);
  const { data: locationData, isLoading } = useGetLocationInfo(locationId);
  const [isSecondBookingRequired, setIsSecondBookingRequired] =
    useState<Boolean>(false);
  const [selectedHourAndStaff, setSelectedHourAndStaff] = useState<
    Availability | undefined
  >(undefined);
  const [selectedHourAndStaffSecond, setSelectedHourAndStaffSecond] = useState<
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

  const [selectedVariantIds, setSelectedVariantIds] = useState<any[]>([]);
  const onBooking = () => {
    if (selectedHourAndStaff) {
      createMutation.mutate(
        {
          ...selectedHourAndStaff,
          isSecondBookingRequired,
          appointmentSegmentSecond:
            selectedHourAndStaffSecond?.appointmentSegments,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            //go to booking date completed page
          },
          onError: (e) => {
            console.log(e);
          },
        }
      );
    }
  };
  // if user already selected muskAskServiceIds
  // step: 1
  useEffect(() => {
    if (cart) {
      //Add variantId to selectedVariantIds array
      setSelectedVariantIds(
        cart.map((item: CartModel) => ({
          serviceVariationId: item.variantId,
          categoryId: item.serviceCategoryId,
          teamMemberIdFilter: { any: item.teamMemberIds },
        }))
      );
    }
  }, [cart]);
  //step: 2
  useEffect(() => {
    if (selectedVariantIds?.length > 0) {
      if (
        (availability && availability.startDate.month != selectedDate.month) ||
        !availability
      )
        availabitlyMutation.mutate(
          {
            selectedVariantIds,
            startDate: selectedDate,
            now: new Date(),
          },
          {
            onError: (e) => {
              console.log(e);
            },
            onSuccess: (data: any) => {
              setAvailability(data);
              console.log(data);
            },
          }
        );
    }
  }, [selectedVariantIds, selectedDate]);

  const userTimezone = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone;
  };
  const router = useRouter();
  const goBack = () => {
    router.push("/square/" + locationId);
  };
  const onTimeSelectAndSearchSecondOption = (selectedTime: Availability) => {
    if (!selectedTime) return;
    //setSelectedHourAndStaff(selectedTime);
    searchFromSecondOption(selectedTime);
  };

  const searchFromSecondOption = (selectedTime: Availability) => {
    if (availability?.availabilities2) {
      const secondAvailability = availability?.availabilities2.filter(
        (r) => r.startAt == selectedTime.startAt
      )[0];

      console.log("secondAvailability : ", secondAvailability);

      if (
        secondAvailability &&
        secondAvailability.appointmentSegments &&
        secondAvailability.appointmentSegments.length > 0
      ) {
        let firstAvailability: Availability = {
          startAt: selectedTime.startAt,
          //remove seconds
          appointmentSegments: selectedTime.appointmentSegments?.filter(
            (r) =>
              !secondAvailability!
                .appointmentSegments!.map((r) => r.serviceVariationId)
                .includes(r.serviceVariationId)
          ),
        };
        firstAvailability?.appointmentSegments?.concat(
          secondAvailability!.appointmentSegments!
        );
        setIsSecondBookingRequired(true);
        setSelectedHourAndStaff({
          startAt: selectedTime.startAt,
          appointmentSegments: [
            ...firstAvailability!.appointmentSegments!,
            ...secondAvailability!.appointmentSegments,
          ],
        });
        setSelectedHourAndStaffSecond({
          startAt: selectedTime.startAt,
          appointmentSegments: [...secondAvailability!.appointmentSegments],
        });
      } else {
        setSelectedHourAndStaff(selectedTime);
        setIsSecondBookingRequired(false);
      }
    } else {
      setSelectedHourAndStaff(selectedTime);
      setIsSecondBookingRequired(false);
    }
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
        <Text>Just for visually make sure</Text>

        <Flex flexWrap={"wrap"} justifyContent={"flex-start"}>
          {availability?.availabilities2 &&
            availability?.availabilities2
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
                  >
                    <TimeBox dateString={item.startAt} />
                  </Box>
                );
              })}
        </Flex>
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
