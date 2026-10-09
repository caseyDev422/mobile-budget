export type BankAccount = {
  id: string;
  name: string;
  mask: string | null;
  balance: number | null;
  availableBalance: number | null;
  currency: string | null;
};

export type BankTransaction = {
  id: string;
  accountId: string;
  description: string;
  amount: number;
  currency: string | null;
  date: string;
  pending: boolean;
};

export type BankData = {
  itemId: string;
  connectedAt: string;
  accounts: BankAccount[];
  transactions: BankTransaction[];
  syncStatus: string | null;
  updatedAt: string | null;
};

export type ConnectionResult = { connection: BankData | null };
export type LinkTokenResult = { linkToken: string };
export type PlaidLinkResult = { publicToken: string | null };
