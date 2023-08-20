import { Calendar } from "@ui/components/calendar/calendar";
import { AppLayout, Button } from "@ui/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAvailabilityAny, useLocalStorage } from "../data/hooks";
import { CartModel } from "../data/types";

export const DatePage = ({ locationId }: { locationId: string }) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [total, setTotal] = useState({ totalPrice: 0, totalItems: 0 });
  const availabitlyMutation = useAvailabilityAny(locationId);
  const [startDate, setStartDate] = useState({year:0,month:0,day:0,hours:0,minutes:0});

  const [selectedVariantIds, setSelectedVariantIds] = useState<any[]>([]);

  // if user already selected muskAskServiceIds
  // step: 1
  useEffect(() => {
    if (cart) {
      //Add variantId to selectedVariantIds array
      const nowDate = new Date();

      setSelectedVariantIds(
        cart.map((item: CartModel) => ({
          serviceVariationId: item.variantId,
          teamMemberIdFilter: { any: item.teamMemberIds },
        }))
      );

       //Month range between 0-11
      setStartDate({
        year:nowDate.getFullYear(),
        month:nowDate.getMonth(),
        day:nowDate.getDate(),
        hours:0,
        minutes:0
      });
    }
  }, [cart]);
  //step: 2
  useEffect(() => {
    if (startDate.year > 0 &&selectedVariantIds && selectedVariantIds.length > 0) {
      //call availability mutation
      console.log({ selectedVariantIds });
      availabitlyMutation.mutate(
        { selectedVariantIds,startDate },
        {
          onError: () => {},
          onSuccess: (data) => {
            console.log(data);
          },
        }
      );
    }
  }, [startDate]);
  //first must check first Staff calendar.
  //let user select their start date.

  //if selected time is free with second staff than create new order to second staff
  const onDateChange = (pickedDate: any) => {
    setStartDate(pickedDate);
  };
  const router = useRouter();
  const goBack = () => {
    router.push("/square/" + locationId);
  };

  return (
    <AppLayout>
      <>
        {startDate.year > 0  && <Calendar
          startMonth={startDate}
          onDatePicked={onDateChange}
        />
        }
        <Button onClick={goBack}>Back</Button>
      </>
    </AppLayout>
  );
};
