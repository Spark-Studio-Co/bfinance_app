import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-white rounded-full py-4 px-6';
      case 'secondary':
        return 'bg-gray-800 rounded-full py-4 px-6 border border-gray-700';
      default:
        return 'bg-white rounded-full py-4 px-6';
    }
  };

  const getTextClasses = () => {
    switch (variant) {
      case 'primary':
        return 'text-black font-semibold text-center';
      case 'secondary':
        return 'text-white font-semibold text-center';
      default:
        return 'text-black font-semibold text-center';
    }
  };

  return (
    <TouchableOpacity className={`${getVariantClasses()} ${className}`} {...props}>
      <Text className={getTextClasses()}>{title}</Text>
    </TouchableOpacity>
  );
};
