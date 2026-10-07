import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EasyIcon from 'react-native-easy-icon';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useThemeColors } from '@/theme/colors';

type Scenario = {
  id: string;
  title: string;
};

const suggestedScenarios: Scenario[] = [
  { id: 's1', title: 'What if I paid 20% more toward my debt?' },
  { id: 's2', title: 'What if I increased my savings by $300/month?' },
  { id: 's3', title: 'What if I reduced dining expenses by 25%?' },
  { id: 's4', title: 'What if I cut subscription costs by $40/month?' },
  { id: 's5', title: 'What if I increased income by $500/month?' }
];

const activatedScenarios: Scenario[] = [];

const WhatIf = () => {
  const colors = useThemeColors();

  return (
    <ScrollView className='flex-1 bg-app-light-bg dark:bg-app-dark-bg'>
      <View className='px-6 pt-6 pb-8'>
        <Text className='text-xl font-semibold text-app-light-text dark:text-app-dark-text'>Suggested Scenarios</Text>

        <View className='mt-3 gap-3'>
          {suggestedScenarios.map((scenario) => (
            <Card
              key={scenario.id}
              content={
                <View>
                  <Text className='text-base font-semibold text-app-light-text dark:text-app-dark-text'>{scenario.title}</Text>
                  <Button
                    className='mt-3 h-10 rounded-md px-3 py-2'
                    title='Create Scenario'
                    accessibilityRole='button'
                    accessibilityLabel={`Create ${scenario.title}`}
                  />
                </View>
              }
            />
          ))}
        </View>

        <Card
          className='mt-6'
          title='Activated Scenarios'
          titleSize='sm'
          content={
            activatedScenarios.length === 0 ? (
              <View className='items-center justify-center py-8'>
                <EasyIcon type='feather' name='alert-circle' size={26} color={colors.textMuted} />
                <Text className='mt-3 text-base font-semibold text-app-light-text dark:text-app-dark-text'>No Scenarios Yet</Text>
                <Text className='mt-1 text-center text-sm text-app-light-muted dark:text-app-dark-muted'>
                  Create a scenario above to explore &quot;what-if&quot; scenarios.
                </Text>
              </View>
            ) : (
              <View className='gap-3'>
                {activatedScenarios.map((scenario) => (
                  <View
                    key={scenario.id}
                    className='rounded-lg border border-app-light-border bg-white p-3 dark:border-app-dark-border dark:bg-app-dark-surface-alt'
                  >
                    <Text className='text-sm font-semibold text-app-light-text dark:text-app-dark-text'>{scenario.title}</Text>
                    <View className='mt-3 flex-row items-center justify-between'>
                      <Button
                        className='h-10 rounded-md px-4 py-2'
                        title='Activate'
                        accessibilityRole='button'
                        accessibilityLabel={`Activate ${scenario.title}`}
                      />
                      <TouchableOpacity
                        accessibilityRole='button'
                        accessibilityLabel={`Delete ${scenario.title}`}
                      >
                        <EasyIcon type='feather' name='trash-2' size={18} color={colors.critical} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )
          }
        />

        <Card
          className='mt-6'
          title='How Scenarios Work'
          titleSize='sm'
          content={
            <View>
              <Text className='text-sm text-app-light-text dark:text-app-dark-text'>
                {'\u2022'} Create scenarios from suggested templates
              </Text>
              <Text className='mt-2 text-sm text-app-light-text dark:text-app-dark-text'>
                {'\u2022'} Activate one or more to see simulated financial impact
              </Text>
              <Text className='mt-2 text-sm text-app-light-text dark:text-app-dark-text'>
                {'\u2022'} All changes are temporary and simulated
              </Text>
              <Text className='mt-2 text-sm text-app-light-text dark:text-app-dark-text'>
                {'\u2022'} Switch or deactivate to return to real data
              </Text>
            </View>
          }
        />
      </View>
    </ScrollView>
  );
};

export default WhatIf;
