import { TRPCError } from "@trpc/server";
import type { PlaidErrorResponse } from "../types/plaid.js";

export function plaidErrorCode(error: unknown) {
  return (error as PlaidErrorResponse | null)?.response?.data?.error_code;
}

export function throwBankError(error: unknown): never {
  if (error instanceof TRPCError) throw error;
  const code = plaidErrorCode(error);
  const messages: Record<string, string> = {
    ITEM_LOGIN_REQUIRED: "Your bank connection needs to be reconnected.",
    PRODUCT_NOT_READY: "Your bank is still preparing transaction data. Try refreshing shortly.",
    INVALID_API_KEYS: "Check PLAID_CLIENT_ID, PLAID_SECRET, and PLAID_ENV in server/.env.",
    INVALID_FIELD:
      "Check the Plaid Link configuration. Register com.seanc.mobilebudget in the Dashboard's allowed Android package names.",
    INVALID_PUBLIC_TOKEN: "The bank link expired. Please try again.",
    INSTITUTION_DOWN: "Your bank is temporarily unavailable. Try again later.",
    RATE_LIMIT_EXCEEDED: "Too many bank requests. Please wait before retrying.",
  };
  // Never forward Axios errors: they can contain the Plaid secret and access token.
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: code
      ? `${code}: ${messages[code] ?? "Plaid could not complete the bank request."}`
      : "Unable to complete the bank request.",
  });
}
