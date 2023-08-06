import {
  deserializeUser,
  facebookStrategy,
  googleStrategy,
  localStrategy,
  serializeUser,
} from "@lib/auth/api/service";
import * as passport from "passport";

passport.use(localStrategy);
passport.use(facebookStrategy);
passport.use(googleStrategy);

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export { passport };
