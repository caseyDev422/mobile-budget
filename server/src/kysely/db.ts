import type {
  AppUserTable,
  AuthMethodTypesTable,
  CategoriesTable,
  GoalTypesTable,
  GoalsTable,
  IncomeTable,
  UserAuthMethodTable,
} from "./types/types";

export interface Database {
  income: IncomeTable;
  goal_types: GoalTypesTable;
  goals: GoalsTable;
  categories: CategoriesTable;
  app_user: AppUserTable;
  auth_method_types: AuthMethodTypesTable;
  user_auth_method: UserAuthMethodTable;
}
