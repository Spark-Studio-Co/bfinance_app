import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { useResponsive } from '../hooks/useResponsive';

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
      <Text className="text-[17px] font-medium text-white">{value}</Text>
      <Text className="mt-[2px] text-[13px] font-normal text-[#AAAAAA]"> {label}</Text>
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
  const { s } = useResponsive();

  const truncateAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <View
      className={`rounded-[16px] bg-[#0F0F0F] px-4 py-4 ${className}`}
      style={{
        marginTop: s(24),
      }}>
      {items.map((item, index) => (
        <View key={index} style={{ marginBottom: index < items.length - 1 ? s(16) : 0 }}>
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
  const { s } = useResponsive();

  const truncateAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <View
      className={`rounded-[16px] bg-[#0F0F0F] px-4 py-4 ${className}`}
      style={{
        marginTop: s(24),
      }}>
      <TransactionDetailRow
        label={label}
        value={label.toLowerCase().includes('address') ? truncateAddress(value) : value}
      />
    </View>
  );
};

SingleTransactionDetail.displayName = 'SingleTransactionDetail';
