import { z } from "zod";

export const bankAccountSchema = z.object({
  id: z.string(),
  name: z.string(),
  mask: z.string().nullable(),
  balance: z.number().nullable(),
  availableBalance: z.number().nullable(),
  currency: z.string().nullable(),
});

export const bankTransactionSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.string().nullable(),
  date: z.string(),
  pending: z.boolean(),
});

export const connectionSchema = z.object({
  itemId: z.string(),
  accessToken: z.string(),
  connectedAt: z.string(),
  cursor: z.string().optional(),
  accounts: z.array(bankAccountSchema),
  transactions: z.array(bankTransactionSchema),
  syncStatus: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

export const storeSchema = z.object({
  version: z.literal(1),
  connection: connectionSchema.nullable(),
});

export const encryptedStoreSchema = z.object({
  version: z.literal(1),
  iv: z.string(),
  tag: z.string(),
  ciphertext: z.string(),
});

export const linkTokenInput = z.object({
  platform: z.enum(["android", "ios"]),
  update: z.boolean().default(false),
});

export const exchangeTokenInput = z.object({
  publicToken: z.string().startsWith("public-").max(512),
});

export const syncBankDataInput = z
  .object({ refreshBalances: z.boolean().default(true) })
  .default({});
