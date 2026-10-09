import { TRPCError } from "@trpc/server";
import { bankProcedure } from "../lib/auth.js";
import { getPlaidClient } from "../lib/config.js";
import { withConnectionLock } from "../lib/connection.js";
import { throwBankError } from "../lib/errors.js";
import { exchangeTokenInput } from "../lib/schemas.js";
import { readConnectionStore, writeConnectionStore } from "./connectionStore.js";

export default bankProcedure.input(exchangeTokenInput).mutation(({ input }) =>
  withConnectionLock(async () => {
    try {
      const store = await readConnectionStore();
      if (store.connection) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A bank is already connected. Refresh the saved connection.",
        });
      }
      const response = await getPlaidClient().itemPublicTokenExchange({
        public_token: input.publicToken,
      });
      store.connection = {
        accessToken: response.data.access_token,
        itemId: response.data.item_id,
        connectedAt: new Date().toISOString(),
        accounts: [],
        transactions: [],
        syncStatus: null,
        updatedAt: null,
      };
      await writeConnectionStore(store);
      return { connected: true };
    } catch (error) {
      throwBankError(error);
    }
  }),
);
