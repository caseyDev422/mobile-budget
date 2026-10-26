import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc";
import { loginInput } from "../types/inputs/loginInput";
import checkPassword from "../lib/checkPassword";

const login = publicProcedure
  .input(loginInput)
  .mutation(async ({ctx, input}) => {
    try {
      const {username, password} = input;

      if (input.isExternalLogin) {
        // handle external logic
      }

      const user = await ctx.db.selectFrom('app_user')
      .select('id')
      .executeTakeFirst();

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid username or password'
        });
      }

      const authMethod = await ctx.db.selectFrom('user_auth_method')
      .selectAll()
      .where('user_id', '=', user.id)
      .executeTakeFirst();

      if (!authMethod) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid username or password'
        });
      }

      const doesPasswordMatch = authMethod ? await checkPassword(password!, authMethod.password!) : false;

      if (!doesPasswordMatch) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid username or password'
        });
      }

      return authMethod;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred during login',
        cause: error
      })
    }
  });

export default login;