import { createHandler } from "@api/handler";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    if (!req.user) throw AppError.Unauthorized();
    res.sendSuccess(req.user);
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
