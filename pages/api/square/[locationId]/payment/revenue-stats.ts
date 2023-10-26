import { createHandler } from "@api/handler";
import { RedisService } from "@api/redis";
import { RevenueService } from "@lib/square/api/revenue";
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

  var revenue = await RevenueService.calculateRevenue(input.data);
  res.sendSuccess({
    revenue,
    currency: "$",
  });
});

export default handler;
