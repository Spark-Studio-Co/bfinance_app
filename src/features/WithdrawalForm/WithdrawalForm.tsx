import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Text } from '~/shared/ui';

export interface WithdrawalFormData {
  walletAddress: string;
  amount: string;
}

export interface WithdrawalFormProps {
  onDataChange: (data: WithdrawalFormData) => void;
  initialData?: WithdrawalFormData;
  className?: string;
}

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  onDataChange,
  initialData,
  className = '',
}) => {
  const [walletAddress, setWalletAddress] = useState(initialData?.walletAddress || '');
  const [amount, setAmount] = useState(initialData?.amount || '');

  const handleWalletAddressChange = (text: string) => {
    setWalletAddress(text);
    onDataChange({ walletAddress: text, amount });
  };

  const handleAmountChange = (text: string) => {
    setAmount(text);
    onDataChange({ walletAddress, amount: text });
  };

  return (
    <View className={className}>
      <View style={{ marginBottom: 12 }}>
        <Text className="mb-2 text-base font-medium text-[#AAAAAA]" style={{ fontSize: 13 }}>
          WALLET ADDRESS
        </Text>
        <Input
          placeholder="TKVqxc3..."
          value={walletAddress}
          onChangeText={handleWalletAddressChange}
          className="h-[48px]"
        />
      </View>

      <View>
        <Text className="mb-2 text-base font-medium text-[#AAAAAA]" style={{ fontSize: 13 }}>
          AMOUNT
        </Text>
        <Input
          returnKeyType="done"
          placeholder="100"
          value={amount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
          className="h-[48px]"
        />
      </View>
    </View>
  );
};
