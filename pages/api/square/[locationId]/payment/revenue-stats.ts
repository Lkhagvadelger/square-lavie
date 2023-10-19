import { createHandler } from "@api/handler";
import { RedisService } from "@api/redis";
import { PaymentService } from "@lib/square/api/paymentService";
import { z } from "zod";

const handler = createHandler();

const querySchema = z.object({
  beginTime: z.string().datetime(),
  endTime: z.string().datetime(),
});

export type QueryRevenueResponse = {
  currency: string;
  revenue: number;
};

export type QueryRevenueParams = z.infer<typeof querySchema>;

handler.get(async (req, res) => {
  const input = querySchema.safeParse(req.query);
  if (!input.success) {
    return res
      .status(400)
      .json({ messsage: "Incorrect input", error: input.error });
  }

  const cached = await RedisService.getCached(input.data);
  if (cached) res.sendSuccess(cached);

  var response = await PaymentService.queryPayments(
    input.data.beginTime,
    input.data.endTime
  );
  const revenue = response.reduce(
    (acc, cur) => acc + parseFloat(cur.amountMoney?.amount?.toString() ?? "0"),
    0
  );
  const resp = {
    currency: response.length == 0 ? "$" : response[0].amountMoney?.currency,
    revenue,
  };
  RedisService.setCache(input.data, resp);
  return res.sendSuccess(resp);
});

export default handler;
