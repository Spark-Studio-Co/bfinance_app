import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Button } from '~/shared/ui';
import { WithdrawalForm } from '~/features/WithdrawalForm';
import { useWithdrawalStore } from '~/pages/withdrawal/model/use-withdrawal-store';
import { useResponsive } from '~/shared/hooks/useResponsive';

export const WithdrawalFormPage: React.FC = () => {
  const { s } = useResponsive();
  const navigation = useNavigation();
  const { selectedCrypto, selectedNetwork, formData, setFormData } = useWithdrawalStore();

  const handleFormDataChange = (data: { walletAddress: string; amount: string }) => {
    setFormData(data);
  };

  const handleContinue = () => {
    navigation.navigate('WithdrawalConfirmation');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const canProceed = () => {
    return formData.walletAddress.trim() !== '' && formData.amount.trim() !== '';
  };

  return (
    <MainLayout
      isBack
      isTitle
      title="Withdrawal Details"
      onPrevStep={{
        onPress: handleBack,
      }}>
      <View className="mt-[24px]">
        <WithdrawalForm
          onDataChange={handleFormDataChange}
          initialData={formData}
          className="mb-6"
        />
      </View>

      <View className="mb-6 mt-auto" style={{ paddingBottom: s(20) }}>
        <Button
          label="Continue"
          onPress={handleContinue}
          disabled={!canProceed()}
          className="h-[48px] w-full"
        />
      </View>
    </MainLayout>
  );
};
