import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Button } from '~/shared/ui';
import { SingleTransactionDetail } from '~/shared/ui';
import { useWithdrawalStore } from '~/pages/withdrawal/model/use-withdrawal-store';
import { useResponsive } from '~/shared/hooks/useResponsive';

export const WithdrawalConfirmationPage: React.FC = () => {
  const { s } = useResponsive();
  const navigation = useNavigation();
  const { selectedCrypto, formData } = useWithdrawalStore();

  const handleConfirm = () => {
    navigation.navigate('WithdrawalSuccess');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <MainLayout
      isBack
      isTitle
      title="Confirm Withdrawal"
      onPrevStep={{
        onPress: handleBack,
      }}>
      <View style={{ marginTop: 24 }}>
        <SingleTransactionDetail label="Wallet address" value={formData.walletAddress} />
        <SingleTransactionDetail
          label="Amount"
          value={`${formData.amount} ${selectedCrypto?.symbol}`}
        />
        <SingleTransactionDetail label="Fee" value={`0.0001 ${selectedCrypto?.symbol}`} />
      </View>

      <View className="mb-6 mt-auto" style={{ paddingBottom: s(20) }}>
        <Button label="Confirm Withdrawal" onPress={handleConfirm} className="h-[48px] w-full" />
      </View>
    </MainLayout>
  );
};
