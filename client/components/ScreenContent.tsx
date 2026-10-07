import React from 'react';
import { Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
const styles = {
  container: `flex-1 items-center justify-center bg-app-light-bg dark:bg-app-dark-bg`,
  separator: `my-7 h-[1px] w-4/5 bg-app-light-border dark:bg-app-dark-border`,
  title: `text-xl font-bold text-app-light-text dark:text-app-dark-text`,
};
