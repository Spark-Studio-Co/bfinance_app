import React, { useState } from 'react';
import { View } from 'react-native';
import { TransactionHistoryList } from '~/widgets/ui/HistoryList';
import { TransactionDetailsScreen } from '../transaction-detail/TransactionDetailsPage';
import { Header } from '~/features/Header/ui/Header';

export const TransactionHistoryScreen = () => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  const handleBackFromDetails = () => {
    setSelectedTransactionId(null);
  };

  const handleContactSupport = () => {
    console.log('Contact support pressed');
  };

  if (selectedTransactionId) {
    return (
      <TransactionDetailsScreen
        transactionId={selectedTransactionId}
        onBackPress={handleBackFromDetails}
        onContactSupport={handleContactSupport}
      />
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Header title="History" showBackButton={true} />
      <TransactionHistoryList />
    </View>
  );
};
