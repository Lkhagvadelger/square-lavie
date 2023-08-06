import * as passport from "passport";
import { appRoot } from "@util/config";
import { createHandler } from "@api/handler";

const handler = createHandler();

handler.get(
  passport.authenticate("facebook", {
    failureRedirect: `${appRoot}/auth/login`,
  }),
  async (_req, res) => {
    res.redirect(appRoot);
  }
);

export default handler;
