import { EmailType } from "@api/email/types";
import { createHandler } from "@api/handler";
import {
  changePasswordByToken,
  getUserByUnusedToken,
} from "@lib/user/api/service";
import { UserRole } from "@prisma/client";
import { AppError } from "@util/errors";
import { getCountryLang } from "@util/language";

const handler = createHandler();

handler.get(async (req, res) => {
  const userToken = await getUserByUnusedToken(req.body.token);
  if (userToken === null || userToken?.isTokenUsed != null)
    throw AppError.BadRequest("validation.invitation-token.invalid");

  return res.sendSuccess({ success: true });
});

handler.put(async (req, res, next) => {
  try {
    const userToken = await getUserByUnusedToken(req.body.token);
    if (userToken === null || userToken?.isTokenUsed != null)
      throw AppError.BadRequest("validation.invitation-token.invalid");

    //Update password here
    const user = await changePasswordByToken({
      inviteToken: req.body.token,
      password: req.body.password,
    });
    if (!user) throw AppError.BadRequest("validation.invitation-token.invalid");

    //TODO: send email after first sign up

    const targetLanguage = getCountryLang(user.profile?.country!); //building invitelink
   

    // Automatic login
    req.login(user, () => (req.session.userId = user.id));
    return res.sendSuccess({ success: true });
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
