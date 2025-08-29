import React from 'react';
import { Text, View } from 'react-native';
import { TransactionCard } from './TransactionCard';
import { TransactionGroup as TransactionGroupType, Transaction } from '../model/types';

interface TransactionGroupProps {
  group: TransactionGroupType;
  onTransactionPress?: (transaction: Transaction) => void;
}

export const TransactionGroup: React.FC<TransactionGroupProps> = ({
  group,
  onTransactionPress,
}) => {
  return (
    <View className="mb-6">
      <Text className="mb-4 px-4 uppercase tracking-wider text-[#AAAAAA]">{group.date}</Text>
      {group.transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onPress={onTransactionPress}
        />
      ))}
    </View>
  );
};
