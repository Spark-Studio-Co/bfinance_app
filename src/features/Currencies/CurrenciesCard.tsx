import React from 'react';
import { View, Text } from 'react-native';
import DownLeftArrow from '~/shared/icons/CurrenciesIcons/DownLeftArrow';
import TopRightGrayArrow from '~/shared/icons/CurrenciesIcons/TopRightGrayArrow';

interface Operation {
  id: string;
  title: string;
  time: string;
  amount: number;
  currency: string;
  direction: 'in' | 'out';
}

export const CurrencyOperationCard: React.FC<{ op: Operation }> = ({ op }) => {
  const isPositive = op.amount > 0;
  const amountColor = isPositive ? '#00E675' : '#D52525';
  const formatted = `${isPositive ? '+' : '-'}${Math.abs(op.amount)} ${op.currency}`;

  return (
    <View className="mb-2.5 h-[68px] flex-row items-center rounded-[16px] bg-[#0F0F0F] px-4">
      <View className="mr-4 items-center justify-center rounded-xl ">
        {op.direction === 'in' ? <DownLeftArrow /> : <TopRightGrayArrow />}
      </View>
      <View className="flex-1">
        <Text className="mb-1 text-[17px] font-medium text-white">{op.title}</Text>
        <Text className="text-[15px] text-[#AAAAAA]">{op.time}</Text>
      </View>
      <Text className="text-[17px] font-medium" style={{ color: amountColor }}>
        {formatted}
      </Text>
    </View>
  );
};
