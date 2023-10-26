import { createHandler } from "@api/handler";
import { RedisService } from "@api/redis";
import { RevenueService } from "@lib/square/api/revenue";
import { z } from "zod";

const handler = createHandler();

const querySchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
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
  const series = await RevenueService.calculateRevenueOverTime(input.data);
  return res.sendSuccess(series);
});

export default handler;
