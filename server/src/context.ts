import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

import { db } from "./kysely/connection";

export interface AuthenticatedUser {
  id: string;
}

export interface Context {
  db: typeof db;
  requestId: string | null;
  authorization: string | null;
  user: AuthenticatedUser | null;
}

export function createContext({ req }: CreateExpressContextOptions): Context {
  return {
    db,
    requestId: req.header("x-request-id") ?? null,
    authorization: req.header("authorization") ?? null,
    // Authentication will populate this once the auth flow is implemented.
    user: null,
  };
}
