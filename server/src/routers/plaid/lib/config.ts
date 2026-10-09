import { TRPCError } from "@trpc/server";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import type { PlaidEnvironment } from "../types/plaid.js";

export function getEnvironment(): PlaidEnvironment {
  const environment = process.env.PLAID_ENV ?? "sandbox";
  if (environment !== "sandbox" && environment !== "production") {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "PLAID_ENV must be sandbox or production.",
    });
  }
  return environment;
}

export function requireSetting(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Set ${name} in server/.env.` });
  }
  return value;
}

export function getPlaidClient() {
  return new PlaidApi(
    new Configuration({
      basePath: PlaidEnvironments[getEnvironment()],
      baseOptions: {
        timeout: 30000,
        headers: {
          "PLAID-CLIENT-ID": requireSetting("PLAID_CLIENT_ID"),
          "PLAID-SECRET": requireSetting("PLAID_SECRET"),
        },
      },
    }),
  );
}
