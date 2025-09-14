import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text, Button, CloseIcon } from '~/shared/ui';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/shared/types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import BitcoinIcon from '~/shared/icons/BitcoinIcon';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteParams = {
  cardType: 'lite' | 'card';
  cardName: string;
};

interface PaymentMethodProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  amount: string;
  onPress: () => void;
  isSelected?: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  icon,
  title,
  subtitle,
  amount,
  onPress,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mb-3 flex-row items-center justify-between rounded-[12px] p-4 ${
        isSelected ? 'border border-[#00E675] bg-[#1a1a1a]' : 'bg-[#1a1a1a]'
      }`}
      activeOpacity={0.8}>
      <View className="flex-1 flex-row items-center">
        <View className="mr-3">{icon}</View>
        <View className="flex-1">
          <Text weight="medium" className="mb-1 text-[16px] text-white">
            {title}
          </Text>
          <Text weight="regular" className="text-[14px] text-[#aaaaaa]">
            {subtitle}
          </Text>
        </View>
      </View>
      <Text weight="medium" className="text-[16px] text-white">
        {amount}
      </Text>
    </TouchableOpacity>
  );
};

export function CardPaymentPage() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedPayment, setSelectedPayment] = useState<string>('usd');

  const handlePayment = () => {
    navigation.navigate('CardSuccess');
  };

  return (
    <MainLayout
      isTitle
      title=""
      isBack
      isIcon
      icon={<CloseIcon onPress={() => navigation.goBack()} />}>
      <View className="flex-1 px-6 py-4">
        {/* Card Preview */}
        <View className="mb-6 items-center">
          <LinearGradient
            colors={['#00E675', '#00A855']}
            style={{
              width: 200,
              height: 126,
              borderRadius: 16,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View className="h-full justify-between p-4">
              <View />
              <View className="flex-row items-end justify-between">
                <Text weight="bold" className="text-[16px] text-white">
                  BFinance
                </Text>
                <View className="flex-row">
                  <View className="mr-2 h-6 w-6 rounded-full bg-red-500 opacity-80" />
                  <View className="h-6 w-6 rounded-full bg-yellow-500 opacity-80" />
                </View>
              </View>
            </View>
          </LinearGradient>

          <View className="mb-2 mt-4 items-center">
            <Text weight="regular" className="mb-1 text-[16px] text-white">
              Payment
            </Text>
            <Text weight="regular" className="text-[14px] text-[#aaaaaa]">
              100 USD
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* FIAT Section */}
          <View className="mb-6">
            <Text
              weight="regular"
              className="mb-3 text-[14px] uppercase tracking-wider text-[#aaaaaa]">
              FIAT
            </Text>

            <PaymentMethod
              icon={
                <View className="h-10 w-10 items-center justify-center rounded-full bg-white">
                  <Text weight="bold" className="text-[18px] text-black">
                    $
                  </Text>
                </View>
              }
              title="Dollars"
              subtitle="100 USD"
              amount="1 USD"
              onPress={() => setSelectedPayment('usd')}
              isSelected={selectedPayment === 'usd'}
            />
          </View>

          {/* CRYPTO Section */}
          <View className="mb-6">
            <Text
              weight="regular"
              className="mb-3 text-[14px] uppercase tracking-wider text-[#aaaaaa]">
              CRYPTO
            </Text>

            <PaymentMethod
              icon={<BitcoinIcon width={40} height={40} />}
              title="Bitcoin"
              subtitle="0.1 BTC"
              amount="0.00001 BTC"
              onPress={() => setSelectedPayment('btc1')}
              isSelected={selectedPayment === 'btc1'}
            />

            <PaymentMethod
              icon={<BitcoinIcon width={40} height={40} />}
              title="Bitcoin"
              subtitle="0.1 BTC"
              amount="0.00001 BTC"
              onPress={() => setSelectedPayment('btc2')}
              isSelected={selectedPayment === 'btc2'}
            />

            <PaymentMethod
              icon={<BitcoinIcon width={40} height={40} />}
              title="Bitcoin"
              subtitle="0.1 BTC"
              amount="0.00001 BTC"
              onPress={() => setSelectedPayment('btc3')}
              isSelected={selectedPayment === 'btc3'}
            />
          </View>
        </ScrollView>

        {/* Pay Button */}
        <View className="pt-4">
          <Button
            label="Pay"
            onPress={handlePayment}
            variant="light"
            weight="semibold"
            className="rounded-[12px] py-4"
          />
        </View>
      </View>
    </MainLayout>
  );
}
