import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EasyIcon from 'react-native-easy-icon';
import { Card } from '@/components/Card';

type Transaction = {
  id: string;
  title: string;
  category: string;
  date: Date;
  amount: number;
};

const transactionData: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Run',
    category: 'Groceries',
    date: new Date('2026-02-14'),
    amount: 86.25
  },
  {
    id: '2',
    title: 'Gas Station',
    category: 'Transportation',
    date: new Date('2026-02-13'),
    amount: 42.1
  },
  {
    id: '3',
    title: 'Streaming Subscription',
    category: 'Entertainment',
    date: new Date('2026-02-11'),
    amount: 14.99
  },
  {
    id: '4',
    title: 'Dinner Out',
    category: 'Dining',
    date: new Date('2026-02-10'),
    amount: 57.4
  }
];

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

const Transactions = () => {
  const totalSpent = transactionData.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <ScrollView className='flex-1 bg-[#f5f7fb]'>
      <View className='px-6 pt-6 pb-8'>
        <View className='flex-row gap-3'>
          <Card
            className='flex-1'
            title='Total Spent'
            titleSize='sm'
            content={
              <Text className='text-2xl font-semibold text-[#1f2933]'>
                {formatCurrency(totalSpent)}
              </Text>
            }
          />
          <Card
            className='flex-1'
            title='Total Transactions'
            titleSize='sm'
            content={
              <Text className='text-2xl font-semibold text-[#1f2933]'>{transactionData.length}</Text>
            }
          />
        </View>

        <Text className='mt-6 text-xl font-semibold text-[#1f2933]'>Transactions</Text>

        <View className='mt-3 gap-3'>
          {transactionData.map((transaction) => (
            <View key={transaction.id} className='flex-row items-center rounded-xl bg-white p-4'>
              <View className='flex-1 pr-3'>
                <Text className='text-base font-semibold text-[#1f2933]'>{transaction.title}</Text>
                <Text className='mt-1 text-sm text-[#6b7280]'>
                  {transaction.category} • {formatDate(transaction.date)}
                </Text>
              </View>

              <View className='items-end'>
                <Text className='text-base font-semibold text-[#1f2933]'>
                  {formatCurrency(transaction.amount)}
                </Text>
                <View className='mt-2 flex-row items-center'>
                  <TouchableOpacity
                    className='mr-3'
                    accessibilityRole='button'
                    accessibilityLabel={`Edit ${transaction.title}`}
                  >
                    <EasyIcon type='feather' name='edit-2' size={16} color='#4a5565' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    accessibilityRole='button'
                    accessibilityLabel={`Delete ${transaction.title}`}
                  >
                    <EasyIcon type='feather' name='trash-2' size={16} color='#dc2626' />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Transactions;
