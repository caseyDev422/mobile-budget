import { router } from "../../trpc";
import createLinkToken from "./procedures/createLinkToken";
import exchangePublicToken from "./procedures/exchangePublicToken";
import getConnection from "./procedures/getConnection";
import getTransactions from "./procedures/syncBankData";

const plaidRouter = router({
  createLinkToken,
  exchangePublicToken,
  getConnection,
  getTransactions,
});

export default plaidRouter;
