import React from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { TransactionGroup } from '~/entities/transaction/ui/TransactionGroup';
import { useTransactionHistory } from '~/entities/transaction/model/hooks';
import { LoadingState, ErrorState } from '~/shared/ui';

interface TransactionHistoryListProps {
  onTransactionPress: (transactionId: string) => void;
}

export const TransactionHistoryList: React.FC<TransactionHistoryListProps> = ({
  onTransactionPress,
}) => {
  const { transactions, loading, error } = useTransactionHistory();

  if (loading) {
    return <LoadingState message="Loading transactions..." className="mt-20" />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load transactions"
        message="Please check your connection and try again"
        className="mt-20"
      />
    );
  }

  return (
    <ScrollView className="mt-[24px] w-full flex-1  bg-black" showsVerticalScrollIndicator={false}>
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
