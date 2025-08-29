import React from 'react';
import { View, Text } from 'react-native';

interface TransactionIconProps {
  merchant: string;
  size?: 'small' | 'large';
}

export const TransactionIcon: React.FC<TransactionIconProps> = ({ merchant, size = 'small' }) => {
  const getIcon = () => {
    if (merchant.includes('APPLE')) return '🍎';
    if (merchant.includes('ALIEXPRESS')) return '🛒';
    return '💳';
  };

  const getBackgroundColor = () => {
    if (merchant.includes('APPLE')) return 'bg-white';
    if (merchant.includes('ALIEXPRESS')) return 'bg-red-600';
    return 'bg-gray-600';
  };

  const sizeClasses = size === 'large' ? 'w-16 h-16' : 'w-10 h-10';
  const textSize = size === 'large' ? 'text-2xl' : 'text-lg';

  return (
    <View
      className={`${sizeClasses} ${getBackgroundColor()} items-center justify-center rounded-full`}>
      <Text
        className={`${textSize} ${getBackgroundColor() === 'bg-white' ? 'text-black' : 'text-white'}`}>
        {getIcon()}
      </Text>
    </View>
  );
};
