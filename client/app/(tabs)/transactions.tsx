import { useEffect, useMemo } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useLoadBankDataNew } from '@/hooks/useLoadBankDataNew';

const formatAmount = (amount: number, currency: string) =>
  `${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`.trim();

const Transactions = () => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useLoadBankDataNew();
  type Transaction = NonNullable<typeof data>['pages'][number]['added'][number];
  const transactions = useMemo(() => {
    const transactionsById = new Map<string, Transaction>();
    for (const page of data?.pages ?? []) {
      for (const transaction of [...page.added, ...page.modified]) {
        transactionsById.set(transaction.transaction_id, transaction);
      }
      for (const transaction of page.removed) {
        if (transaction.transaction_id) transactionsById.delete(transaction.transaction_id);
      }
    }
    return [...transactionsById.values()].sort((a, b) => b.date.localeCompare(a.date));
  }, [data]);

  useEffect(() => {
    if (data) console.log('Bank transactions:', transactions);
  }, [data, transactions]);

  useEffect(() => {
    if (error) console.error('Unable to load transactions:', error.message);
  }, [error]);

  const netTotals = new Map<string, number>();
  for (const transaction of transactions) {
    const currency = transaction.iso_currency_code ?? transaction.unofficial_currency_code ?? '';
    netTotals.set(currency, (netTotals.get(currency) ?? 0) - transaction.amount);
  }
  const netTotal = [...netTotals]
    .map(([currency, amount]) => formatAmount(amount, currency))
    .join('\n');

  return (
    <ScrollView className="flex-1 bg-app-light-bg dark:bg-app-dark-bg">
      <View className="px-6 pb-8 pt-6">
        <View className="flex-row gap-3">
          <Card
            className="flex-1"
            title="Net Total"
            titleSize="sm"
            content={
              <Text className="text-2xl font-semibold text-app-light-text dark:text-app-dark-text">
                {netTotal || '$0.00'}
              </Text>
            }
          />
          <Card
            className="flex-1"
            title="Total Transactions"
            titleSize="sm"
            content={
              <Text className="text-2xl font-semibold text-app-light-text dark:text-app-dark-text">
                {transactions.length}
              </Text>
            }
          />
        </View>

        <Text className="mt-6 text-xl font-semibold text-app-light-text dark:text-app-dark-text">
          Transactions
        </Text>
        <Text className="mt-2 text-sm text-app-light-muted dark:text-app-dark-muted">
          Totals reflect loaded transactions.
        </Text>
        {isLoading ? (
          <ActivityIndicator accessibilityLabel="Loading transactions" className="mt-4" />
        ) : null}
        {transactions.map((transaction) => (
          <View
            key={transaction.transaction_id}
            className="mt-4 flex-row items-center justify-between gap-3">
            <View className="flex-1">
              <Text className="text-base text-app-light-text dark:text-app-dark-text">
                {transaction.merchant_name ?? transaction.name}
              </Text>
              <Text className="text-sm text-app-light-muted dark:text-app-dark-muted">
                {transaction.date}
                {transaction.pending ? ' - Pending' : ''}
              </Text>
            </View>
            <Text className="text-base text-app-light-text dark:text-app-dark-text">
              {formatAmount(
                -transaction.amount,
                transaction.iso_currency_code ?? transaction.unofficial_currency_code ?? ''
              )}
            </Text>
          </View>
        ))}
        {!isLoading && !error && transactions.length === 0 ? (
          <Text className="mt-3 text-base text-app-light-muted dark:text-app-dark-muted">
            No transactions yet.
          </Text>
        ) : null}
        {error ? (
          <View className="mt-4 gap-3">
            <Text
              accessibilityRole="alert"
              className="text-base text-app-light-text dark:text-app-dark-text">
              {error.message}
            </Text>
            <Button
              title="Retry"
              onPress={() => {
                void refetch();
              }}
              disabled={isFetching}
              accessibilityState={{ disabled: isFetching, busy: isFetching }}
            />
          </View>
        ) : null}
        {hasNextPage ? (
          <Button
            className="mt-4"
            title={isFetchingNextPage ? 'Loading...' : 'Load more'}
            disabled={isFetching}
            accessibilityState={{ disabled: isFetching, busy: isFetching }}
            onPress={() => {
              void fetchNextPage();
            }}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Transactions;
