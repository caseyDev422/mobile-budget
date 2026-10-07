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
    'flex-row items-center justify-center bg-indigo-500 rounded-[28px] shadow-md p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
  iconLeft: 'mr-2',
  iconRight: 'ml-2',
};
