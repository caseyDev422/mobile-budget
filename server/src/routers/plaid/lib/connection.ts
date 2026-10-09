import type { AccountBase, Transaction, TransactionsSyncResponse } from "plaid";
import type { BankAccount, BankData, BankTransaction, StoredConnection } from "../types/plaid.js";

export function toBankAccount(account: AccountBase): BankAccount {
  return {
    id: account.account_id,
    name: account.name,
    mask: account.mask,
    balance: account.balances.current,
    availableBalance: account.balances.available,
    currency: account.balances.iso_currency_code ?? account.balances.unofficial_currency_code,
  };
}

export function toBankTransaction(transaction: Transaction): BankTransaction {
  return {
    id: transaction.transaction_id,
    accountId: transaction.account_id,
    description: transaction.merchant_name ?? transaction.name,
    amount: transaction.amount,
    currency: transaction.iso_currency_code ?? transaction.unofficial_currency_code,
    date: transaction.date,
    pending: transaction.pending,
  };
}

export function mergeTransactions(previous: BankTransaction[], page: TransactionsSyncResponse) {
  const transactions = new Map(previous.map((transaction) => [transaction.id, transaction]));
  for (const transaction of [...page.added, ...page.modified]) {
    transactions.set(transaction.transaction_id, toBankTransaction(transaction));
  }
  for (const transaction of page.removed) {
    transactions.delete(transaction.transaction_id);
  }
  return [...transactions.values()].sort(
    (a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id),
  );
}

export function publicBankData(connection: StoredConnection): BankData {
  const { accessToken: _accessToken, cursor: _cursor, ...data } = connection;
  return data;
}

let queue: Promise<unknown> = Promise.resolve();

// Serialize token exchanges and sync commits so concurrent requests cannot lose data.
export function withConnectionLock<T>(operation: () => Promise<T>): Promise<T> {
  const result = queue.then(operation);
  queue = result.catch(() => undefined);
  return result;
}
