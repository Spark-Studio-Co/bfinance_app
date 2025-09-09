import React from 'react';
import { View } from 'react-native';
import { Text, SingleTransactionDetail } from '~/shared/ui';
import { useWithdrawalStore } from '../../model/use-withdrawal-store';
import { useResponsive } from '~/shared/hooks/useResponsive';

export const ConfirmationStep: React.FC = () => {
  const { s } = useResponsive();
  const { selectedCrypto, selectedNetwork, formData } = useWithdrawalStore();

  const truncateAddress = (address: string) => {
    if (address.length <= 20) return address;
    return `${address.slice(0, 10)}...${address.slice(-6)}`;
  };

  return (
    <View>
      <Text className="mb-4 text-sm text-[#78797E]" style={{ fontSize: s(14) }}>
        {selectedCrypto?.name} ({selectedNetwork?.name})
      </Text>

      <SingleTransactionDetail label="Wallet address" value={formData.walletAddress} />

      <SingleTransactionDetail
        label="Amount"
        value={`${formData.amount} ${selectedCrypto?.symbol}`}
      />

      <SingleTransactionDetail label="Fee" value={`0.0001 ${selectedCrypto?.symbol}`} />
    </View>
  );
};
