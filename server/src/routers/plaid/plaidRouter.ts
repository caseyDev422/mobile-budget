import { router } from "../../trpc.js";
import createLinkToken from "./procedures/createLinkToken.js";
import exchangePublicToken from "./procedures/exchangePublicToken.js";
import getConnection from "./procedures/getConnection.js";
import syncBankData from "./procedures/syncBankData.js";

export default router({ createLinkToken, exchangePublicToken, getConnection, syncBankData });
