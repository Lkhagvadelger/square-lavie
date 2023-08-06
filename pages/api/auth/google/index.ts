import * as passport from "passport";
import { createHandler } from "@api/handler";

const handler = createHandler();

handler.get(
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email"],
  }),
  async (req, res) => {
    req.session.userId = req.user.id;
    res.sendSuccess(req.user);
  }
);

export default handler;
