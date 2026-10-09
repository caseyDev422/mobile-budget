import { CountryCode, Products } from "plaid";
import { TRPCError } from "@trpc/server";
import { bankProcedure } from "../lib/auth.js";
import { getPlaidClient, requireSetting } from "../lib/config.js";
import { withConnectionLock } from "../lib/connection.js";
import { throwBankError } from "../lib/errors.js";
import { linkTokenInput } from "../lib/schemas.js";
import { readConnectionStore, writeConnectionStore } from "./connectionStore.js";

export default bankProcedure.input(linkTokenInput).mutation(({ input }) =>
  withConnectionLock(async () => {
    try {
      const store = await readConnectionStore();
      if (store.connection && !input.update) {
        throw new TRPCError({
          code: "CONFLICT",
          message:
            "A bank is already connected. Refresh it instead of creating another Trial connection.",
        });
      }
      if (input.update && !store.connection) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No saved bank connection to reconnect.",
        });
      }
      // Verify encrypted persistence works before opening Link or consuming a Trial Item.
      await writeConnectionStore(store);
      const response = await getPlaidClient().linkTokenCreate({
        user: { client_user_id: requireSetting("PLAID_CLIENT_USER_ID") },
        client_name: "Budget App",
        country_codes: [CountryCode.Us],
        language: "en",
        ...(input.update
          ? { access_token: store.connection!.accessToken }
          : { products: [Products.Transactions] }),
        ...(input.platform === "android"
          ? { android_package_name: requireSetting("PLAID_ANDROID_PACKAGE_NAME") }
          : { redirect_uri: requireSetting("PLAID_REDIRECT_URI") }),
      });
      return { linkToken: response.data.link_token };
    } catch (error) {
      throwBankError(error);
    }
  }),
);
