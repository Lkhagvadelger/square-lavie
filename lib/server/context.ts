import { CreateNextContextOptions } from "@trpc/server/adapters/next";
// import { userPrisma } from "./common/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./common/auth";
import { inferAsyncReturnType } from "@trpc/server";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  return {
    req,
    res,
    // prisma: userPrisma(session?.user.id ?? "NULL"),
    // session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
