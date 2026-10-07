import type { ComponentProps } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EasyIcon from 'react-native-easy-icon';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useThemeColors } from '@/theme/colors';

type Category = {
  id: string;
  title: string;
  budgetPercent: number;
  spent: number;
  total: number;
  iconType: ComponentProps<typeof EasyIcon>['type'];
  iconName: string;
};

const categories: Category[] = [
  {
    id: '1',
    title: 'Groceries',
    budgetPercent: 20,
    spent: 150.33,
    total: 500,
    iconType: 'material-community',
    iconName: 'cart-outline'
  },
  {
    id: '2',
    title: 'Transportation',
    budgetPercent: 12,
    spent: 96.7,
    total: 300,
    iconType: 'material-community',
    iconName: 'car-outline'
  },
  {
    id: '3',
    title: 'Utilities',
    budgetPercent: 15,
    spent: 232.84,
    total: 350,
    iconType: 'material-community',
    iconName: 'lightning-bolt-outline'
  },
  {
    id: '4',
    title: 'Dining',
    budgetPercent: 10,
    spent: 142.55,
    total: 220,
    iconType: 'material-community',
    iconName: 'silverware-fork-knife'
  },
  {
    id: '5',
    title: 'Entertainment',
    budgetPercent: 8,
    spent: 58.9,
    total: 180,
    iconType: 'material-community',
    iconName: 'movie-outline'
  }
];

const formatCurrency = (amount: number) =>
  `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const Categories = () => {
  const colors = useThemeColors();
  const categoryIconColors = [
    colors.primary,
    colors.secondary,
    colors.success,
    colors.warning,
    colors.critical
  ];

  const getProgressColor = (percent: number) => {
    if (percent >= 90) return colors.critical;
    if (percent >= 75) return colors.warning;
    return colors.success;
  };

  const getPercentageTextColor = (percent: number) => {
    if (percent >= 75) return colors.critical;
    if (percent >= 50) return colors.warning;
    return colors.success;
  };

  return (
    <ScrollView className='flex-1 bg-app-light-bg dark:bg-app-dark-bg'>
      <View className='px-6 pt-6 pb-8'>
        <Button className='w-full rounded-md px-4 py-2' title='+ Add Category' />

        <View className='mt-4 gap-3'>
          {categories.map((category, index) => {
            const progressPercent = Math.min((category.spent / category.total) * 100, 100);

            return (
              <Card
                key={category.id}
                content={
                  <View>
                    <View className='flex-row'>
                      <View className='mr-3 w-14 items-center'>
                        <View className='h-10 w-10 items-center justify-center rounded-full bg-app-light-surface dark:bg-app-dark-surface-alt'>
                          <EasyIcon
                            type={category.iconType}
                            name={category.iconName}
                            size={20}
                            color={categoryIconColors[index % categoryIconColors.length]}
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
                          <Text className='flex-1 pr-3 text-base font-semibold text-app-light-text dark:text-app-dark-text'>
                            {category.title}
                          </Text>
                          <View className='mt-1 flex-row items-center'>
                            <TouchableOpacity
                              className='mr-3'
                              accessibilityRole='button'
                              accessibilityLabel={`Edit ${category.title}`}
                            >
                              <EasyIcon type='feather' name='edit-2' size={16} color={colors.text} />
                            </TouchableOpacity>
                            <TouchableOpacity
                              accessibilityRole='button'
                              accessibilityLabel={`Delete ${category.title}`}
                            >
                              <EasyIcon type='feather' name='trash-2' size={16} color={colors.critical} />
                            </TouchableOpacity>
                          </View>
                        </View>

                        <Text className='mt-3 text-sm text-app-light-text dark:text-app-dark-text'>
                          {formatCurrency(category.spent)} / {formatCurrency(category.total)}
                        </Text>

                        <View className='mt-2 h-2 w-full overflow-hidden rounded-full bg-app-light-border dark:bg-app-dark-border'>
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
