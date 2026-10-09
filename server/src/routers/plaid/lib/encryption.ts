import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import type { EncryptedStore } from "../types/plaid.js";

export function encryptStore(plaintext: string, key: Buffer): EncryptedStore {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return {
    version: 1,
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };
}

export function decryptStore(store: EncryptedStore, key: Buffer) {
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(store.iv, "base64"));
  decipher.setAuthTag(Buffer.from(store.tag, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(store.ciphertext, "base64")),
    decipher.final(),
  ]).toString("utf8");
}
