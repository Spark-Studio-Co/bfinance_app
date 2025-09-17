import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { TransactionHistoryList } from '~/widgets/ui/HistoryList';
import { Header } from '~/features/Header/ui/Header';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/shared/types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TransactionHistoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleTransactionPress = (transactionId: string) => {
    navigation.navigate('TransactionDetails', { transactionId });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#000000]">
      <Header title="History" showTitle={true} />
      <TransactionHistoryList onTransactionPress={handleTransactionPress} />
    </SafeAreaView>
  );
};
