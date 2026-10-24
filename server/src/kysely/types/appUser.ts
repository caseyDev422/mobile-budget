import type { Generated } from "kysely";

export interface AppUserTable {
  id: Generated<string>;
  name: string | null;
  created_at: Generated<Date>;
}
