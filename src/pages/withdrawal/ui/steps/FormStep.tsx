import React from 'react';
import { View } from 'react-native';
import { WithdrawalForm } from '~/features/WithdrawalForm';
import { useWithdrawalStore } from '../../model/use-withdrawal-store';

export const FormStep: React.FC = () => {
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
