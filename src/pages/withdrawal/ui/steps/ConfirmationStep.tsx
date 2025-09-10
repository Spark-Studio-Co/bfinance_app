import React from 'react';
import { View } from 'react-native';
import { SingleTransactionDetail } from '~/shared/ui';
import { useWithdrawalStore } from '../../model/use-withdrawal-store';
import { useResponsive } from '~/shared/hooks/useResponsive';

export const ConfirmationStep: React.FC = () => {
  const { s } = useResponsive();
  const { selectedCrypto, formData } = useWithdrawalStore();

  return (
    <View style={{ marginTop: s(24) }}>
      <SingleTransactionDetail label="Wallet address" value={formData.walletAddress} />

      <SingleTransactionDetail
        label="Amount"
        value={`${formData.amount} ${selectedCrypto?.symbol}`}
      />

      <SingleTransactionDetail label="Fee" value={`0.0001 ${selectedCrypto?.symbol}`} />
    </View>
  );
};
