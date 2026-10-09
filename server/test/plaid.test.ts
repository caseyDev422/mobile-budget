import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PlaidApi, Products } from "plaid";
import { appRouter } from "../src/router.js";
import {
  readConnectionStore,
  writeConnectionStore,
} from "../src/routers/plaid/procedures/connectionStore.js";

const envNames = [
  "PLAID_ENV",
  "PLAID_CLIENT_ID",
  "PLAID_SECRET",
  "PLAID_APP_TOKEN",
  "PLAID_CLIENT_USER_ID",
  "PLAID_ANDROID_PACKAGE_NAME",
  "PLAID_DATA_DIR",
];
const originalEnv = Object.fromEntries(envNames.map((name) => [name, process.env[name]]));
let directory: string;

const caller = () =>
  appRouter.createCaller({ requestId: null, authorization: "Bearer local-test-token" });

beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), "mobile-budget-plaid-"));
  Object.assign(process.env, {
    PLAID_ENV: "sandbox",
    PLAID_CLIENT_ID: "client-fixture",
    PLAID_SECRET: "secret-fixture",
    PLAID_APP_TOKEN: "local-test-token",
    PLAID_CLIENT_USER_ID: "personal-user-fixture",
    PLAID_ANDROID_PACKAGE_NAME: "com.seanc.mobilebudget",
    PLAID_DATA_DIR: directory,
  });
});

afterEach(async () => {
  mock.restoreAll();
  await rm(directory, { recursive: true, force: true });
  for (const name of envNames) {
    if (originalEnv[name] === undefined) delete process.env[name];
    else process.env[name] = originalEnv[name];
  }
});

async function seedConnection() {
  await writeConnectionStore({
    version: 1,
    connection: {
      itemId: "item-fixture",
      accessToken: "access-sandbox-private-fixture",
      connectedAt: "2026-10-08T12:00:00Z",
      accounts: [],
      transactions: [],
      syncStatus: null,
      updatedAt: null,
    },
  });
}

const transaction = (id: string, amount = 12.34) => ({
  transaction_id: id,
  account_id: "account-fixture",
  merchant_name: null,
  name: "Test purchase",
  amount,
  iso_currency_code: "USD",
  unofficial_currency_code: null,
  date: "2026-10-08",
  pending: false,
});

const page = (cursor: string, hasMore = false, added: ReturnType<typeof transaction>[] = []) => ({
  data: {
    accounts: [],
    added,
    modified: [],
    removed: [],
    next_cursor: cursor,
    has_more: hasMore,
    transactions_update_status: "HISTORICAL_UPDATE_COMPLETE",
  },
});

function mockBalances() {
  return mock.method(PlaidApi.prototype, "accountsBalanceGet", async () => ({
    data: {
      accounts: [
        {
          account_id: "account-fixture",
          name: "Checking",
          mask: "1234",
          balances: {
            current: 200.25,
            available: 190.25,
            iso_currency_code: "USD",
            unofficial_currency_code: null,
          },
        },
      ],
    },
  }));
}

test("bank endpoints require the local API token", async () => {
  const unauthenticated = appRouter.createCaller({ requestId: null, authorization: null });
  await assert.rejects(unauthenticated.plaid.getConnection(), { code: "UNAUTHORIZED" });
  await assert.rejects(unauthenticated.plaid.createLinkToken({ platform: "android" }), {
    code: "UNAUTHORIZED",
  });
});

test("creates a Transactions Link token with the registered Android package", async () => {
  const request = mock.method(PlaidApi.prototype, "linkTokenCreate", async () => ({
    data: { link_token: "link-fixture" },
  }));
  assert.deepEqual(await caller().plaid.createLinkToken({ platform: "android" }), {
    linkToken: "link-fixture",
  });
  const input = request.mock.calls[0].arguments[0]!;
  assert.deepEqual(input.products, [Products.Transactions]);
  assert.equal(input.android_package_name, "com.seanc.mobilebudget");
  assert.equal(input.user.client_user_id, "personal-user-fixture");
  assert.equal(input.redirect_uri, undefined);
});

test("persists exchanged tokens encrypted without returning them to the client", async () => {
  mock.method(PlaidApi.prototype, "itemPublicTokenExchange", async () => ({
    data: {
      item_id: "item-fixture",
      access_token: "access-sandbox-private-fixture",
    },
  }));
  assert.deepEqual(
    await caller().plaid.exchangePublicToken({ publicToken: "public-sandbox-fixture" }),
    { connected: true },
  );
  const disk = await readFile(join(directory, "plaid-sandbox.enc"), "utf8");
  assert.ok(!disk.includes("access-sandbox-private-fixture"));
  assert.equal(
    (await readConnectionStore()).connection?.accessToken,
    "access-sandbox-private-fixture",
  );
  const result = JSON.stringify(await caller().plaid.getConnection());
  assert.ok(!result.includes("accessToken"));
  assert.ok(!result.includes("cursor"));
});

test("prevents new Trial connections and uses the saved token for update mode", async () => {
  await seedConnection();
  const request = mock.method(PlaidApi.prototype, "linkTokenCreate", async () => ({
    data: { link_token: "link-update-fixture" },
  }));
  await assert.rejects(caller().plaid.createLinkToken({ platform: "android" }), {
    code: "CONFLICT",
  });
  assert.equal(request.mock.callCount(), 0);
  await caller().plaid.createLinkToken({ platform: "android", update: true });
  const input = request.mock.calls[0].arguments[0]!;
  assert.equal(input.access_token, "access-sandbox-private-fixture");
  assert.equal(input.products, undefined);
});

test("Sandbox and Production have separate saved connections", async () => {
  await seedConnection();
  process.env.PLAID_ENV = "production";
  assert.deepEqual(await caller().plaid.getConnection(), { connection: null });
  process.env.PLAID_ENV = "sandbox";
  assert.equal((await caller().plaid.getConnection()).connection?.itemId, "item-fixture");
});

test("syncs every page and applies transaction modifications and removals", async () => {
  await seedConnection();
  mockBalances();
  const request = mock.method(PlaidApi.prototype, "transactionsSync", async (input) => {
    if (!input?.cursor)
      return page("page-one", true, [transaction("removed"), transaction("updated")]);
    const response = page("page-two");
    response.data.modified = [transaction("updated", 42.5)] as never[];
    response.data.removed = [{ transaction_id: "removed" }] as never[];
    return response;
  });
  const data = await caller().plaid.syncBankData();
  assert.equal(request.mock.callCount(), 2);
  assert.equal(data.accounts[0].balance, 200.25);
  assert.deepEqual(
    data.transactions.map(({ id, amount }) => ({ id, amount })),
    [{ id: "updated", amount: 42.5 }],
  );
  assert.ok(!JSON.stringify(data).includes("access-sandbox"));
  assert.equal((await readConnectionStore()).connection?.cursor, "page-two");
});

test("restarts pagination from the original cursor on a mutation error", async () => {
  await seedConnection();
  mockBalances();
  let calls = 0;
  const cursors: (string | undefined)[] = [];
  mock.method(PlaidApi.prototype, "transactionsSync", async (input) => {
    cursors.push(input?.cursor);
    calls++;
    if (calls === 1) return page("partial-cursor", true, [transaction("discarded")]);
    if (calls === 2)
      throw { response: { data: { error_code: "TRANSACTIONS_SYNC_MUTATION_DURING_PAGINATION" } } };
    return page("complete-cursor", false, [transaction("kept")]);
  });
  const data = await caller().plaid.syncBankData();
  assert.deepEqual(cursors, [undefined, "partial-cursor", undefined]);
  assert.deepEqual(
    data.transactions.map(({ id }) => id),
    ["kept"],
  );
});

test("does not advance the cursor when a later sync page fails", async () => {
  await seedConnection();
  mockBalances();
  mock.method(PlaidApi.prototype, "transactionsSync", async (input) => {
    if (!input?.cursor) return page("partial-cursor", true, [transaction("uncommitted")]);
    throw { response: { data: { error_code: "INSTITUTION_DOWN" } } };
  });
  await assert.rejects(caller().plaid.syncBankData(), /INSTITUTION_DOWN/);
  const { connection } = await readConnectionStore();
  assert.equal(connection?.cursor, undefined);
  assert.deepEqual(connection?.transactions, []);
  assert.equal(connection?.accounts[0].balance, 200.25);
});

test("does not expose SDK request secrets in errors", async () => {
  mock.method(PlaidApi.prototype, "linkTokenCreate", async () => {
    throw {
      config: { headers: { "PLAID-SECRET": "secret-fixture" } },
      response: { data: { error_code: "INVALID_API_KEYS" } },
    };
  });
  await assert.rejects(caller().plaid.createLinkToken({ platform: "android" }), (error: Error) => {
    assert.match(error.message, /INVALID_API_KEYS/);
    assert.ok(!JSON.stringify(error).includes("secret-fixture"));
    return true;
  });
});

test("fails closed for damaged storage instead of losing the saved connection", async () => {
  await seedConnection();
  await writeFile(join(directory, ".storage-key"), Buffer.alloc(32, 123));
  await assert.rejects(
    caller().plaid.getConnection(),
    /Restore the complete server\/\.data backup/,
  );
});
