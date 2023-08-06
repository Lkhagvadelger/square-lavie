import { createHandler } from "@api/handler";
import { User } from "@sentry/react";
import { AppError } from "@util/errors";
import * as passport from "passport";
const handler = createHandler();

handler.post(async (req, res, next) => {
  try {
    passport.authenticate("local", (err: any, user: Express.User & User) => {
      if (err || !user)
        return res.sendError(AppError.Forbidden("invalid-credentials"));

      req.logIn(user, (err) => {
        if (err) return res.sendError(AppError.Forbidden());
        req.session.userId = user.id;
        return res.sendSuccess(user);
      });
    })(req, res, next);
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
