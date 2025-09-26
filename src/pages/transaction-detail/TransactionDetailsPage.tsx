import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Header } from '~/features/Header/ui/Header';
import { Button } from '~/shared/ui/Button';
import { TransactionAmount } from '~/features/Transactions/ui/TransactionAmount';
import { TransactionDetailsList } from '~/widgets/ui/TransactionDetailsList';
import { useTransactionDetails } from '~/entities/transaction/model/detail-hook';
import { LoadingState, ErrorState } from '~/shared/ui';
import { SafeAreaView } from 'react-native-safe-area-context';

type TransactionDetailsRouteParams = {
  transactionId: string;
};

export const TransactionDetailsScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { transactionId } = route.params as TransactionDetailsRouteParams;

  const { transaction, loading, error } = useTransactionDetails(transactionId);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleContactSupport = () => {
    navigation.navigate('Support');
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#000000]">
        <Header title="Transaction" showTitle={true} onBackPress={handleBackPress} />
        <LoadingState message="Loading transaction details..." className="mt-20" />
      </SafeAreaView>
    );
  }

  if (error || !transaction) {
    return (
      <SafeAreaView className="flex-1 bg-[#000000]">
        <Header title="Transaction" showTitle={true} onBackPress={handleBackPress} />
        <ErrorState
          title="Failed to load transaction"
          message="Please check your connection and try again"
          className="mt-20"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#000000]">
      <Header title="Transaction" showTitle={true} onBackPress={handleBackPress} />
      <View className="mt-[24px] flex-1 px-[24px]">
        <TransactionAmount
          merchant={transaction.merchant}
          amount={transaction.amount}
          status={transaction.status}
        />
        <View className="mb-4">
          <TransactionDetailsList transaction={transaction} />
        </View>
        <View className="">
          <Button
            className="h-[48px] pb-[12px] pt-[12px]"
            variant="light"
            weight="semibold"
            label="Contact support"
            onPress={handleContactSupport}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
