import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Typography } from '~/shared/ui/Typography';
import { Transaction } from '../model/types';
import { Image } from 'expo-image';
// import apple from '../../../assets/apple.png';

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, onPress }) => {
  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatCardNumber = (cardNumber: string) => {
    return `Card •${cardNumber}`;
  };

  return (
    <TouchableOpacity
      className="mx-4 mb-3 rounded-2xl bg-[#0F0F0F] p-4"
      onPress={() => onPress?.(transaction)}
      activeOpacity={0.7}>
      <View className="flex-row items-center">
        {/* Apple Icon */}
        {/* <Image
          source={require('../../../assets/Icons/HistoryScreen/apple.png')}
          contentFit="cover"
          transition={1000}
        /> */}
        {/* Transaction Info */}
        <View className="flex-1">
          <Typography variant="subheading" className="mb-1">
            {transaction.merchant}
          </Typography>
          <Text className="text-md text-[#AAAAAA]">
            {transaction.time} • {formatCardNumber(transaction.cardNumber)}
          </Text>
        </View>

        {/* Amount */}
        <Typography variant="subheading">{formatAmount(transaction.amount)}</Typography>
      </View>
    </TouchableOpacity>
  );
};
