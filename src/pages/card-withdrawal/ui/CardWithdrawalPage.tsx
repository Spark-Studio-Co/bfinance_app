import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/shared/types/navigation';
import { useErrorHandler } from '~/shared/hooks/useErrorHandler';
import { Text, Button } from '~/shared/ui';
import { GlobalErrorDisplay } from '~/shared/ui';
import { PaymentModal } from '~/shared/ui/PaymentModal';
import { MainLayout } from '~/app/layouts/MainLayout';

export const CardWithdrawalPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { showError } = useErrorHandler();
  const [amount, setAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const withdrawalFee = 1; // 1%
  const feeAmount = amount ? ((parseFloat(amount) * withdrawalFee) / 100).toFixed(2) : '0.00';

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (!amount.trim()) {
      showError('Please enter withdrawal amount');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      showError('Please enter a valid amount greater than 0');
      return;
    }

    if (amountValue < 1) {
      showError('Minimum withdrawal amount is $1');
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    setShowPaymentModal(false);
    navigation.navigate('CardWithdrawalSuccess');
  };

  const canProceed = amount.trim() !== '' && parseFloat(amount) > 0;

  return (
    <MainLayout isBack isTitle title="Withdraw from card">
      <View className="mt-[24px] flex-1">
        <View className="rounded-[16px] bg-[#0f0f0f]">
          <View className="flex-row items-center justify-between px-4 py-[14px]">
            <View className="flex-1">
              <Text weight="medium" className="mb-1 text-[17px] text-white">
                {withdrawalFee}%
              </Text>
              <Text weight="regular" className="text-[13px] text-[#aaaaaa]">
                Withdrawal fee
              </Text>
            </View>
            <Text weight="regular" className="text-[17px] text-white">
              {feeAmount}$
            </Text>
          </View>
        </View>
        <View className="mt-[24px] h-[48px] justify-center rounded-[16px] bg-[#0f0f0f] px-4">
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Amount"
            placeholderTextColor="#78797e"
            className="h-[48px] text-[17px] text-white"
            keyboardType="numeric"
            style={{
              fontFamily: 'SF Pro',
              fontSize: 17,
              fontWeight: '400',
              lineHeight: 22,
            }}
          />
        </View>
        <View className="mt-[12px] pb-8">
          <Button
            label="Continue"
            onPress={handleContinue}
            variant="light"
            weight="semibold"
            className="h-[48px] rounded-[12px]"
            style={{
              fontSize: 15,
            }}
          />
        </View>
      </View>
      <PaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPay={handlePayment}
        cardName="Withdrawal"
      />

      {/* Local error display for testing */}
      <GlobalErrorDisplay />
    </MainLayout>
  );
};
