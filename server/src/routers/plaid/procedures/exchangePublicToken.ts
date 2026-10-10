import { TRPCError } from "@trpc/server";
import { bankProcedure } from "../lib/auth";
import { getPlaidClient } from "../lib/config";
import { withConnectionLock } from "../lib/connection";
import { throwBankError } from "../lib/errors";
import { exchangeTokenInput } from "../lib/schemas";
import { readConnectionStore, writeConnectionStore } from "./connectionStore";

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
