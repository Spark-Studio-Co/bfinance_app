import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text, Button, Input } from '~/shared/ui';
import { PaymentModal } from '~/shared/ui/PaymentModal';
import { useErrorHandler } from '~/shared/hooks/useErrorHandler';

export const CardTopupPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { showError, showWarning, handleAsyncError } = useErrorHandler();
  const [amount, setAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const topupFee = '2%';
  const feeAmount = '0.00$';

  const validateAmount = (value: string): boolean => {
    if (!value.trim()) {
      showError('Please enter an amount');
      return false;
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      showError('Please enter a valid amount');
      return false;
    }

    if (numericValue <= 0) {
      showError('Amount must be greater than 0');
      return false;
    }

    if (numericValue < 1) {
      showWarning('Minimum topup amount is $1.00');
      return false;
    }

    if (numericValue > 10000) {
      showError('Maximum topup amount is $10,000');
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validateAmount(amount)) {
      setShowPaymentModal(true);
    }
  };

  const handlePayment = () => {
    handleAsyncError(async () => {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowPaymentModal(false);
      navigation.navigate('CardTopupSuccess');
    }, 'Failed to process topup payment');
  };

  return (
    <>
      <MainLayout title="Card topup" isBack isTitle>
        <View className="mt-[12px] flex-1">
          <View className="rounded-[16px] bg-[#0F0F0F] px-4 py-[12px]">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text weight="medium" className="mb-1 text-[17px] text-white">
                  {topupFee}
                </Text>
                <Text weight="regular" className="text-[13px] text-[#aaaaaa]">
                  Topup fee
                </Text>
              </View>
              <Text weight="regular" className="text-[17px] text-white">
                {feeAmount}
              </Text>
            </View>
          </View>

          <View className="mt-[24px]">
            <Input
              value={amount}
              onChangeText={setAmount}
              placeholder="Amount"
              keyboardType="numeric"
              variant="dark"
              className="h-[48px] rounded-[16px]  bg-[#0F0F0F]"
            />
          </View>

          {/* Continue Button */}
          <View className="mt-[12px]">
            <Button
              label="Continue"
              onPress={handleContinue}
              variant="light"
              weight="semibold"
              className="h-[48px] rounded-[12px] text-[15px]"
            />
          </View>
        </View>
      </MainLayout>

      <PaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPay={handlePayment}
        cardName="Card topup"
      />
    </>
  );
};
