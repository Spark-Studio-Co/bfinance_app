import React from 'react';
import { Text, View } from 'react-native';
import { TransactionCard } from './TransactionCard';
import { TransactionGroup as TransactionGroupType } from '../model/types';

interface TransactionGroupProps {
  group: TransactionGroupType;
  onTransactionPress?: (transactionId: string) => void;
}

export const TransactionGroup: React.FC<TransactionGroupProps> = ({
  group,
  onTransactionPress,
}) => {
  return (
    <View className="mb-[24px]">
      <Text className="mb-[8px] text-[13px] uppercase tracking-wider text-[#AAAAAA]">
        {group.date}
      </Text>
      {group.transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onPress={() => onTransactionPress?.(transaction.id)}
        />
      ))}
    </View>
  );
};
