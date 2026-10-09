import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export function createContext({ req }: CreateExpressContextOptions) {
  return {
    requestId: req.header("x-request-id") ?? null,
    authorization: req.header("authorization") ?? null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
