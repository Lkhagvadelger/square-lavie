import { Calendar, CalendatMonthType } from "@ui/components/calendar/calendar";
import { AppLayout, Box, Button, Spinner } from "@ui/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAvailabilityAny, useLocalStorage } from "../data/hooks";
import { CartModel } from "../data/types";

export const DatePage = ({ locationId }: { locationId: string }) => {
  const [cart] = useLocalStorage("cart", []);
  const availabitlyMutation = useAvailabilityAny(locationId);
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
    if (
      selectedDate.year > 0 &&
      selectedVariantIds &&
      selectedVariantIds.length > 0 &&
      !availability
    ) {
      //call availability mutation
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
    if (
      selectedDate.year > 0 &&
      selectedVariantIds &&
      selectedVariantIds.length > 0 &&
      availability
    ) {
      if (availability.startDate.month != selectedDate.month)
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
        <Box>
          <Button onClick={goBack}>Back</Button>
        </Box>
      </>
    </AppLayout>
  );
};
