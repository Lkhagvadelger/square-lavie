import { Calendar } from "@ui/components/calendar/calendar";
import { Box, Button, Flex, Spinner, Text } from "@ui/index";
import { utcToZonedTime } from "date-fns-tz";
import addMinutes from "date-fns/addMinutes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Availability } from "square";
import {
  isMorningTimestamp,
  isNoonTimestamp,
  isEveningTimestamp,
  toTimezoneDate,
  toTimezoneDateNumeric,
  toTimezoneDateTime,
  toTimezoneTime_Name,
} from "../api/filterFunctions";

import {
  useAvailabilityAny,
  useCreateBooking,
  useGetLocationInfo,
  useLocalStorage,
} from "../data/hooks";
import {
  CalendarMonthType,
  CartModel,
  ChoicesType,
  RequiredServiceType,
} from "../data/types";
import { CalendarDays } from "./components/CalendarDays";
import { CalendarRow } from "./components/CalendarRow";
export type DatePageType = {
  isSecondBookingRequired: boolean;
  selectedHourAndStaff: Availability | undefined;
  selectedHourAndStaffFirst: Availability | undefined;
  selectedHourAndStaffSecond: Availability | undefined;
  availability: any | undefined;
  selectedDate: Date;
  selectedVariantIds: any[];
};
export type ChatPageType = {
  specialServices: RequiredServiceType;
  totalCustomer: ChoicesType;
  isSecondBookingRequired: boolean;
  selectedHourAndStaff: Availability | undefined;
  selectedHourAndStaffFirst: Availability | undefined;
  selectedHourAndStaffSecond: Availability | undefined;
  availability: any | undefined;
  selectedDate: Date | null;
  selectedVariantIds: any[];
};

export const DatePage = ({ locationId }: { locationId: string }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<DatePageType>({
    defaultValues: {
      selectedVariantIds: [],
      isSecondBookingRequired: false,
    },
  });
  watch([
    "isSecondBookingRequired",
    "selectedHourAndStaff",
    "selectedHourAndStaffFirst",
    "selectedHourAndStaffSecond",
    "availability",
    "selectedDate",
    "selectedVariantIds",
  ]);

  const [cart] = useLocalStorage("cart", []);
  const availabitlyMutation = useAvailabilityAny(locationId);
  const createMutation = useCreateBooking(locationId);

  const { data: locationData, isLoading } = useGetLocationInfo(locationId);
  const [selEndDate, setSelEndDate] = useState(null);
  const [showingData, setShowingData] = useState(null);
  const dayRange = 30;
  const timeZone = "America/Los_Angeles";
  const bookingHourAdd = 4;

  // if user already selected muskAskServiceIds
  // step: 1
  useEffect(() => {
    if (cart) {
      //Add variantId to selectedVariantIds array
      setValue(
        "selectedVariantIds",
        cart.map((item: CartModel) => ({
          serviceVariationId: item.variantId,
          categoryId: item.serviceCategoryId,
          teamMemberIdFilter: { any: item.teamMemberIds },
        }))
      );
      setValue("selectedHourAndStaff", undefined);
      setValue("selectedHourAndStaffFirst", undefined);
      setValue("selectedHourAndStaffSecond", undefined);

      const date = new Date();
      const zonedDate = utcToZonedTime(date, timeZone);
      zonedDate.setHours(zonedDate.getHours() + bookingHourAdd);

      console.log(zonedDate, "zoned Date add hours");

      setValue("selectedDate", zonedDate);
    }
  }, [cart]);

  //step: 2
  useEffect(() => {
    if (
      getValues("selectedVariantIds")?.length > 0 &&
      getValues("selectedDate") != null &&
      getValues("availability") == undefined
    ) {
      console.log("first time call call Avlialablity");

      // callAvialablity(
      //   getValues("selectedVariantIds"),
      //   getValues("selectedDate")
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues("selectedVariantIds"), getValues("selectedDate")]);

  const callAvialablity = (selectedVariantIds: any[], selDate: Date) => {
    availabitlyMutation.mutate(
      {
        selectedVariantIds: selectedVariantIds,
        selectedDate: selDate,
        dayRange: dayRange,
      },
      {
        onError: (e) => {
          console.log(e);
        },
        onSuccess: (data: any) => {
          setValue("availability", data);

          const nowDate = new Date(data.startAt);

          console.log(toTimezoneDate(data.startAt));

          if (data.availabilities?.length > 0) {
            const rawData1 = data.availabilities.filter(
              (r: any) =>
                toTimezoneDate(r.startAt) == toTimezoneDate(data.startAt)
            );

            console.log("dd", rawData1);
          }
        },
      }
    );
  };

  useEffect(() => {
    if (selEndDate != null) {
      console.log("calendar next click & next data download");
      callAvialablity(getValues("selectedVariantIds"), selEndDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selEndDate]);

  //step: 2
  useEffect(() => {
    if (getValues("selectedDate") == null) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues("selectedDate")]);

  const calculateServiceOrder = () => {
    const availability = getValues("availability");

    const firstAvail = getValues("availability").availabilities;
    const secondAvail = getValues("availability").availabilities2;
  };

  const onBooking = () => {
    if (getValues("selectedHourAndStaff")) {
      createMutation.mutate(
        {
          ...getValues("selectedHourAndStaff"),
          isSecondBookingRequired: getValues("isSecondBookingRequired"),
          appointmentSegmentSecond: getValues("selectedHourAndStaffSecond")
            ?.appointmentSegments,
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
    if (getValues("availability")?.availabilities2) {
      const secondAvailability = getValues(
        "availability"
      )?.availabilities2.filter(
        (r: any) => r.startAt == selectedTime.startAt
      )[0];

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
                .appointmentSegments!.map((r: any) => r.serviceVariationId)
                .includes(r.serviceVariationId)
          ),
        };
        firstAvailability?.appointmentSegments?.concat(
          secondAvailability!.appointmentSegments!
        );
        setValue("isSecondBookingRequired", true);
        setValue("selectedHourAndStaff", {
          startAt: selectedTime.startAt,
          appointmentSegments: [
            ...firstAvailability!.appointmentSegments!,
            ...secondAvailability!.appointmentSegments,
          ],
        });
        setValue("selectedHourAndStaffFirst", {
          startAt: selectedTime.startAt,
          appointmentSegments: [...firstAvailability!.appointmentSegments!],
        });
        setValue("selectedHourAndStaffSecond", {
          startAt: selectedTime.startAt,
          appointmentSegments: [...secondAvailability!.appointmentSegments],
        });
      } else {
        setValue("selectedHourAndStaff", selectedTime);
        setValue("isSecondBookingRequired", false);
      }
    } else {
      setValue("selectedHourAndStaff", selectedTime);
      setValue("isSecondBookingRequired", false);
    }
  };
  const setSelectedDate = (selectedDate: Date) => {
    console.log("selected date click");
    setValue("selectedDate", selectedDate);
  };

  const nextClick = (endDate: any) => {
    setSelEndDate(endDate);
  };

  return (
    <Box width={"full"}>
      <CalendarDays
        selectedDate={getValues("selectedDate")}
        setSelectedDate={setSelectedDate}
        hidePastDays={false}
        nextClick={nextClick}
      />
      <br />
      {availabitlyMutation.isLoading && <Spinner />}

      {locationData &&
        !isLoading &&
        locationData.timezone != userTimezone() && (
          <Text>
            ⚠ HEADS UP! It looks like you are in a different timezone(
            {userTimezone()}). Times below are shown in {locationData.timezone}{" "}
            time.
          </Text>
        )}
      {!availabitlyMutation.isLoading &&
        getValues("availability") &&
        getValues("availability").startAt && (
          <Flex flexWrap={"wrap"} justifyContent={"flex-start"}>
            {/* <Box w="full">Morning</Box>
            {getValues("availability")
              ?.availabilities?.filter(
                (r: any) =>
                  toTimezoneDate(r.startAt) ==
                  toTimezoneDateNumeric(
                    getValues("availability")?.startAt,
                    getValues("selectedDate")
                  )
              )
              // .filter((r: any) => r.startAt && isMorningTimestamp(r.startAt))
              .map((item: Availability, key: any) => {
                return (
                  <TimeBox
                    key={key}
                    availability={item}
                    selectedAt={getValues("selectedHourAndStaff")}
                    onTimeSelectAndSearchSecondOption={
                      onTimeSelectAndSearchSecondOption
                    }
                  />
                );
              })} */}
            {/* <Box w="full">Noon</Box>
          {getValues("availability")
            ?.availabilities.filter(
              (r: any) =>
                toTimezoneDate(r.startAt) ==
                toTimezoneDateNumeric(getValues("selectedDate"))
            )
            .filter((r: any) => r.startAt && isNoonTimestamp(r.startAt))
            .map((item: Availability, key: any) => {
              return (
                <TimeBox
                  key={key}
                  availability={item}
                  selectedAt={getValues("selectedHourAndStaff")}
                  onTimeSelectAndSearchSecondOption={
                    onTimeSelectAndSearchSecondOption
                  }
                />
              );
            })}
          <Box w="full">Evening</Box>
          {getValues("availability")
            ?.availabilities.filter(
              (r: any) =>
                toTimezoneDate(r.startAt) ==
                toTimezoneDateNumeric(getValues("selectedDate"))
            )
            .filter((r: any) => r.startAt && isEveningTimestamp(r.startAt))
            .map((item: Availability, key: any) => {
              return (
                <TimeBox
                  key={key}
                  availability={item}
                  selectedAt={getValues("selectedHourAndStaff")}
                  onTimeSelectAndSearchSecondOption={
                    onTimeSelectAndSearchSecondOption
                  }
                />
              );
            })} */}
          </Flex>
        )}

      <Box>
        <Button onClick={onBooking}>Book</Button>
      </Box>

      <Box>
        <TotalDurationScreen
          dateString={getValues("selectedHourAndStaff")?.startAt}
          minutes={
            getValues("selectedHourAndStaffFirst")
              ? getValues(
                  "selectedHourAndStaffFirst"
                )?.appointmentSegments?.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.durationMinutes!;
                }, 0)! >
                getValues(
                  "selectedHourAndStaffSecond"
                )?.appointmentSegments?.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.durationMinutes!;
                }, 0)!
                ? getValues(
                    "selectedHourAndStaffFirst"
                  )?.appointmentSegments?.reduce(
                    (accumulator, currentValue) => {
                      return accumulator + currentValue.durationMinutes!;
                    },
                    0
                  )!
                : getValues(
                    "selectedHourAndStaffSecond"
                  )?.appointmentSegments?.reduce(
                    (accumulator, currentValue) => {
                      return accumulator + currentValue.durationMinutes!;
                    },
                    0
                  )!
              : getValues("selectedHourAndStaff")?.appointmentSegments?.reduce(
                  (accumulator, currentValue) => {
                    return accumulator + currentValue.durationMinutes!;
                  },
                  0
                )!
          }
        />
      </Box>
    </Box>
  );
};
export const TimeBox = ({
  availability,
  selectedAt,
  onTimeSelectAndSearchSecondOption,
}: {
  availability: Availability | undefined | null;
  selectedAt: Availability | undefined;
  onTimeSelectAndSearchSecondOption: ({}: Availability) => void;
}) => {
  if (!availability || !availability.startAt) return <></>;

  const date = new Date(availability.startAt);

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
    <Box
      mr="2"
      mb={2}
      w="24"
      bg={selectedAt == availability.startAt ? "green" : "none"}
      onClick={() => {
        onTimeSelectAndSearchSecondOption({
          startAt: availability.startAt,
          appointmentSegments: availability.appointmentSegments,
        });
      }}
    >
      <Box w="24" border="1px" p={1}>
        {formattedTime}
      </Box>
    </Box>
  );
};

const TotalDurationScreen = ({
  dateString,
  minutes,
}: {
  dateString: string | undefined | null;
  minutes: number;
}) => {
  if (!dateString) return <></>;
  const date = addMinutes(new Date(dateString), minutes);

  return (
    <Box>
      {toTimezoneDateTime(dateString)} -{" "}
      {toTimezoneTime_Name(date.toISOString())}
    </Box>
  );
};
