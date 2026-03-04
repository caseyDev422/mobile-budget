import { Link, Stack } from 'expo-router';

import { Text, View } from 'react-native';

import { Container } from '@/components/Container';

export default function NotFoundScreen() {
  return (
    <View className={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Text className={styles.title}>{"This screen doesn't exist."}</Text>
        <Link href="/" className={styles.link}>
          <Text className={styles.linkText}>Back to Dashboard</Text>
        </Link>
      </Container>
    </View>
  );
}

const styles = {
  container: `flex flex-1 bg-app-light-bg dark:bg-app-dark-bg`,
  title: `text-xl font-bold text-app-light-text dark:text-app-dark-text`,
  link: `mt-4 pt-4`,
  linkText: `text-base text-app-light-primary dark:text-app-dark-primary`,
};
