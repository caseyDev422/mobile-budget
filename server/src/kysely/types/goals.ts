import type { Generated } from "kysely";

import type { Numeric } from "./income";

export interface GoalsTable {
  id: Generated<string>;
  goal_due_date: Date;
  current_amount: Numeric;
  goal_amount: Numeric;
  goal_types_id: number;
}
