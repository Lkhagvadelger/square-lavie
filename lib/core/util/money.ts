import { Money } from "square";

export const convertMoneyObject = (money?: Money) => {
  if (!money) return undefined;
  const obj = {
    amount: Number(money.amount?.toString()),
    currency: money.currency,
  };
  return obj;
};
