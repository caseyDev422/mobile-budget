# Plaid Setup

The app uses the existing tRPC server and Plaid's official Node and React Native SDKs.
This is a local, single-user integration. Replace the shared app token with real
user authentication before deploying or sharing the server.

## Credentials

In Plaid Dashboard > Developers > Keys, get your client ID and the secret for the
environment you want to use. Set these only in `server/.env`:

```dotenv
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_sandbox_secret
PLAID_ENV=sandbox
```

Sandbox uses test accounts, not your actual bank. A Trial uses `production` and
the Production secret to connect a real bank account. There is no `trial` API
environment. The Trial limits the total number of new Production Items, so refresh
or reconnect the saved Item rather than creating new connections.

Run `pnpm setup:plaid` from `server` to add any missing local settings. It preserves
your credentials and generates the personal user ID and shared app token. The
matching `EXPO_PUBLIC_PLAID_APP_TOKEN` in `client/.env` is a local API access gate,
not a Plaid credential. Do not put `PLAID_SECRET` or bank access tokens in the client.

Add `com.seanc.mobilebudget` to Plaid Dashboard's allowed Android package names.
It must match `PLAID_ANDROID_PACKAGE_NAME` in `server/.env` and the app configuration.
For iOS, configure a registered HTTPS `PLAID_REDIRECT_URI` before linking.

## Run

After changing `.env` or installing dependencies, restart your existing terminals:

```powershell
# Server directory
pnpm dev

# Client directory: build/install on the Android emulator
pnpm android
```

Plaid includes native code and does not run in Expo Go. `pnpm android` builds a
standalone debug app, not Expo Go. If an old Metro process reports a missing pnpm
temporary directory, stop it and run `pnpm start --clear` before opening the native
app. Do not open the project in Expo Go to test bank linking.

The dashboard button links your account once, then refreshes the saved connection.
Balances and transactions are logged to the client console. Initial transactions
may take time; refresh again if Plaid reports that data is not ready. Refresh reads
Plaid's latest available transactions; it does not force a new bank transaction pull.
Plaid transaction amounts are in currency units, not cents; positive amounts are
outflows and negative amounts are inflows.

## Storage

The server stores the connection, transaction cursor, balances, and transactions
under `server/.data`, which is ignored by Git. Tokens are encrypted with a locally
generated storage key. No manually configured encryption environment variable is
required. Back up the complete directory, including hidden files, to retain access
after a reinstall. Sandbox and Production connections are stored separately.
Encryption does not protect against someone who can read the complete directory;
restrict access to the workspace and backups.

Access tokens and cursors are never returned to the client. SDK error objects are
not forwarded because they can contain request credentials.

## References

- https://plaid.com/docs/link/react-native/
- https://plaid.com/docs/account/billing/
- https://plaid.com/docs/api/products/transactions/
