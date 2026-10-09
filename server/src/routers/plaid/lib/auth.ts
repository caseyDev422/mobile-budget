import { timingSafeEqual } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc.js";
import { requireSetting } from "./config.js";

// This shared token gates the local, single-user server, not a public deployment.
export const bankProcedure = publicProcedure.use(({ ctx, next }) => {
  const expected = Buffer.from(`Bearer ${requireSetting("PLAID_APP_TOKEN")}`);
  const received = Buffer.from(ctx.authorization ?? "");
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Bank API access denied. Check the client API token.",
    });
  }
  return next();
});
