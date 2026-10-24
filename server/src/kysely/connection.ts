import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import type { Database } from "./db";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL must be set to a PostgreSQL connection string for mobile_budget_db.",
  );
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString }),
  }),
});
