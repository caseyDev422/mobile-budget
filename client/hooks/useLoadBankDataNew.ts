import { trpc } from '@/trpc';

export function useLoadBankDataNew(accessToken?: string | null) {
  return trpc.plaid.getTransactions.useInfiniteQuery(
    { accessToken: accessToken ?? undefined },
    {
      retry: (failureCount, error) =>
        !['NOT_FOUND', 'UNAUTHORIZED', 'BAD_REQUEST'].includes(error.data?.code ?? '') &&
        failureCount < 3,
      getNextPageParam: (lastPage) => (lastPage.has_more ? lastPage.next_cursor : undefined),
    }
  );
}
