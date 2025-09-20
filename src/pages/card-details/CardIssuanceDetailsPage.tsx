import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text, Button, PaymentModal } from '~/shared/ui';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/shared/types/navigation';
import AppleIcon from '~/shared/icons/AppleIcon';
import { Image } from 'react-native';
import GoogleCircleIcon from '~/shared/icons/GoogleCircleIcon';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteParams = RouteProp<RootStackParamList, 'CardIssuanceDetails'>;

interface TermsRowProps {
  label: string;
  value: string;
}

const TermsRow: React.FC<TermsRowProps> = ({ label, value }) => {
  return (
    <View className="mb-2 h-[44px] flex-row items-center justify-between rounded-[10px] bg-[#0F0F0F] px-4">
      <Text weight="medium" className="flex-1 text-[16px] text-white">
        {label}
      </Text>
      <Text weight="medium" className="text-[16px] text-white">
        {value}
      </Text>
    </View>
  );
};

export function CardIssuanceDetailsPage() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();
  const { cardType, cardName } = route.params;
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

  const handleIssueCard = () => {
    setIsPaymentModalVisible(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalVisible(false);
  };

  const handlePayment = () => {
    // Navigate to success page after payment
    navigation.navigate('CardSuccess');
  };

  return (
    <MainLayout isBack isTitle>
      <View className="-mt-7 items-center">
        <Image
          source={require('../../../assets/card_image.png')}
          className="h-[204.04px] w-[129px] rounded-[8px]"
        />
      </View>

      {/* Card Title and Description */}
      <View className="mt-[24px] items-center">
        <Text weight="semibold" className="mb-[6px] text-[30px] text-white">
          {cardName}
        </Text>

        <Text
          weight="regular"
          className="max-w-[258px] text-center text-[15px] leading-[22px] text-[#FFFFFF]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>

        {/* Payment Icons */}
        <View className="mt-3 flex flex-row gap-x-[7px]">
          <AppleIcon />
          <GoogleCircleIcon />
        </View>
      </View>

      {/* Terms & Conditions */}
      <View className="mb-[24px] mt-[24px]">
        <Text weight="semibold" className="mb-4 text-[24px] text-white">
          Terms & Conditions
        </Text>

        <TermsRow label="Card topup fee" value="2%" />
        <TermsRow label="Transaction fee" value="0.5$" />
        <TermsRow label="ATM fee" value="1$ + 2%" />
      </View>

      <PaymentModal
        visible={isPaymentModalVisible}
        onClose={handleClosePaymentModal}
        onPay={handlePayment}
        cardName={cardName}
      />
      <Button
        label="Issue card for 20$"
        onPress={handleIssueCard}
        variant="light"
        weight="semibold"
        className="mb-8 mt-auto h-[48px] rounded-[12px]"
      />
    </MainLayout>
  );
}
