import { Calendar, CalendatMonthType } from "@ui/components/calendar/calendar";
import { AppLayout, Box, Text, Button, Spinner } from "@ui/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useAvailabilityAny,
  useGetLocationInfo,
  useLocalStorage,
} from "../data/hooks";
import { CartModel } from "../data/types";

export const DatePage = ({ locationId }: { locationId: string }) => {
  const [cart] = useLocalStorage("cart", []);
  const availabitlyMutation = useAvailabilityAny(locationId);
  const { data: locationData, isLoading } = useGetLocationInfo(locationId);
  const [availability, setAvailability] = useState<any>(undefined);
  const [selectedDate, setSelectedDate] = useState<CalendatMonthType>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
  });

  const [selectedVariantIds, setSelectedVariantIds] = useState<any[]>([]);

  // if user already selected muskAskServiceIds
  // step: 1
  useEffect(() => {
    if (cart) {
      //Add variantId to selectedVariantIds array
      setSelectedVariantIds(
        cart.map((item: CartModel) => ({
          serviceVariationId: item.variantId,
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
          { selectedVariantIds, startDate: selectedDate, now: new Date() },
          {
            onError: (e) => {
              console.log(e);
            },
            onSuccess: (data) => {
              setAvailability(data);
              console.log(data);
            },
          }
        );
    }
  }, [selectedVariantIds, selectedDate]);
  const onDateChange = (pickedDate: any) => {};
  const onMonthChange = (changedDate: any) => {
    setSelectedDate(changedDate);
  };

  const userTimezone = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone;
  };
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
        <Box>
          <Button onClick={goBack}>Back</Button>
        </Box>
      </>
    </AppLayout>
  );
};
