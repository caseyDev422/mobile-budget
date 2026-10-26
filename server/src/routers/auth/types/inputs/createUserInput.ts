import z from "zod";

export const createUserInput = z.object({
  name: z.string(),
  emailAddress: z.string().email(),
  password: z.string(),
})