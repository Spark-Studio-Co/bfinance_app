import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Header } from '~/features/Header/ui/Header';
import { Button } from '~/shared/ui/Button';
import { TransactionAmount } from '~/features/Transactions/ui/TransactionAmount';
import { TransactionDetailsList } from '~/widgets/ui/TransactionDetailsList';
import { useTransactionDetails } from '~/entities/transaction/model/detail-hook';
import { Container } from '~/shared/ui';
import { SafeAreaView } from 'react-native-safe-area-context';

type TransactionDetailsRouteParams = {
  transactionId: string;
};

export const TransactionDetailsScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { transactionId } = route.params as TransactionDetailsRouteParams;

  const { transaction, loading } = useTransactionDetails(transactionId);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleContactSupport = () => {
    console.log('Contact support pressed');
  };

  if (loading || !transaction) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#000000]">
      <Header title="Transaction" showTitle={true} onBackPress={handleBackPress} />

      <View className="flex-1 px-4">
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
            className="pb-[12px] pt-[12px]"
            variant="light"
            weight="semibold"
            label="Contact support"
            onPress={handleContactSupport}
          />
        </View>
      </View>
    </View>
  );
};
