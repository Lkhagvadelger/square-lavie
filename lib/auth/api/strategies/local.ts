import {
  getUserPasswordDigest,
  getUserPasswordDigestByPhone,
} from "@lib/user/api/service";
import { compare } from "bcryptjs";
import { Strategy } from "passport-local";

export const localStrategy = new Strategy(
  { usernameField: "username" },

  async (phoneOrEmail, password, callback) => {
    phoneOrEmail = phoneOrEmail?.toLowerCase();

    //validating user via phone number
    if (phoneOrEmail[0] === "+") {
      // email is phone number
      const { user, passwordDigest } = await getUserPasswordDigestByPhone(
        phoneOrEmail
      );
      const finalUser =
        passwordDigest && (await compare(password, passwordDigest))
          ? user
          : null;

      if (!finalUser) {
        return callback({ message: "invalid-credentials" }, false);
      }

      return callback(null, finalUser);
    }
    // Validating user via email address
    else {
      const { user, passwordDigest } = await getUserPasswordDigest(
        phoneOrEmail
      );
      const finalUser =
        passwordDigest && (await compare(password, passwordDigest))
          ? user
          : null;

      if (!finalUser) {
        return callback({ message: "invalid-credentials" }, false);
      }

      return callback(null, finalUser);
    }
  }
);
