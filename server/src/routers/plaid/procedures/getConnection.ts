import { bankProcedure } from "../lib/auth.js";
import { publicBankData } from "../lib/connection.js";
import { readConnectionStore } from "./connectionStore.js";

export default bankProcedure.query(async () => {
  const { connection } = await readConnectionStore();
  return { connection: connection ? publicBankData(connection) : null };
});
