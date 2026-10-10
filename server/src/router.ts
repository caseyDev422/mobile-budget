import { router } from "./trpc";
import plaidRouter from "./routers/plaid/plaidRouter";
import healthRouter from "./routers/health/procedures/healthRouter";

export const appRouter = router({
  plaid: plaidRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
