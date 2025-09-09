import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Text } from './Text';
import { useResponsive } from '../hooks/useResponsive';

export interface CryptoCardProps {
  icon: any;
  name: string;
  symbol: string;
  selected?: boolean;
  onPress?: () => void;
  className?: string;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({
  icon,
  name,
  symbol,
  onPress,
  className = '',
}) => {
  const { s } = useResponsive();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-row items-center justify-between rounded-[16px] bg-[#0F0F0F] px-4 py-[14px]  ${className}`}
      style={{
        marginBottom: s(8),
      }}>
      <View className="flex-row items-center gap-x-4">
        {icon}
        <View>
          <Text className="text-[17px] font-medium text-white">{name}</Text>
          <Text className="text-[13px] font-normal text-[#AAAAAA]">{symbol}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
