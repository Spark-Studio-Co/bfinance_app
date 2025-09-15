import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text, Button, Input } from '~/shared/ui';
import { PaymentModal } from '~/shared/ui/PaymentModal';

export const CardTopupPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [amount, setAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const topupFee = '2%';
  const feeAmount = '0.00$';

  const handleContinue = () => {
    if (amount.trim()) {
      setShowPaymentModal(true);
    }
  };

  const handlePayment = () => {
    setShowPaymentModal(false);
    navigation.navigate('CardTopupSuccess');
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
              className="rounded-[16px] bg-[#0F0F0F]"
            />
          </View>

          {/* Continue Button */}
          <View className="mt-[12px]">
            <Button
              label="Continue"
              onPress={handleContinue}
              variant="light"
              weight="semibold"
              className="h-[42px] rounded-[12px]"
              disabled={!amount.trim()}
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
