import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EasyIcon from 'react-native-easy-icon';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useThemeColors } from '@/theme/colors';

type IncomeEntry = {
  id: string;
  title: string;
  source: string;
  date: Date;
  amount: number;
};

const incomeData: IncomeEntry[] = [
  {
    id: '1',
    title: 'Main Paycheck',
    source: 'Employer',
    date: new Date('2026-02-15'),
    amount: 2450
  },
  {
    id: '2',
    title: 'Freelance Project',
    source: 'Side Work',
    date: new Date('2026-02-12'),
    amount: 780.5
  },
  {
    id: '3',
    title: 'Dividend Payout',
    source: 'Investments',
    date: new Date('2026-02-08'),
    amount: 124.35
  },
  {
    id: '4',
    title: 'Tax Refund',
    source: 'IRS',
    date: new Date('2026-02-05'),
    amount: 430.25
  }
];

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

const Income = () => {
  const colors = useThemeColors();
  const totalIncome = incomeData.reduce((sum, income) => sum + income.amount, 0);

  return (
    <ScrollView className='flex-1 bg-app-light-bg dark:bg-app-dark-bg'>
      <View className='px-6 pt-6 pb-8'>
        <Button
          className='w-full rounded-md px-4 py-2'
          title='Add Income'
          icon={
            <EasyIcon
              type='antdesign'
              name='plus'
              size={12}
              color={colors.onPrimary}
            />
          }
        />

        <View className='mt-4 flex-row gap-3'>
          <Card
            className='flex-1'
            title='Total Income'
            titleSize='sm'
            content={
              <Text className='text-2xl font-semibold text-app-light-text dark:text-app-dark-text'>
                {formatCurrency(totalIncome)}
              </Text>
            }
          />
          <Card
            className='flex-1'
            title='Total Income Sources'
            titleSize='sm'
            content={
              <Text className='text-2xl font-semibold text-app-light-text dark:text-app-dark-text'>{incomeData.length}</Text>
            }
          />
        </View>

        <Text className='mt-6 text-xl font-semibold text-app-light-text dark:text-app-dark-text'>Income</Text>

        <View className='mt-3 gap-3'>
          {incomeData.map((income) => {
            const percentOfIncome = totalIncome === 0 ? 0 : (income.amount / totalIncome) * 100;

            return (
              <View
                key={income.id}
                className='rounded-xl bg-white p-4 shadow-md dark:bg-app-dark-surface'
                style={{
                  shadowColor: colors.text,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.18,
                  shadowRadius: 8,
                  elevation: 5
                }}
              >
                <View className='flex-row items-start'>
                  <View className='flex-1 pr-3'>
                    <Text className='text-base font-semibold text-app-light-text dark:text-app-dark-text'>{income.title}</Text>
                    <Text className='mt-1 text-sm text-app-light-muted dark:text-app-dark-muted'>
                      {income.source} | {formatDate(income.date)}
                    </Text>
                  </View>

                  <View className='items-end'>
                    <Text className='text-base font-semibold text-app-light-text dark:text-app-dark-text'>
                      {formatCurrency(income.amount)}
                    </Text>
                    <View className='mt-2 flex-row items-center'>
                      <TouchableOpacity
                        className='mr-3'
                        accessibilityRole='button'
                        accessibilityLabel={`Edit ${income.title}`}
                      >
                        <EasyIcon type='feather' name='edit-2' size={16} color={colors.text} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        accessibilityRole='button'
                        accessibilityLabel={`Delete ${income.title}`}
                      >
                        <EasyIcon type='feather' name='trash-2' size={16} color={colors.critical} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View className='mt-3 flex-row items-center'>
                  <View className='mr-3 h-2 flex-1 overflow-hidden rounded-full bg-app-light-border dark:bg-app-dark-border'>
                    <View
                      className='h-full rounded-full'
                      style={{ backgroundColor: colors.primary, width: `${percentOfIncome}%` }}
                    />
                  </View>
                  <Text className='w-24 text-right text-xs text-app-light-text dark:text-app-dark-text'>
                    {percentOfIncome.toFixed(1)}% of income
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Income;
