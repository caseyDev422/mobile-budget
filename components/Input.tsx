import React, { forwardRef } from 'react';
import {
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  type TouchableOpacityProps,
  View
} from 'react-native';
import { Label } from '@/components/Label';

type IconPressableProps = Omit<TouchableOpacityProps, 'children' | 'className'>;

type InputProps = {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIconPressableProps?: IconPressableProps;
  rightIconPressableProps?: IconPressableProps;
} & TextInputProps;

export const Input = forwardRef<React.ComponentRef<typeof TextInput>, InputProps>(
  (
    {
      label,
      containerClassName,
      labelClassName,
      leftIcon,
      rightIcon,
      leftIconPressableProps,
      rightIconPressableProps,
      className,
      placeholderTextColor = '#8c97a1',
      ...textInputProps
    },
    ref
  ) => {
    const leftPadding = leftIcon ? 'pl-12' : '';
    const rightPadding = rightIcon ? 'pr-12' : '';

    const renderIcon = (
      icon: React.ReactNode | undefined,
      positionClassName: string,
      pressableProps?: IconPressableProps
    ) => {
      if (!icon) return null;

      if (pressableProps) {
        return (
          <TouchableOpacity
            {...pressableProps}
            className={positionClassName}
            activeOpacity={pressableProps.activeOpacity ?? 0.7}
          >
            {icon}
          </TouchableOpacity>
        );
      }

      return <View className={positionClassName}>{icon}</View>;
    };

    return (
      <View className={`${styles.container} ${containerClassName ?? ''}`.trim()}>
        <Label className={labelClassName}>{label}</Label>
        <View className={styles.inputWrapper}>
          {renderIcon(leftIcon, styles.leftIcon, leftIconPressableProps)}
          <TextInput
            ref={ref}
            {...textInputProps}
            placeholderTextColor={placeholderTextColor}
            className={`${styles.input} ${leftPadding} ${rightPadding} ${className ?? ''}`.trim()}
          />
          {renderIcon(rightIcon, styles.rightIcon, rightIconPressableProps)}
        </View>
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = {
  container: '',
  inputWrapper: 'relative',
  input:
    'h-12 rounded-md border border-[#d3d9df] bg-white px-4 text-base text-[#1f2933]',
  leftIcon:
    'absolute left-0 top-0 h-12 w-12 items-center justify-center',
  rightIcon:
    'absolute right-0 top-0 h-12 w-12 items-center justify-center',
};
