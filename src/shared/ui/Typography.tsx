import React from 'react';
import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  className = '',
  children,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'heading':
        return 'text-2xl font-bold text-white';
      case 'subheading':
        return 'text-lg font-semibold text-white';
      case 'body':
        return 'text-base text-white';
      case 'caption':
        return 'text-sm text-gray-400';
      default:
        return 'text-base text-white';
    }
  };

  return (
    <Text className={`${getVariantClass()} ${className}`} {...props}>
      {children}
    </Text>
  );
};
