import { createHandler } from "@api/handler";
import { AppError } from "@util/errors";
import { validatePhoneNumber } from "@lib/user/data/validators";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    const isValid = validatePhoneNumber(
      req.body.phoneNumber,
      req.body.countryCode
    );
    return res.sendSuccess({ isValid });
  } catch (e) {
    res.sendError(e);
  }
});
export default handler;
