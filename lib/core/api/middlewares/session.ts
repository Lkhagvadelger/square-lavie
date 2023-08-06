import { prisma } from "@api/prisma";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { User } from "@sentry/react";
import signature from "cookie-signature";
import { NextApiRequest, NextApiResponse } from "next";
import nextSession from "next-session";
import { promisifyStore } from "next-session/lib/compat";

const secret = process.env.COOKIE_SECRET || "";

const getSession = nextSession({
  name: "connect.sid",
  decode: (raw: string) => signature.unsign(raw.slice(2), secret) || "",
  encode: (sid: string) =>
    (sid ? "s:" + signature.sign(sid, secret) : null) || "",
  touchAfter: 1 * 60 * 1000, // 1 minute
  store: promisifyStore(
    new PrismaSessionStore(prisma, {
      checkPeriod: 1 * 60 * 1000, // 1 minute
      ttl: 24 * 60 * 60 * 1000, // 24 hours
    })
  ),
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    path: "/",
    httpOnly: true,
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
    secure:
      process.env.NODE_ENV !== "development" && !process.env.INSECURE_AUTH,
  },
});

export const sessionMiddleware = async (
  req: NextApiRequest & { user: User },
  res: NextApiResponse,
  next: () => void
) => {
  const session = await getSession(req, res);
  session.touch();
  next();
};
