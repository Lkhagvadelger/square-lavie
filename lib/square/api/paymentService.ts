import { ApiResponse, ListPaymentsResponse, Payment } from "square";
import { paymentsApi } from "./squareClient";

export namespace PaymentService {
  export const queryPayments = async (
    beginTime: string,
    endTime: string,
    order: "asc" | "desc" = "asc"
  ): Promise<Payment[]> => {
    let payments: Payment[] = [];
    const query = (cursor?: string) =>
      paymentsApi.listPayments(
        beginTime,
        endTime,
        order,
        cursor,
        process.env.SQUARE_LOCATION_ID,
        undefined,
        undefined,
        undefined,
        100
      );
    var resp = await query();
    if (resp.result.payments) payments = resp.result.payments;

    let cursor = resp.result.cursor;

    while (cursor != undefined) {
      const res = await query(cursor);
      if (res.result.payments) payments = payments.concat(res.result.payments);
      console.log(cursor, res.result.payments?.length);
      cursor = res.result.cursor;
    }
    return payments;
  };
}
