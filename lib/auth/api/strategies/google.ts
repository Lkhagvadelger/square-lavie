import { Strategy } from "passport-google-oauth20";
import { manageExternalUser } from "@lib/user/api/service";
import { apiRoot } from "@util/config";

export const googleStrategy = new Strategy(
  {
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: `${apiRoot}/auth/google/callback`,
  },
  async function (accessToken, refreshToken, profile, cb) {
    //Write code to save user profile in database.
    //should send newly generated user model to cb function
    const user = await manageExternalUser(
      profile._json.email || "",
      "google",
      profile._json.sub,
      accessToken,
      refreshToken
    );
    return cb(null, user);
  }
);
