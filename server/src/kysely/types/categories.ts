import type { Generated } from "kysely";

import type { Numeric } from "./income";

export interface CategoriesTable {
  id: Generated<number>;
  name: string;
  max_amount: Numeric;
  current_amount: Numeric;
}
