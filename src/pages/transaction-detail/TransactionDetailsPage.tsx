import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Button } from '~/shared/ui/Button';
import { TransactionAmount } from '~/features/Transactions/ui/TransactionAmount';
import { TransactionDetailsList } from '~/widgets/ui/TransactionDetailsList';
import { useTransactionDetails } from '~/entities/transaction/model/detail-hook';

interface TransactionDetailsScreenProps {
  transactionId: string;
  onBackPress?: () => void;
  onContactSupport?: () => void;
}

export const TransactionDetailsScreen: React.FC<TransactionDetailsScreenProps> = ({
  transactionId,
  onBackPress,
  onContactSupport,
}) => {
  const { transaction, loading } = useTransactionDetails(transactionId);

  if (loading || !transaction) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Header title="Transaction" showBackButton={true} onBackPress={onBackPress} />

      <View className="flex-1 px-4">
        <TransactionAmount
          merchant={transaction.merchant}
          amount={transaction.amount}
          status={transaction.status}
        />

        <View className="mb-8">
          <TransactionDetailsList transaction={transaction} />
        </View>

        <View className="mb-8 mt-auto">
          <Button title="Contact support" onPress={onContactSupport} />
        </View>
      </View>
    </View>
  );
};
