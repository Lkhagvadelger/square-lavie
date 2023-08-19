import { Calendar } from "@ui/components/calendar/calendar";
import { AppLayout } from "@ui/index";
import { useEffect, useState } from "react";
import { useAvailabilityAny, useLocalStorage } from "../data/hooks";
import { CartModel } from "../data/types";

export const DatePage = ({ locationId }: { locationId: string }) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [total, setTotal] = useState({ totalPrice: 0, totalItems: 0 });
  const availabitlyMutation = useAvailabilityAny(locationId);

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
    if (selectedVariantIds && selectedVariantIds.length > 0) {
      //call availability mutation
      console.log({ selectedVariantIds });
      availabitlyMutation.mutate(
        { selectedVariantIds },
        {
          onError: () => {},
          onSuccess: (data) => {
            console.log(data);
          },
        }
      );
    }
  }, [selectedVariantIds]);
  //first must check first Staff calendar.
  //let user select their start date.

  //if selected time is free with second staff than create new order to second staff
  const onDateChange = (pickedDate: any) => {
    console.log(pickedDate);
  };

  return (
    <AppLayout>
      <Calendar
        startMonth={{ year: 2023, month: 7, day: 1 }}
        onDatePicked={onDateChange}
      />
    </AppLayout>
  );
};
