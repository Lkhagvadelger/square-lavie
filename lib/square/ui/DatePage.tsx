import { AppLayout, Box } from "@ui/index";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../data/hooks";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

export const DatePage = ({ locationId }: { locationId: string }) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [total, setTotal] = useState({ totalPrice: 0, totalItems: 0 });
  // removal gel polish, removal acrylic, dip
  const mustAskServiceIds = [
    "XPOMIFUBDR4XMOZWGV44ZJKE",
    "RL3GOHPQWBJHKWENFD3GHKDU",
    "MF6RGWC2HAH6ZDH32BPUXTFZ",
  ];
  //manicure and manicure extras
  const firstStaffService = [];
  //pedicure and pedicure extras
  const secondStaffSergivce = [];

  useEffect(() => {
    return setTotal({
      totalPrice: cart.reduce(
        (acc: number, item: { price: number; quantity: number }) =>
          acc + item.price * item.quantity,
        0
      ),
      totalItems: cart.reduce(
        (acc: number, item: { quantity: number }) => acc + item.quantity,
        0
      ),
    });
  }, [cart]);

  //first must check first Staff calendar.
  //let user select their start date.

  //if selected time is free with second staff than create new order to second staff
  const onDateChange = (pickedDate: Date) => {};
  return (
    <AppLayout>
      <Box color="red">
        <SingleDatepicker
          usePortal={true}
          propsConfigs={{ inputProps: { size: "md" } }}
          date={new Date()}
          onDateChange={(endDate: Date) => onDateChange(endDate)}
        />
      </Box>
    </AppLayout>
  );
};