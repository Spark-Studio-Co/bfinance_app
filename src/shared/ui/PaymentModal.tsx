import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Text, Button } from '~/shared/ui';
import BitcoinIcon from '~/shared/icons/BitcoinIcon';
import CircleCrossIcon from '../icons/CircleCrossIcon';
import CircleDollarIcon from '../icons/CircleDollarIcon';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onPay: () => void;
  cardName: string;
}

const { height: screenHeight } = Dimensions.get('window');

interface PaymentMethodProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  amount: string;
  onPress: () => void;
  isSelected?: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ icon, title, subtitle, amount }) => {
  return (
    <TouchableOpacity
      className={`h-[68px] flex-row items-center justify-between rounded-[16px] bg-[#0F0F0F] px-4`}
      activeOpacity={0.7}>
      <View className="flex-1 flex-row items-center">
        <View className="mr-3">{icon}</View>
        <View className="flex-1">
          <Text weight="medium" className="mb-1 text-[17px] text-white">
            {title}
          </Text>
          <Text weight="regular" className="text-[13px] text-[#aaaaaa]">
            {subtitle}
          </Text>
        </View>
      </View>
      <Text weight="regular" className="text-[17px] text-white">
        {amount}
      </Text>
    </TouchableOpacity>
  );
};

export function PaymentModal({ visible, onClose, onPay }: PaymentModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>('usd');

  const fiatMethods = [
    {
      id: 'usd',
      icon: <CircleDollarIcon />,
      title: 'Dollars',
      subtitle: '100 USD',
      amount: '1 USD',
    },
  ];

  const cryptoMethods = [
    {
      id: 'btc1',
      icon: <BitcoinIcon width={40} height={40} />,
      title: 'Bitcoin',
      subtitle: '0.1 BTC',
      amount: '0.00001 BTC',
    },
    {
      id: 'btc2',
      icon: <BitcoinIcon width={40} height={40} />,
      title: 'Bitcoin',
      subtitle: '0.1 BTC',
      amount: '0.00001 BTC',
    },
    {
      id: 'btc3',
      icon: <BitcoinIcon width={40} height={40} />,
      title: 'Bitcoin',
      subtitle: '0.1 BTC',
      amount: '0.00001 BTC',
    },
  ];

  const handlePayment = () => {
    onClose();
    setTimeout(() => {
      onPay();
    }, 300);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* Background overlay */}
      <View className="flex-1 bg-black/50">
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />

        <View className="overflow-hidden rounded-t-[24px] bg-black" style={{ height: 658 }}>
          <View className="flex-1 px-[16px]">
            <View className="items-center">
              <View className="mb-[6px] mt-[13px] items-center">
                <Text weight="semibold" className="mb-[6px] text-[17px] text-white">
                  Payment
                </Text>
                <Text weight="regular" className="text-[14px] text-[#FFFFFF] opacity-[70%]">
                  100 USD
                </Text>
              </View>

              {/* Close Button */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onClose}
                className="absolute right-0 top-6">
                <CircleCrossIcon />
              </TouchableOpacity>
            </View>

            {/* Payment Methods - Scrollable Content */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              <View className="mt-[12px]">
                <Text
                  weight="regular"
                  className="mb-[8px] text-[13px] uppercase tracking-wider text-[#aaaaaa]">
                  FIAT
                </Text>
                <View className="gap-3">
                  {fiatMethods.map((method) => (
                    <PaymentMethod
                      key={method.id}
                      icon={method.icon}
                      title={method.title}
                      subtitle={method.subtitle}
                      amount={method.amount}
                      onPress={() => setSelectedPayment(method.id)}
                      isSelected={selectedPayment === method.id}
                    />
                  ))}
                </View>
              </View>
              <View className="mb-6 mt-[24px]">
                <Text
                  weight="regular"
                  className="mb-3 text-[14px] uppercase tracking-wider text-[#aaaaaa]">
                  CRYPTO
                </Text>
                <View className="gap-3">
                  {cryptoMethods.map((method) => (
                    <PaymentMethod
                      key={method.id}
                      icon={method.icon}
                      title={method.title}
                      subtitle={method.subtitle}
                      amount={method.amount}
                      onPress={() => setSelectedPayment(method.id)}
                      isSelected={selectedPayment === method.id}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>

            <View className="pb-[48px] pt-4">
              <Button
                label="Pay"
                onPress={handlePayment}
                variant="light"
                weight="semibold"
                className="h-[48px] rounded-[12px]"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
