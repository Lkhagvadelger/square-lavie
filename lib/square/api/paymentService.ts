import { ApiResponse, ListPaymentsResponse, Payment } from "square";
import { paymentsApi } from "./squareClient";
import { prisma } from "@api/prisma";
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

  export async function calculateRevenue({
    startDate,
    endDate,
  }: {
    startDate: string | Date;
    endDate: string | Date;
  }): Promise<number> {
    // Query completed orders created within the specified date range.
    const completedOrders = await prisma.order.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            state: "COMPLETED",
          },
        ],
      },
    });
    // Calculate the total monthly revenue.
    const revenue = completedOrders.reduce((totalRevenue, order) => {
      // Extract the totalMoney field as a JSON object.
      const totalMoney = order.totalMoney as {
        amount: string;
        currency: string;
      };

      // Ensure the currency is USD (as specified in your data).
      if (totalMoney.currency === "USD") {
        totalRevenue += parseInt(totalMoney.amount);
      }

      return totalRevenue; //Total sales
    }, 0);

    //the amount is saved as cents thus divide by 100
    return revenue / 100;
  }

  export async function calculateCurrentWeekRevenue(): Promise<number> {
    // Get the current date.
    const currentDate = new Date();

    // Define the start and end dates for the current week.
    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - currentDate.getDay()); // Start of the week (Sunday)

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // End of the week (Saturday)
    console.log(startDate, endDate);
    // Query completed orders created within the current week.
    const completedOrders = await prisma.order.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            state: "COMPLETED",
          },
        ],
      },
    });

    // Calculate the total weekly revenue.
    const weeklyRevenue = completedOrders.reduce((totalRevenue, order) => {
      // Extract the totalMoney field as a JSON object.
      const totalMoney = order.totalMoney as {
        amount: string;
        currency: string;
      };

      // Ensure the currency is USD (as specified in your data).
      if (totalMoney.currency === "USD") {
        totalRevenue += parseInt(totalMoney.amount);
      }

      return totalRevenue;
    }, 0);

    // The amount is saved as cents, thus divide by 100.
    return weeklyRevenue / 100;
  }
}
