import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import EasyIcon from 'react-native-easy-icon';
import { useThemeColors } from '@/theme/colors';

type Goal = {
  id: string;
  title: string;
  dueDate: Date;
  currentAmount: number;
  goalAmount: number;
};

const savingsGoals: Goal[] = [
  {
    id: 's1',
    title: 'Emergency Fund',
    dueDate: new Date('2026-10-01'),
    currentAmount: 3200,
    goalAmount: 5000
  },
  {
    id: 's2',
    title: 'Vacation Fund',
    dueDate: new Date('2026-07-15'),
    currentAmount: 950,
    goalAmount: 2200
  },
  {
    id: 's3',
    title: 'New Laptop',
    dueDate: new Date('2026-05-30'),
    currentAmount: 540,
    goalAmount: 1600
  }
];

const debtGoals: Goal[] = [
  {
    id: 'd1',
    title: 'Credit Card A',
    dueDate: new Date('2026-09-10'),
    currentAmount: 1450,
    goalAmount: 3200
  },
  {
    id: 'd2',
    title: 'Car Loan',
    dueDate: new Date('2027-02-01'),
    currentAmount: 6100,
    goalAmount: 12000
  },
  {
    id: 'd3',
    title: 'Student Loan',
    dueDate: new Date('2027-11-20'),
    currentAmount: 4200,
    goalAmount: 9800
  }
];

const formatCurrency = (amount: number) =>
  `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

const getPercentComplete = (goal: Goal) => {
  if (goal.goalAmount === 0) return 0;
  return Math.min((goal.currentAmount / goal.goalAmount) * 100, 100);
};

const getAmountLeft = (goal: Goal) => Math.max(goal.goalAmount - goal.currentAmount, 0);

const GoalCard = ({ goal }: { goal: Goal }) => {
  const colors = useThemeColors();
  const percentComplete = getPercentComplete(goal);
  const amountLeft = getAmountLeft(goal);

  const getProgressColor = (percent: number) => {
    if (percent >= 85) return colors.success;
    if (percent >= 60) return colors.secondary;
    return colors.warning;
  };

  return (
    <Card
      content={
        <View>
          <View className='flex-row items-start justify-between gap-2'>
            <View className='flex-1 pr-3'>
              <Text className='text-base font-semibold text-app-light-text dark:text-app-dark-text'>{goal.title}</Text>
              <Text className='mt-1 text-xs text-app-light-muted dark:text-app-dark-muted'>Due {formatDate(goal.dueDate)}</Text>
            </View>

            <View className='mt-1 flex-row items-center'>
              <TouchableOpacity
                className='mr-3'
                accessibilityRole='button'
                accessibilityLabel={`Edit ${goal.title}`}
              >
                <EasyIcon type='feather' name='edit-2' size={16} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole='button'
                accessibilityLabel={`Delete ${goal.title}`}
              >
                <EasyIcon type='feather' name='trash-2' size={16} color={colors.critical} />
              </TouchableOpacity>
            </View>
          </View>

          <Text className='mt-3 text-sm text-app-light-text dark:text-app-dark-text'>Current Amount: {formatCurrency(goal.currentAmount)}</Text>
          <Text className='mt-1 text-sm text-app-light-text dark:text-app-dark-text'>Goal Amount: {formatCurrency(goal.goalAmount)}</Text>

          <Text className='mt-3 text-sm font-medium text-app-light-text dark:text-app-dark-text'>
            {formatCurrency(amountLeft)} left to reach goal
          </Text>

          <View className='mt-2 h-2 w-full overflow-hidden rounded-full bg-app-light-border dark:bg-app-dark-border'>
            <View
              className='h-full rounded-full'
              style={{
                width: `${percentComplete}%`,
                backgroundColor: getProgressColor(percentComplete)
              }}
            />
          </View>

          <Text className='mt-2 text-xs text-app-light-text dark:text-app-dark-text'>{percentComplete.toFixed(0)}% complete</Text>
        </View>
      }
    />
  );
};

const Goals = () => {
  const totalSavingsGoalsAmount = savingsGoals.reduce((sum, goal) => sum + goal.goalAmount, 0);
  const totalDebtGoalsAmount = debtGoals.reduce((sum, goal) => sum + goal.goalAmount, 0);

  return (
    <ScrollView className='flex-1 bg-app-light-bg dark:bg-app-dark-bg'>
      <View className='px-6 pt-6 pb-8'>
        <Button className='w-full rounded-md px-4 py-2' title='+ Add Goal' />

        <View className='mt-4 flex-row gap-3'>
          <Card
            className='flex-1'
            title='Savings Goals Amount'
            titleSize='sm'
            content={
              <View>
                <Text className='text-2xl font-semibold text-app-light-text dark:text-app-dark-text'>
                  {formatCurrency(totalSavingsGoalsAmount)}
                </Text>
                <Text className='mt-1 text-sm text-app-light-muted dark:text-app-dark-muted'>{savingsGoals.length} goals</Text>
              </View>
            }
          />
          <Card
            className='flex-1'
            title='Debt Goals Amount'
            titleSize='sm'
            content={
              <View>
                <Text className='text-2xl font-semibold text-app-light-text dark:text-app-dark-text'>
                  {formatCurrency(totalDebtGoalsAmount)}
                </Text>
                <Text className='mt-1 text-sm text-app-light-muted dark:text-app-dark-muted'>{debtGoals.length} goals</Text>
              </View>
            }
          />
        </View>

        <Text className='mt-6 text-xl font-semibold text-app-light-text dark:text-app-dark-text'>Savings Goals</Text>
        <View className='mt-3 gap-3'>
          {savingsGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </View>

        <Text className='mt-6 text-xl font-semibold text-app-light-text dark:text-app-dark-text'>Debt Goals</Text>
        <View className='mt-3 gap-3'>
          {debtGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Goals;
