import { publicProcedure } from "../../../trpc";

const getConnection = publicProcedure
  .query(async () => {
    
    // TODO: connect to some db to check if connection already exists
    return {
      hasConnection: false,
      connection: null,
    }
  });

export default getConnection;
