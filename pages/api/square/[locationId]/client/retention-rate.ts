import { createHandler } from "@api/handler";
import { calculateRetentionRate } from "@lib/square/api/client/clientRetentionRate";
import { z } from "zod";

const querySchema = z.object({
  year: z.number().min(2010).max(2100),
  month: z.number().min(0).max(11),
});

export type RetentionRateParams = z.infer<typeof querySchema>;

export default createHandler().post(async (req, res) => {
  const input = querySchema.safeParse(req.body);
  if (!input.success) {
    return res.sendError(input.error, "Invalid parameters");
  }

  var retentionRate = await calculateRetentionRate(input.data);

  res.sendSuccess({ retentionRate });
});
