import { TRPCError } from "@trpc/server";
import { bankProcedure } from "../lib/auth.js";
import { getPlaidClient } from "../lib/config.js";
import {
  mergeTransactions,
  publicBankData,
  toBankAccount,
  withConnectionLock,
} from "../lib/connection.js";
import { plaidErrorCode, throwBankError } from "../lib/errors.js";
import { syncBankDataInput } from "../lib/schemas.js";
import { readConnectionStore, writeConnectionStore } from "./connectionStore.js";

export default bankProcedure.input(syncBankDataInput).mutation(({ input }) =>
  withConnectionLock(async () => {
    try {
      const store = await readConnectionStore();
      const connection = store.connection;
      if (!connection)
        throw new TRPCError({ code: "NOT_FOUND", message: "Connect a bank account first." });
      const client = getPlaidClient();
      if (input.refreshBalances || !connection.accounts.length) {
        const balances = await client.accountsBalanceGet({ access_token: connection.accessToken });
        connection.accounts = balances.data.accounts.map(toBankAccount);
        // Commit balances independently so a transaction error does not discard them.
        connection.updatedAt = new Date().toISOString();
        await writeConnectionStore(store);
      }

      for (let attempt = 0; attempt < 3; attempt++) {
        let cursor = connection.cursor;
        let transactions = connection.transactions;
        let syncStatus = connection.syncStatus;
        try {
          for (let page = 0; ; page++) {
            if (page >= 100)
              throw new TRPCError({
                code: "TIMEOUT",
                message: "Transaction sync is too large. Please retry later.",
              });
            const response = await client.transactionsSync({
              access_token: connection.accessToken,
              cursor,
              count: 500,
            });
            transactions = mergeTransactions(transactions, response.data);
            cursor = response.data.next_cursor;
            syncStatus = response.data.transactions_update_status;
            if (!response.data.has_more) break;
          }
          connection.cursor = cursor;
          connection.transactions = transactions;
          connection.syncStatus = syncStatus;
          await writeConnectionStore(store);
          return publicBankData(connection);
        } catch (error) {
          if (
            plaidErrorCode(error) !== "TRANSACTIONS_SYNC_MUTATION_DURING_PAGINATION" ||
            attempt === 2
          )
            throw error;
          // Start over from the stored cursor; never commit an incomplete page sequence.
        }
      }
      throw new Error("Transaction sync did not complete.");
    } catch (error) {
      throwBankError(error);
    }
  }),
);
