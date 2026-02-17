import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EasyIcon from 'react-native-easy-icon';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

type Category = {
  id: string;
  title: string;
  budgetPercent: number;
  spent: number;
  total: number;
  iconType: string;
  iconName: string;
  iconColor: string;
};

const categories: Category[] = [
  {
    id: '1',
    title: 'Groceries',
    budgetPercent: 20,
    spent: 150.33,
    total: 500,
    iconType: 'material-community',
    iconName: 'cart-outline',
    iconColor: '#2563eb'
  },
  {
    id: '2',
    title: 'Transportation',
    budgetPercent: 12,
    spent: 96.7,
    total: 300,
    iconType: 'material-community',
    iconName: 'car-outline',
    iconColor: '#0891b2'
  },
  {
    id: '3',
    title: 'Utilities',
    budgetPercent: 15,
    spent: 232.84,
    total: 350,
    iconType: 'material-community',
    iconName: 'lightning-bolt-outline',
    iconColor: '#16a34a'
  },
  {
    id: '4',
    title: 'Dining',
    budgetPercent: 10,
    spent: 142.55,
    total: 220,
    iconType: 'material-community',
    iconName: 'silverware-fork-knife',
    iconColor: '#ea580c'
  },
  {
    id: '5',
    title: 'Entertainment',
    budgetPercent: 8,
    spent: 58.9,
    total: 180,
    iconType: 'material-community',
    iconName: 'movie-outline',
    iconColor: '#db2777'
  }
];

const formatCurrency = (amount: number) =>
  `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const getProgressColor = (percent: number) => {
  if (percent >= 90) return '#dc2626';
  if (percent >= 75) return '#f59e0b';
  return '#16a34a';
};

const getPercentageTextColor = (percent: number) => {
  if (percent >= 75) return '#dc2626';
  if (percent >= 50) return '#f59e0b';
  return '#16a34a';
};

const Categories = () => {
  return (
    <ScrollView className='flex-1 bg-[#f5f7fb]'>
      <View className='px-6 pt-6 pb-8'>
        <Button className='w-full rounded-md px-4 py-2' title='+ Add Category' />

        <View className='mt-4 gap-3'>
          {categories.map((category) => {
            const progressPercent = Math.min((category.spent / category.total) * 100, 100);

            return (
              <Card
                key={category.id}
                content={
                  <View>
                    <View className='flex-row'>
                      <View className='mr-3 w-14 items-center'>
                        <View className='h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff]'>
                          <EasyIcon
                            type={category.iconType}
                            name={category.iconName}
                            size={20}
                            color={category.iconColor}
                          />
                        </View>
                        <Text
                          className='mt-3 text-base font-semibold'
                          style={{ color: getPercentageTextColor(progressPercent) }}
                        >
                          {progressPercent.toFixed(0)}%
                        </Text>
                      </View>

                      <View className='flex-1'>
                        <View className='flex-row items-start'>
                          <Text className='flex-1 pr-3 text-base font-semibold text-[#1f2933]'>
                            {category.title}
                          </Text>
                          <View className='mt-1 flex-row items-center'>
                            <TouchableOpacity
                              className='mr-3'
                              accessibilityRole='button'
                              accessibilityLabel={`Edit ${category.title}`}
                            >
                              <EasyIcon type='feather' name='edit-2' size={16} color='#4a5565' />
                            </TouchableOpacity>
                            <TouchableOpacity
                              accessibilityRole='button'
                              accessibilityLabel={`Delete ${category.title}`}
                            >
                              <EasyIcon type='feather' name='trash-2' size={16} color='#dc2626' />
                            </TouchableOpacity>
                          </View>
                        </View>

                        <Text className='mt-3 text-sm text-[#4a5565]'>
                          {formatCurrency(category.spent)} / {formatCurrency(category.total)}
                        </Text>

                        <View className='mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e5e7eb]'>
                          <View
                            className='h-full rounded-full'
                            style={{
                              width: `${progressPercent}%`,
                              backgroundColor: getProgressColor(progressPercent)
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                }
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Categories;
