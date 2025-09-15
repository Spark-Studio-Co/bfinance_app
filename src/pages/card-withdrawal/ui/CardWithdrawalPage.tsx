import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/shared/types/navigation';
import { useResponsive } from '~/shared/hooks';
import { Text, Button } from '~/shared/ui';
import { PaymentModal } from '~/shared/ui/PaymentModal';
import ChevronLeft from '~/shared/icons/ChevronLeft';

export const CardWithdrawalPage = () => {
  const { s } = useResponsive();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [amount, setAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const withdrawalFee = 1; // 1%
  const feeAmount = amount ? ((parseFloat(amount) * withdrawalFee) / 100).toFixed(2) : '0.00';

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (amount.trim()) {
      setShowPaymentModal(true);
    }
  };

  const handlePayment = () => {
    setShowPaymentModal(false);
    navigation.navigate('CardWithdrawalSuccess');
  };

  const canProceed = amount.trim() !== '' && parseFloat(amount) > 0;

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="flex-row items-center px-6 pb-6 pt-16">
        <TouchableOpacity onPress={handleBack} className="mr-3">
          <ChevronLeft color="white" size={s(24)} />
        </TouchableOpacity>
        <Text
          weight="semibold"
          className="text-[20px] text-white"
          style={{ letterSpacing: s(-0.23) }}>
          Withdraw from card
        </Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-6">
        {/* Withdrawal Fee Section */}
        <View className="rounded-[16px] bg-[#0f0f0f]">
          <View className="flex-row items-center justify-between px-4 py-4">
            <View className="flex-1">
              <Text
                weight="medium"
                className="mb-1 text-[17px] text-white"
                style={{ letterSpacing: s(-0.4) }}>
                {withdrawalFee}%
              </Text>
              <Text
                weight="regular"
                className="text-[13px] text-[#aaaaaa]"
                style={{ letterSpacing: s(-0.08) }}>
                Withdrawal fee
              </Text>
            </View>
            <Text
              weight="regular"
              className="text-[17px] text-white"
              style={{ letterSpacing: s(-0.4) }}>
              {feeAmount}$
            </Text>
          </View>
        </View>

        {/* Amount Input */}
        <View className="mt-[24px] h-[48px] justify-center rounded-[16px] bg-[#0f0f0f] px-4">
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Amount"
            placeholderTextColor="#78797e"
            className="text-[17px] text-white"
            keyboardType="numeric"
            style={{
              fontFamily: 'SF Pro',
              fontSize: s(17),
              fontWeight: '400',
              lineHeight: s(22),
              letterSpacing: s(-0.4),
            }}
          />
        </View>

        {/* Continue Button */}
        <View className="mt-[12px] pb-8">
          <Button
            label="Continue"
            onPress={handleContinue}
            disabled={!canProceed}
            variant="light"
            weight="semibold"
            className="h-[42px] rounded-[12px]"
            style={{
              fontSize: s(15),
              letterSpacing: s(-0.23),
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
    </View>
  );
};
