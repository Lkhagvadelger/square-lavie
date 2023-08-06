import { createHandler } from "@api/handler";
import { createUserWithPhone } from "@lib/user/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req: any, res) => {
  try {
    const user = await createUserWithPhone(
      req.body.fullPhoneNumber,
      req.body.password
    );
    req.login(user, (err: any) => {
      if (err) throw AppError.Forbidden();
      req.session.userId = user.id;
      return res.sendSuccess(user);
    });
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
