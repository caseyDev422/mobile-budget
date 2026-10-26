import { router } from "./trpc";
import plaidRouter from "./routers/plaid/plaidRouter";
import healthRouter from "./routers/health/procedures/healthRouter";
import authRouter from "./routers/auth/authRouter";

export const appRouter = router({
  plaid: plaidRouter,
  health: healthRouter,
  auth: authRouter
});

export type AppRouter = typeof appRouter;
