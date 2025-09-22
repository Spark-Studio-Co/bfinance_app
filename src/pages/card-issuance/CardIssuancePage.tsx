import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text } from '~/shared/ui';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/shared/types/navigation';
import AppleIcon from '~/shared/icons/AppleIcon';
import GooglePayIcon from '~/shared/icons/GooglePayIcon';
import GoogleCircleIcon from '~/shared/icons/GoogleCircleIcon';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CardOptionProps {
  title: string;
  description: string;
  cardType: 'lite' | 'card';
  onPress: () => void;
  showApplePay?: boolean;
  showGooglePay?: boolean;
}

const CardOption: React.FC<CardOptionProps> = ({
  title,
  description,
  cardType,
  onPress,
  showApplePay = true,
  showGooglePay = true,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-3 h-[221px]  rounded-[16px] bg-[#0F0F0F] px-4 pt-[23px]"
      activeOpacity={0.7}>
      <View className="flex-row items-start justify-between">
        <View className="max-w-[195px]">
          <Text weight="semibold" className="mb-[6px] text-[17px] text-white">
            {title}
          </Text>
          <Text weight="regular" className="text-[15px] leading-[20px] text-[#aaaaaa]">
            {description}
          </Text>
        </View>

        <View className="relative">
          <Image
            source={require('../../../assets/card_image.png')}
            className="h-[141px] w-[96px]"
          />
        </View>
      </View>

      <View className="flex flex-row gap-x-[7px]">
        {showApplePay && <AppleIcon />}
        {showGooglePay && <GoogleCircleIcon />}
        {cardType === 'lite' && <GooglePayIcon />}
      </View>
    </TouchableOpacity>
  );
};

export function CardIssuancePage() {
  const navigation = useNavigation<NavigationProp>();

  const handleCardSelection = (cardType: 'lite' | 'card', cardName: string) => {
    navigation.navigate('CardIssuanceDetails', { cardType, cardName });
  };

  return (
    <MainLayout isTitle title="Card issuance" isBack>
      <View className="mt-[24px]">
        <CardOption
          title="BFinance Lite"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          cardType="lite"
          onPress={() => handleCardSelection('lite', 'BFinance Lite')}
          showApplePay={true}
          showGooglePay={true}
        />
        <CardOption
          title="BFinance Card"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          cardType="card"
          onPress={() => handleCardSelection('card', 'BFinance Card')}
          showApplePay={true}
          showGooglePay={true}
        />
      </View>
    </MainLayout>
  );
}
