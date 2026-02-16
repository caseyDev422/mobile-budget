import React from 'react';
import { Text, View } from 'react-native';

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
  return (
    <View className={`${styles.card} ${className ?? ''}`.trim()}>
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
  card: 'rounded-xl bg-white p-4',
  title: 'font-semibold text-[#1f2933] mb-2'
};
