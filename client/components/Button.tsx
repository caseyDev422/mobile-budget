import React, { forwardRef } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

type ButtonProps = {
  title: string;
  icon?: React.ReactNode;
  iconSide?: 'left' | 'right';
} & TouchableOpacityProps;

export const Button = forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  ButtonProps
>(
  ({ title, icon, iconSide = 'left', className, ...touchableProps }, ref) => {
    const shouldShowLeftIcon = !!icon && iconSide === 'left';
    const shouldShowRightIcon = !!icon && iconSide === 'right';

    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`${styles.button} ${className ?? ''}`}
      >
        {shouldShowLeftIcon && (
          <View className={styles.iconLeft}>{icon}</View>
        )}

        <Text className={styles.buttonText}>{title}</Text>

        {shouldShowRightIcon && (
          <View className={styles.iconRight}>{icon}</View>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

const styles = {
  button:
    'flex-row items-center justify-center rounded-[28px] bg-app-light-primary p-4 shadow-md dark:bg-app-dark-primary',
  buttonText: 'text-center text-lg font-semibold text-app-light-bg dark:text-app-dark-text',
  iconLeft: 'mr-2',
  iconRight: 'ml-2',
};
