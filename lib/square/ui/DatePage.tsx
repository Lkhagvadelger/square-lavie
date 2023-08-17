import { AppLayout, Box } from "@ui/index";
import { useEffect, useState } from "react";
import { useAvailabilityAny, useLocalStorage } from "../data/hooks";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Calendar } from "@ui/components/calendar/calendar";
import { CartModel } from "../data/types";

export const DatePage = ({ locationId }: { locationId: string }) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [total, setTotal] = useState({ totalPrice: 0, totalItems: 0 });
  const availabitlyMutation = useAvailabilityAny(locationId);
  // removal gel polish, removal acrylic, dip
  const mustAskServiceIds = [
    "XPOMIFUBDR4XMOZWGV44ZJKE",
    "RL3GOHPQWBJHKWENFD3GHKDU",
    "MF6RGWC2HAH6ZDH32BPUXTFZ",
  ];
  const [selectedVariantIds, setSelectedVariantIds] = useState<string[]>([]);
  //manicure and manicure extras
  const firstStaffService = [];
  //pedicure and pedicure extras
  const secondStaffSergivce = [];

  useEffect(() => {
    if (cart) {
      //Add variantId to selectedVariantIds array
      setSelectedVariantIds(cart.map((item: CartModel) => item.variantId));
    }
  }, [cart]);
  useEffect(() => {
    if (selectedVariantIds && selectedVariantIds.length > 0) {
      //call availability mutation
      availabitlyMutation.mutate(selectedVariantIds);
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
