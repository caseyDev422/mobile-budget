import { CountryCode, Products } from "plaid";
import { TRPCError } from "@trpc/server";
import { linkTokenInput } from "../lib/schemas";
import createPlaidClient from "../lib/createPlaidClient";
import { publicProcedure } from "../../../trpc";

const {PLAID_CLIENT_USER_ID, PLAID_ANDROID_PACKAGE_NAME, PLAID_REDIRECT_URI} = process.env;

const createLinkToken = publicProcedure
  .input(linkTokenInput)
  .mutation(async ({ input }) => {
    try {
const plaidClient = createPlaidClient();
      const response = await plaidClient.linkTokenCreate({
        user: { client_user_id:  PLAID_CLIENT_USER_ID! },
        client_name: "Budget App",
        country_codes: [CountryCode.Us],
        language: "en",
        ...(input.accessToken
          ? { access_token: input.accessToken }
          : { products: [Products.Transactions] }),
        ...(input.platform === "android"
          ? { android_package_name: PLAID_ANDROID_PACKAGE_NAME }
          : { redirect_uri: PLAID_REDIRECT_URI }),
      });
      return { linkToken: response.data.link_token };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: 'Error creating link token',
        cause: error
      })
    }
  });

export default createLinkToken;