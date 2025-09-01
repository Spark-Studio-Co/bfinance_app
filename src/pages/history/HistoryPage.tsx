import React from 'react';
import { View } from 'react-native';
import { TransactionHistoryList } from '~/widgets/ui/HistoryList';
import { Header } from '~/features/Header/ui/Header';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '~/shared/types/navigation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const TransactionHistoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleTransactionPress = (transactionId: string) => {
    navigation.navigate('TransactionDetails', { transactionId });
  };

  return (
    <View className="flex-1 bg-black">
      <Header title="History" showTitle={true} />
      <TransactionHistoryList onTransactionPress={handleTransactionPress} />
    </View>
  );
};
