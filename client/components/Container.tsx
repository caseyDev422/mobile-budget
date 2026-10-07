import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export const Container = ({ children, className, style }: ContainerProps) => {
  return (
    <SafeAreaView className={`${styles.container} ${className ?? ''}`.trim()} style={style}>
      {children}
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex bg-card bg-white rounded-2xl',
};
