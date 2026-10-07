import React from 'react';
import { Text, View } from 'react-native';
import { useThemeColors } from '@/theme/colors';

type TitleSize = 'sm' | 'md' | 'lg';

type CardProps = {
  content: React.ReactNode;
  title?: string;
  titleSize?: TitleSize;
  className?: string;
};

const titleSizeClass: Record<TitleSize, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg'
};

export const Card = ({ content, title, titleSize = 'md', className }: CardProps) => {
  const colors = useThemeColors();

  return (
    <View
      className={`${styles.card} ${className ?? ''}`.trim()}
      style={{
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 5
      }}
    >
      {title ? (
        <Text className={`${styles.title} ${titleSizeClass[titleSize]}`.trim()}>
          {title}
        </Text>
      ) : null}
      {content}
    </View>
  );
};

const styles = {
  card: 'rounded-xl bg-white p-4 shadow-md dark:bg-app-dark-surface',
  title: 'mb-2 font-semibold text-app-light-text dark:text-app-dark-text'
};
