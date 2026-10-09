import type { z } from "zod";
import type {
  bankAccountSchema,
  bankTransactionSchema,
  connectionSchema,
  encryptedStoreSchema,
  storeSchema,
} from "../lib/schemas.js";

export type BankAccount = z.infer<typeof bankAccountSchema>;
export type BankTransaction = z.infer<typeof bankTransactionSchema>;
export type StoredConnection = z.infer<typeof connectionSchema>;
export type ConnectionStore = z.infer<typeof storeSchema>;
export type EncryptedStore = z.infer<typeof encryptedStoreSchema>;
export type BankData = Omit<StoredConnection, "accessToken" | "cursor">;
export type PlaidEnvironment = "sandbox" | "production";
export type PlaidErrorResponse = {
  response?: { data?: { error_code?: string; request_id?: string } };
};
