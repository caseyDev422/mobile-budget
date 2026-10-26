import type { Generated } from "kysely";

export interface UserAuthMethodTable {
  id: Generated<string>;
  user_id: string;
  auth_method_type_id: number;
  username: string | null;
  password: string | null;
  issuer: string | null;
  subject: string | null;
}
