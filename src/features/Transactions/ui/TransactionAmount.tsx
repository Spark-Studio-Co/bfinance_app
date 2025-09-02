import React from 'react';
import { Text, View } from 'react-native';
import { Typography } from '~/shared/ui/Typography';
import { TransactionIcon } from '~/entities/transaction/ui/TransactionIcon';

interface TransactionAmountProps {
  merchant: string;
  amount: number;
  status: 'success' | 'failed' | 'received';
}

export const TransactionAmount: React.FC<TransactionAmountProps> = ({
  merchant,
  amount,
  status,
}) => {
  const getAmountColor = () => {
    switch (status) {
      case 'success':
        return '#EC594E'; // red-500
      case 'failed':
        return '#ffffff'; // white
      case 'received':
        return '#00E675'; // green-500
      default:
        return '#ffffff';
    }
  };

  const getAmountPrefix = () => {
    if (status === 'received') return '+';
    return '-';
  };

  const getStatusText = () => {
    switch (status) {
      case 'success':
        return 'Success';
      case 'failed':
        return 'Failed';
      case 'received':
        return 'Success';
      default:
        return 'Success';
    }
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US').replace(/,/g, ' ');
  };

  return (
    <View className="mb-8 items-center">
      <View className="mb-5">
        <TransactionIcon merchant={merchant} size="large" />
      </View>

      <Text className="mb-4 text-[16px] text-white">{merchant}</Text>

      <Text className="mb-2 text-[40px] font-bold" style={{ color: getAmountColor() }}>
        {getAmountPrefix()}
        {formatAmount(amount)} USD
      </Text>

      <Text className="text-[17px] text-[#707579]">{getStatusText()}</Text>
    </View>
  );
};
