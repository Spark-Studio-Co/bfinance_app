import React from 'react';
import { View, Text } from 'react-native';

interface DetailRowProps {
  label: string;
  value: string;
  variant?: 'normal' | 'error';
}

export const DetailRow: React.FC<DetailRowProps> = ({ label, value, variant = 'normal' }) => {
  if (variant === 'error') {
    // Специальный layout для decline reason
    return (
      <View className="rounded-[16px] bg-[#0F0F0F] px-6 py-6">
        <Text className="mb-1 text-[17px] font-medium text-white">{label}</Text>
        <Text className="text-[15px] text-[#666666]">{value}</Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center justify-between rounded-[16px] bg-[#0F0F0F] px-6 py-6">
      <Text className="text-[16px] font-medium text-white">{label}</Text>
      <Text className="text-[14px] text-[#666666]">{value}</Text>
    </View>
  );
};
