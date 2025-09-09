import React from 'react';
import { View } from 'react-native';
import { Text } from '~/shared/ui';
import { WithdrawalForm } from '~/features/WithdrawalForm';
import { useWithdrawalStore } from '../../model/use-withdrawal-store';
import { useResponsive } from '~/shared/hooks/useResponsive';

export const FormStep: React.FC = () => {
  const { s } = useResponsive();
  const { selectedCrypto, selectedNetwork, formData, setFormData } = useWithdrawalStore();

  const handleFormDataChange = (data: { walletAddress: string; amount: string }) => {
    setFormData(data);
  };

  return (
    <View className="mt-[24px]">
      <WithdrawalForm onDataChange={handleFormDataChange} initialData={formData} className="mb-6" />
    </View>
  );
};
