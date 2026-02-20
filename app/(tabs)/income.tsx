import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EasyIcon from 'react-native-easy-icon';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

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
  const totalIncome = incomeData.reduce((sum, income) => sum + income.amount, 0);

  return (
    <ScrollView className='flex-1 bg-[#f5f7fb]'>
      <View className='px-6 pt-6 pb-8'>
        <Button
          className='w-full rounded-md px-4 py-2'
          title='Add Income'
          icon={
            <EasyIcon
              type='antdesign'
              name='plus'
              size={12}
              color='#fff'
            />
          }
        />

        <View className='mt-4 flex-row gap-3'>
          <Card
            className='flex-1'
            title='Total Income'
            titleSize='sm'
            content={
              <Text className='text-2xl font-semibold text-[#1f2933]'>
                {formatCurrency(totalIncome)}
              </Text>
            }
          />
          <Card
            className='flex-1'
            title='Total Income Sources'
            titleSize='sm'
            content={
              <Text className='text-2xl font-semibold text-[#1f2933]'>{incomeData.length}</Text>
            }
          />
        </View>

        <Text className='mt-6 text-xl font-semibold text-[#1f2933]'>Income</Text>

        <View className='mt-3 gap-3'>
          {incomeData.map((income) => {
            const percentOfIncome = totalIncome === 0 ? 0 : (income.amount / totalIncome) * 100;

            return (
              <View key={income.id} className='rounded-xl bg-white p-4'>
                <View className='flex-row items-start'>
                  <View className='flex-1 pr-3'>
                    <Text className='text-base font-semibold text-[#1f2933]'>{income.title}</Text>
                    <Text className='mt-1 text-sm text-[#6b7280]'>
                      {income.source} | {formatDate(income.date)}
                    </Text>
                  </View>

                  <View className='items-end'>
                    <Text className='text-base font-semibold text-[#1f2933]'>
                      {formatCurrency(income.amount)}
                    </Text>
                    <View className='mt-2 flex-row items-center'>
                      <TouchableOpacity
                        className='mr-3'
                        accessibilityRole='button'
                        accessibilityLabel={`Edit ${income.title}`}
                      >
                        <EasyIcon type='feather' name='edit-2' size={16} color='#4a5565' />
                      </TouchableOpacity>
                      <TouchableOpacity
                        accessibilityRole='button'
                        accessibilityLabel={`Delete ${income.title}`}
                      >
                        <EasyIcon type='feather' name='trash-2' size={16} color='#dc2626' />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View className='mt-3 flex-row items-center'>
                  <View className='mr-3 h-2 flex-1 overflow-hidden rounded-full bg-[#e5e7eb]'>
                    <View
                      className='h-full rounded-full bg-[#16a34a]'
                      style={{ width: `${percentOfIncome}%` }}
                    />
                  </View>
                  <Text className='w-24 text-right text-xs text-[#4a5565]'>
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
