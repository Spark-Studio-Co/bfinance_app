import React from 'react';
import { View } from 'react-native';
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
        return 'text-red-500';
      case 'failed':
        return 'text-white';
      case 'received':
        return 'text-green-500';
      default:
        return 'text-white';
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

  return (
    <View className="mb-8 items-center">
      <View className="mb-6">
        <TransactionIcon merchant={merchant} size="large" />
      </View>

      <Typography variant="subheading" className="mb-4">
        {merchant}
      </Typography>

      <Typography className={`mb-2 text-4xl font-bold ${getAmountColor()}`}>
        {getAmountPrefix()}
        {amount} USD
      </Typography>

      <Typography variant="caption" className="text-gray-400">
        {getStatusText()}
      </Typography>
    </View>
  );
};
