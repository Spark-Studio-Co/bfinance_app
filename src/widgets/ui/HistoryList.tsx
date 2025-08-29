import React from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { TransactionGroup } from '~/entities/transaction/ui/TransactionGroup';
import { useTransactionHistory } from '~/entities/transaction/model/hooks';

export const TransactionHistoryList: React.FC = () => {
  const { transactions, loading, handleTransactionPress } = useTransactionHistory();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-black"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-8">
      {transactions.map((group, index) => (
        <TransactionGroup
          key={`${group.date}-${index}`}
          group={group}
          onTransactionPress={handleTransactionPress}
        />
      ))}
    </ScrollView>
  );
};
