import { createHandler } from "@api/handler";
import { RedisService } from "@api/redis";
import { PaymentService } from "@lib/square/api/paymentService";
import { z } from "zod";

const handler = createHandler();

const querySchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export type QueryRevenueResponse = {
  currency: string;
  revenue: number;
};

export type QueryRevenueParams = z.infer<typeof querySchema>;

handler.get(async (req, res) => {
  const input = querySchema.safeParse(req.query);
  if (!input.success) {
    return res.sendError(input.error, "Invalid parameters");
  }

  var revenue = await PaymentService.calculateRevenue(input.data);
  res.sendSuccess({
    revenue,
  });
});

export default handler;
