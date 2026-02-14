import { ScrollView, View, Text } from 'react-native';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import EasyIcon from 'react-native-easy-icon';
import { PieChart } from 'react-native-gifted-charts';

const Dashboard = () => {
  const totalIncome = 12450;
  const incomeSources = 5;
  const totalExpenses = 8360;
  const expenseTransactions = 27;
  const remainingIncome = totalIncome - totalExpenses;
  const totalSavingsGoals = 14500;
  const totalDebtGoals = 6800;
  const savingsGoalCount = 5;
  const debtGoalCount = 5;
  const spendingByCategory = [
    { label: 'Groceries', value: 920, color: '#4f46e5' },
    { label: 'Transportation', value: 540, color: '#0891b2' },
    { label: 'Utilities', value: 460, color: '#16a34a' },
    { label: 'Dining', value: 630, color: '#f97316' },
    { label: 'Entertainment', value: 380, color: '#db2777' },
    { label: 'Shopping', value: 710, color: '#eab308' }
  ];
  const budgetLimitsByCategory = [
    { category: 'Groceries', spent: 312.75, total: 450 },
    { category: 'Transportation', spent: 145.2, total: 220 },
    { category: 'Utilities', spent: 201.45, total: 300 },
    { category: 'Dining', spent: 287.9, total: 320 },
    { category: 'Entertainment', spent: 128.35, total: 250 },
    { category: 'Shopping', spent: 75.45, total: 400 }
  ];

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const pieData = spendingByCategory.map((item) => ({
    value: item.value,
    color: item.color
  }));
  const getProgressColor = (percent: number) => {
    if (percent >= 90) return '#dc2626';
    if (percent >= 75) return '#ea580c';
    return '#16a34a';
  };

  return (
    <ScrollView className='flex-1'>
      <View className='px-6 pt-6 pb-8'>
        <View className='flex-row gap-3'>
          <Button
            className='flex-1 h-11 rounded-md px-2 py-2'
            title='Quick Transaction'
            icon={
              <EasyIcon
                type='antdesign'
                name='plus'
                size={14}
                color='#fff'
              />
            }
          />
          <Button
            className='flex-1 h-11 rounded-md px-2 py-2'
            title='Quick Income'
            icon={
              <EasyIcon
                type='antdesign'
                name='plus'
                size={14}
                color='#fff'
              />
            }
          />
        </View>
        <View className='mt-6 flex-row flex-wrap gap-3 content-start'>
          <Card
            className='basis-[48%] min-w-[145px]'
            title='Total Income'
            titleSize='sm'
            content={
              <View>
                <Text className='text-2xl font-semibold text-[#1f2933]'>{formatCurrency(totalIncome)}</Text>
                <Text className='mt-1 text-sm text-[#6b7280]'>{incomeSources} sources</Text>
              </View>
            }
          />
          <Card
            className='basis-[48%] min-w-[145px]'
            title='Total Expenses'
            titleSize='sm'
            content={
              <View>
                <Text className='text-2xl font-semibold text-[#1f2933]'>{formatCurrency(totalExpenses)}</Text>
                <Text className='mt-1 text-sm text-[#6b7280]'>{expenseTransactions} transactions</Text>
              </View>
            }
          />
          <Card
            className='basis-[48%] min-w-[145px]'
            title='Remaining Income (Total Income - Total Expenses)'
            titleSize='sm'
            content={
              <View>
                <Text className='text-2xl font-semibold text-[#1f2933]'>{formatCurrency(remainingIncome)}</Text>
                <Text className='mt-1 text-sm text-[#16a34a]'>Under budget</Text>
              </View>
            }
          />
          <Card
            className='basis-[48%] min-w-[145px]'
            title='Total Goals'
            titleSize='sm'
            content={
              <View>
                <Text className='text-base font-semibold text-[#1f2933]'>
                  Savings: {formatCurrency(totalSavingsGoals)}
                </Text>
                <Text className='mt-1 text-base font-semibold text-[#1f2933]'>
                  Debt: {formatCurrency(totalDebtGoals)}
                </Text>
                <Text className='mt-2 text-sm text-[#6b7280]'>{savingsGoalCount} savings goals</Text>
                <Text className='text-sm text-[#6b7280]'>{debtGoalCount} debt goals</Text>
              </View>
            }
          />
        </View>
        <Card
          className='mt-6'
          title='Spending by Category'
          titleSize='sm'
          content={
            <View className='items-center'>
              <PieChart
                data={pieData}
                donut
                radius={90}
                innerRadius={55}
                innerCircleColor='white'
              />
              <View className='mt-5 w-full flex-row flex-wrap'>
                {spendingByCategory.map((item) => (
                  <View key={item.label} className='mb-2 w-1/2 flex-row items-center pr-2'>
                    <View className='mr-2 h-3 w-3 rounded-full' style={{ backgroundColor: item.color }} />
                    <Text className='text-sm text-[#4a5565]'>
                      {item.label}: {formatCurrency(item.value)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          }
        />
        <Card
          className='mt-6'
          title='Budget Limits By Category'
          titleSize='sm'
          content={
            <View>
              {budgetLimitsByCategory.map((item) => {
                const percent = Math.min((item.spent / item.total) * 100, 100);

                return (
                  <View key={item.category} className='mb-4'>
                    <Text className='text-base font-semibold text-[#1f2933]'>{item.category}</Text>
                    <Text className='mt-1 text-sm text-[#4a5565]'>
                      {formatCurrency(item.spent)} / {formatCurrency(item.total)}
                    </Text>
                    <View className='mt-2 flex-row items-center'>
                      <View className='mr-3 h-2 flex-1 overflow-hidden rounded-full bg-[#e5e7eb]'>
                        <View
                          className='h-full rounded-full'
                          style={{
                            width: `${percent}%`,
                            backgroundColor: getProgressColor(percent)
                          }}
                        />
                      </View>
                      <Text className='w-12 text-right text-xs text-[#4a5565]'>{percent.toFixed(0)}%</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          }
        />
      </View>
    </ScrollView>
  );
};

export default Dashboard;
