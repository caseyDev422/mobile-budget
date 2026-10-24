import type { ColumnType, Generated } from "kysely";

// PostgreSQL NUMERIC values are returned as strings by node-postgres.
export type Numeric = ColumnType<string, number | string, number | string>;

export interface IncomeTable {
  id: Generated<number>;
  type: string;
  date_added: Generated<Date>;
  date_edited: Date | null;
  amount: Numeric;
  name: string;
}
