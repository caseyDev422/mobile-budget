import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, randomUUID } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { getEnvironment } from "../lib/config.js";
import { decryptStore, encryptStore } from "../lib/encryption.js";
import { encryptedStoreSchema, storeSchema } from "../lib/schemas.js";
import type { ConnectionStore } from "../types/plaid.js";

function storeDirectory() {
  return (
    process.env.PLAID_DATA_DIR ?? fileURLToPath(new URL("../../../../.data/", import.meta.url))
  );
}

function storePath() {
  return resolve(storeDirectory(), `plaid-${getEnvironment()}.enc`);
}

async function getStorageKey(create = false): Promise<Buffer> {
  const path = resolve(storeDirectory(), ".storage-key");
  try {
    const key = await readFile(path);
    if (key.length !== 32) throw new Error("Invalid local storage key.");
    return key;
  } catch (error) {
    if (!create || (error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    await mkdir(storeDirectory(), { recursive: true });
    const key = randomBytes(32);
    try {
      await writeFile(path, key, { flag: "wx", mode: 0o600 });
      return key;
    } catch (writeError) {
      if ((writeError as NodeJS.ErrnoException).code === "EEXIST") return getStorageKey();
      throw writeError;
    }
  }
}

export async function readConnectionStore(): Promise<ConnectionStore> {
  let encrypted: string;
  try {
    encrypted = await readFile(storePath(), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return { version: 1, connection: null };
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to read the saved bank connection.",
    });
  }
  try {
    const key = await getStorageKey();
    return storeSchema.parse(
      JSON.parse(decryptStore(encryptedStoreSchema.parse(JSON.parse(encrypted)), key)),
    );
  } catch {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Unable to read the saved bank connection. Restore the complete server/.data backup; do not reconnect.",
    });
  }
}

export async function writeConnectionStore(store: ConnectionStore) {
  try {
    const encrypted = JSON.stringify(
      encryptStore(JSON.stringify(storeSchema.parse(store)), await getStorageKey(true)),
    );
    await mkdir(storeDirectory(), { recursive: true });
    const path = storePath();
    const temporaryPath = `${path}.${randomUUID()}.tmp`;
    await writeFile(temporaryPath, encrypted, { mode: 0o600 });
    await rename(temporaryPath, path);
  } catch {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Unable to save the bank connection. Check the server storage directory permissions.",
    });
  }
}
