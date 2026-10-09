import { readFileSync, writeFileSync } from "node:fs";
import { randomBytes, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { parse } from "dotenv";

const serverPath = fileURLToPath(new URL("../.env", import.meta.url));
const clientPath = fileURLToPath(new URL("../../client/.env", import.meta.url));

function readEnv(path) {
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
}

let server = readEnv(serverPath);
const existing = parse(server);
const values = {
  PLAID_CLIENT_ID: "",
  PLAID_SECRET: "",
  PLAID_ENV: "sandbox",
  PLAID_ANDROID_PACKAGE_NAME: "com.seanc.mobilebudget",
  PLAID_CLIENT_USER_ID: randomUUID(),
  PLAID_APP_TOKEN: randomBytes(32).toString("hex"),
};

function setValue(text, name, value) {
  const line = new RegExp(`^\\s*(?:export\\s+)?${name}\\s*=.*$`, "m");
  if (line.test(text)) return text.replace(line, `${name}=${value}`);
  return `${text}${text && !text.endsWith("\n") ? "\n" : ""}${name}=${value}\n`;
}

for (const [name, fallback] of Object.entries(values)) {
  if (!existing[name]) server = setValue(server, name, fallback);
}
writeFileSync(serverPath, server);

let client = readEnv(clientPath);
const clientValues = parse(client);
const serverValues = parse(server);
if (!clientValues.EXPO_PUBLIC_PLAID_APP_TOKEN) {
  client = setValue(client, "EXPO_PUBLIC_PLAID_APP_TOKEN", serverValues.PLAID_APP_TOKEN);
  writeFileSync(clientPath, client);
} else if (clientValues.EXPO_PUBLIC_PLAID_APP_TOKEN !== serverValues.PLAID_APP_TOKEN) {
  throw new Error("The client API token differs from PLAID_APP_TOKEN. Match these values locally.");
}

console.log(
  `Plaid env configured for ${serverValues.PLAID_ENV}. Existing credentials were preserved.`,
);
console.log(
  "Set PLAID_CLIENT_ID and PLAID_SECRET in server/.env. Never put Plaid credentials in client/.env.",
);
console.log(
  "Back up the complete server/.data directory so the saved bank connection remains usable.",
);
