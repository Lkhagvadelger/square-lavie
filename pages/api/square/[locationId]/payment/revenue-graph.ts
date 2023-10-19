import { createHandler } from "@api/handler";
import { RedisService } from "@api/redis";
import { PaymentService } from "@lib/square/api/paymentService";
import { z } from "zod";

const handler = createHandler();

const querySchema = z.object({
  beginTime: z.string().datetime(),
  endTime: z.string().datetime(),
});

export type RevenueGraphResponse = {
  dates: string[];
  totalAmounts: number[];
};

export type QueryRevenueParams = z.infer<typeof querySchema>;

handler.get(async (req, res) => {
  const input = querySchema.safeParse(req.query);
  if (!input.success) {
    return res
      .status(400)
      .json({ messsage: "Incorrect input", error: input.error });
  }
  const cacheKey = ["revenue-graph", input.data];
  const cached = await RedisService.getCached(cacheKey);
  if (cached) res.sendSuccess(cached);

  var payments = await PaymentService.queryPayments(
    input.data.beginTime,
    input.data.endTime
  );
  const groupedPayments = new Map<string, number>(); // Key: Date (day), Value: Total AmountMoney

  for (const payment of payments) {
    const createdAt = new Date(payment.createdAt!).toDateString(); // Convert createdAt to a date string (ignores time)
    if (!groupedPayments.has(createdAt)) {
      groupedPayments.set(createdAt, 0);
    }
    groupedPayments.set(
      createdAt,
      groupedPayments.get(createdAt)! +
        parseFloat(payment.amountMoney?.amount?.toString() ?? "0")
    );
  }
  groupedPayments.keys();
  // Step 3: Generate Data for the Line Graph
  const dates = Array.from(groupedPayments.keys());
  const totalAmounts = Array.from(groupedPayments.values());

  const resp = {
    dates,
    totalAmounts,
  };
  RedisService.setCache(cacheKey, resp);
  return res.sendSuccess(resp);
});

export default handler;
