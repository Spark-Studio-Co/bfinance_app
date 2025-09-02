import React from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { TransactionGroup } from '~/entities/transaction/ui/TransactionGroup';
import { useTransactionHistory } from '~/entities/transaction/model/hooks';

interface TransactionHistoryListProps {
  onTransactionPress: (transactionId: string) => void;
}

export const TransactionHistoryList: React.FC<TransactionHistoryListProps> = ({
  onTransactionPress,
}) => {
  const { transactions, loading } = useTransactionHistory();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ScrollView className="mt-[24px] flex-1 bg-black" showsVerticalScrollIndicator={false}>
      {transactions.map((group, index) => (
        <TransactionGroup
          key={`${group.date}-${index}`}
          group={group}
          onTransactionPress={onTransactionPress}
        />
      ))}
    </ScrollView>
  );
};
