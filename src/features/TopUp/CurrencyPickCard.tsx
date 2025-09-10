import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

interface CurrencyPickCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export const CurrencyPickCard: React.FC<CurrencyPickCardProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="mb-2.5 h-[68px] flex-row items-center rounded-[16px] bg-[#0F0F0F] px-4">
      <View className="mr-4 items-center justify-center rounded-xl ">{icon}</View>
      <View className="flex-1">
        <Text className="mb-1 text-[17px] font-medium text-white">{title}</Text>
        <Text className="text-[15px] text-[#AAAAAA]">{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};
