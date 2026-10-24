import z from "zod";

export const loginInput = z.object({
  isExternalLogin: z.boolean(),
  username: z.string().optional(),
  password: z.string().optional(),
});