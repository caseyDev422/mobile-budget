import { ScrollView, Text, View } from 'react-native';

import { Card } from '@/components/Card';

const Transactions = () => (
  <ScrollView className='flex-1 bg-app-light-bg dark:bg-app-dark-bg'>
    <View className='px-6 pt-6 pb-8'>
      <View className='flex-row gap-3'>
        <Card
          className='flex-1'
          title='Net Total'
          titleSize='sm'
          content={
            <Text className='text-2xl font-semibold text-app-light-text dark:text-app-dark-text'>
              $0.00
            </Text>
          }
        />
        <Card
          className='flex-1'
          title='Total Transactions'
          titleSize='sm'
          content={
            <Text className='text-2xl font-semibold text-app-light-text dark:text-app-dark-text'>
              0
            </Text>
          }
        />
      </View>

      <Text className='mt-6 text-xl font-semibold text-app-light-text dark:text-app-dark-text'>
        Transactions
      </Text>
      <Text className='mt-3 text-base text-app-light-muted dark:text-app-dark-muted'>
        No transactions yet.
      </Text>
    </View>
  </ScrollView>
);

export default Transactions;
