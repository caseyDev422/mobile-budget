import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const {PLAID_ENV, PLAID_CLIENT_ID, PLAID_SECRET} = process.env;

const createPlaidClient = () => {
  return new PlaidApi(
    new Configuration({
      basePath: PlaidEnvironments[PLAID_ENV!],
      baseOptions: {
        timeout: 30000,
        headers: {
          "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
          "PLAID-SECRET": PLAID_SECRET,
        },
      },
    }),
  );
}

export default createPlaidClient;