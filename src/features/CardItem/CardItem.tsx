import { Image, Pressable, View } from 'react-native';
import { useResponsive } from '~/shared/hooks';
import { Text } from '~/shared/ui';

export interface CardItemProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cardType: 'visa' | 'mastercard';
  balance: string;
  currency: string;
  isActive?: boolean;
  onPress?: () => void;
}

export const CardItem = ({
  cardNumber,
  cardHolder,
  expiryDate,
  cardType,
  balance,
  currency,
  isActive = false,
  onPress,
}: CardItemProps) => {
  const { s } = useResponsive();

  const cardStyle = {
    height: s(68),
    borderRadius: s(16),
    padding: s(16),
  };

  const textStyle = {
    fontSize: s(17),
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <Pressable
      onPress={onPress}
      style={cardStyle}
      className="flex w-full flex-row items-center justify-between  bg-[#0F0F0F]">
      <Image source={require('../../../assets/bfinance_card.png')} className="h-[34px] w-[54px]" />
      <View className="flex flex-col items-start gap-[2px]">
        <Text className="text-white"></Text>
      </View>
    </Pressable>
  );
};
