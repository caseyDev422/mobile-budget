import type { ReactNode } from 'react';
import { Text, type TextProps } from 'react-native';

type LabelProps = {
  children: ReactNode;
  className?: string;
} & TextProps;

export const Label = ({ children, className, ...textProps }: LabelProps) => {
  return (
    <Text
      {...textProps}
      className={`${styles.label} ${className ?? ''}`.trim()}
    >
      {children}
    </Text>
  );
};

const styles = {
  label: 'mb-2 text-sm font-medium text-[#4b5968]',
};
