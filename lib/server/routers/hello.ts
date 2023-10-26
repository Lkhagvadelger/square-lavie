import { publicProcedure, router } from "../router";

export const helloRouter = router({
  hello: publicProcedure.query(() => ({ message: "Hello world" })),
});
