import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export function createContext({ req }: CreateExpressContextOptions) {
  return {
    requestId: req.header("x-request-id") ?? null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
