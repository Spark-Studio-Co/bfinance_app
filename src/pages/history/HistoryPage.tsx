import React from 'react';
import { TransactionHistoryList } from '~/widgets/ui/HistoryList';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TransactionHistoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleTransactionPress = (transactionId: string) => {
    navigation.navigate('TransactionDetails', { transactionId });
  };

  return (
    <MainLayout isBack isTitle title="History">
      <TransactionHistoryList onTransactionPress={handleTransactionPress} />
    </MainLayout>
  );
};
