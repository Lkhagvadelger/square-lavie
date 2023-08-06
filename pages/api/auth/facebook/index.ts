import * as passport from "passport";
import { createHandler } from "@api/handler";

const handler = createHandler();

handler.get(
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);

export default handler;
