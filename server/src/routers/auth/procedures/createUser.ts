import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc";
import { createUserInput } from "../types/inputs/createUserInput";

const createUser = publicProcedure
  .input(createUserInput)
  .mutation(async ({ctx, input}) => {
    try {
      await ctx.db.insertInto('app_user')
      .values({
        name: input.name,
        created_at: new Date()
      });

      return 'Created new user successfully!';
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error creating user', 
        cause: error
      })
    }
  });

export default createUser;