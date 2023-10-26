import { router } from "~/server/router";
import { helloRouter } from "./routers/hello";

export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
