import { publicProcedure } from "../../../trpc";

const getHealth = publicProcedure
  .query(() => {
    return {
      ok: true,
      now: new Date().toISOString(),
    };
  });

export default getHealth;