import React from 'react';
import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  className = '',
  children,
  style,
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'heading':
        return { fontSize: 24, fontWeight: 'bold' as const };
      case 'subheading':
        return { fontSize: 18, fontWeight: '600' as const };
      case 'body':
        return { fontSize: 16, fontWeight: 'normal' as const };
      case 'caption':
        return { fontSize: 14, fontWeight: 'normal' as const };
      default:
        return { fontSize: 16, fontWeight: 'normal' as const };
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'heading':
        return 'text-white';
      case 'subheading':
        return 'text-white';
      case 'body':
        return 'text-white';
      case 'caption':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  const combinedStyle = Object.assign({}, getVariantStyle(), style);

  return (
    <Text className={`${getVariantClass()} ${className}`} style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};
