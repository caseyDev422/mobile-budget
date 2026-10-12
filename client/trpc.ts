import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../server/src/router';

export const trpc = createTRPCReact<AppRouter>();

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/trpc',
      headers() {
        const appToken = process.env.EXPO_PUBLIC_PLAID_APP_TOKEN;
        return appToken ? { authorization: `Bearer ${appToken}` } : {};
      },
    }),
  ],
});

export default trpc;
