import { EmailType } from "@api/email/types";
import { createHandler } from "@api/handler";

import {
  consumePIN,
  createPINandSend as createPINandSendToUser,
  updateLastLoggedInDate,
  verifyPIN,
} from "@lib/user/api/pin";
import { AppError } from "@util/errors";

const handler = createHandler();

handler
  .patch(async (req, res) => {
    let [method, username] = [
      req.body.method as string,
      req.body.username as string,
    ];

    const user = await createPINandSendToUser(method, username);

    res.sendSuccess({ success: true });
  })
  .post(async (req, res) => {
    let [method, username] = [
      req.body.method as string,
      req.body.username as string,
    ];

    await verifyPIN(method, username, req.body.pin);
    const user = await consumePIN(method, username, req.body.pin);

    if (!user) throw AppError.BadRequest("unknown");
    // set lastLoggedInAt to now
    await updateLastLoggedInDate(user.id);
    // Automatic login
    req.login(user, () => (req.session.userId = user.id));
    res.sendSuccess({ success: true, userId: user.id });
  });

export default handler;
