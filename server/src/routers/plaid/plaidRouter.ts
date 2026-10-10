import { router } from "../../trpc";
import createLinkToken from "./procedures/createLinkToken";
import exchangePublicToken from "./procedures/exchangePublicToken";
import getConnection from "./procedures/getConnection";
import syncBankData from "./procedures/syncBankData";

const plaidRouter = router({
  createLinkToken,
  exchangePublicToken,
  getConnection,
  syncBankData,
});

export default plaidRouter;