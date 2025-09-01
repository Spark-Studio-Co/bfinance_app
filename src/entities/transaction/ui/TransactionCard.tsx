import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Typography } from '~/shared/ui/Typography';
import { Transaction } from '../model/types';

import AppleIcon from '~/shared/icons/AppleIcon';

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
      className="mx-4 mb-2.5 rounded-2xl bg-[#0F0F0F] p-4"
      onPress={() => onPress?.(transaction)}
      activeOpacity={0.7}>
      <View className="flex-row items-center">
        {/* Apple Icon */}
        <View className="mr-3">
          <AppleIcon />
        </View>
        {/* Transaction Info */}
        <View className="flex-1">
          <Text className="mb-1 text-[17px] text-white">{transaction.merchant}</Text>
          <Text className="text-[15px] text-[#AAAAAA]">
            {transaction.time} • {formatCardNumber(transaction.cardNumber)}
          </Text>
        </View>

        {/* Amount */}
        <Text className="mb-1 text-[17px] text-white">{formatAmount(transaction.amount)}</Text>
      </View>
    </TouchableOpacity>
  );
};
