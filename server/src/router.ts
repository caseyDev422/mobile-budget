import { z } from "zod";

import { publicProcedure, router } from "./trpc.js";

export const appRouter = router({
  health: publicProcedure.query(() => {
    return {
      ok: true,
      now: new Date().toISOString(),
    };
  }),
  hello: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).default("world"),
      }),
    )
    .query(({ input, ctx }) => {
      return {
        message: `Hello, ${input.name}`,
        requestId: ctx.requestId,
      };
    }),
});

export type AppRouter = typeof appRouter;
