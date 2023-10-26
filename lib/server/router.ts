import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";
import superjson from "superjson";
import { createContext } from "~/server/context";
import { nextAuthOptions } from "./common/auth";
import { Subject } from "@casl/ability";
import defineAbilityFor from "./common/abilities";
// import { isAuthenticated } from "./common/middlewares/auth";
// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const middleware = t.middleware;

export const isAuthenticated = middleware(async (opts) => {
  const { ctx } = opts;
  const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: session.user,
      ability: defineAbilityFor(session.user),
    },
  });
});

export const authorize = ([action, subject, field]: [
  string,
  Subject,
  string?
]) =>
  isAuthenticated.unstable_pipe(async (opts) => {
    const { ctx } = opts;

    if (ctx.ability.cannot(action, subject, field))
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Хандах эрх байхгүй.",
      });

    return opts.next();
  });

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const mergeRouters = t.mergeRouters;
