import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';

export interface TransactionDetailRowProps {
  label: string;
  value: string;
  valueColor?: string;
  className?: string;
}

export const TransactionDetailRow: React.FC<TransactionDetailRowProps> = ({
  label,
  value,
  className = '',
}) => {
  return (
    <View className={`h-full flex-col justify-center ${className}`}>
      <Text weight="medium" className="text-white" style={{ fontSize: 17 }}>
        {value}
      </Text>
      <Text className="mt-[2px] font-normal text-[#AAAAAA]" style={{ fontSize: 13 }}>
        {label}
      </Text>
    </View>
  );
};

export interface TransactionDetailItem {
  label: string;
  value: string;
}

export interface TransactionDetailsProps {
  items: TransactionDetailItem[];
  className?: string;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  items,
  className = '',
}) => {
  const truncateAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <View
      className={`rounded-[16px] bg-[#0F0F0F] px-4 py-4 ${className}`}
      style={{
        marginTop: 24,
      }}>
      {items.map((item, index) => (
        <View key={index} style={{ marginBottom: index < items.length - 1 ? 16 : 0 }}>
          <TransactionDetailRow
            label={item.label}
            value={
              item.label.toLowerCase().includes('address')
                ? truncateAddress(item.value)
                : item.value
            }
          />
        </View>
      ))}
    </View>
  );
};

TransactionDetails.displayName = 'TransactionDetails';

export interface SingleTransactionDetailProps {
  label: string;
  value: string;
  className?: string;
}

export const SingleTransactionDetail: React.FC<SingleTransactionDetailProps> = ({
  label,
  value,
  className = '',
}) => {
  const truncateAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}****${address.slice(-4)}`;
  };

  const shouldTruncate =
    label.toLowerCase().includes('address') || label.toLowerCase().includes('wallet');

  return (
    <View className={`mb-3 h-[68px] rounded-[16px] bg-[#0F0F0F] px-4 ${className}`}>
      <TransactionDetailRow label={label} value={shouldTruncate ? truncateAddress(value) : value} />
    </View>
  );
};

SingleTransactionDetail.displayName = 'SingleTransactionDetail';
