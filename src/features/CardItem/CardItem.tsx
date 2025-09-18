import { Image, Pressable, View } from 'react-native';
import { Text } from '~/shared/ui';

export interface CardItemProps {
  cardName: string;
  cardNumber: string;
  cardType: 'visa' | 'mastercard';
  balance: string;
  currency: string;
  isActive?: boolean;
  onPress?: () => void;
}

export const CardItem = ({ cardName, cardNumber, balance, currency, onPress }: CardItemProps) => {
  const cardStyle = {
    height: 68,
    borderRadius: 16,
    padding: 16,
  };

  const textStyle = {
    fontSize: 17,
  };

  const textBalanceStyle = {
    fontSize: 15,
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <Pressable
      onPress={onPress}
      style={cardStyle}
      className="flex w-full flex-row items-center justify-between bg-[#0F0F0F]">
      <Image source={require('../../../assets/bfinance_card.png')} className="h-[34px] w-[54px]" />
      <View className="ml-3 flex flex-1 flex-col items-start gap-[2px]">
        <Text className="text-white" style={textStyle} weight="medium">
          {cardName}
        </Text>
        <Text className="text-[#AAAAAA]" style={{ fontSize: 15 }} weight="regular">
          Visa *{cardNumber.slice(-4)}
        </Text>
      </View>
      <View className="flex flex-col items-end">
        <Text className="text-white" style={textBalanceStyle} weight="regular">
          {balance} {currency}
        </Text>
      </View>
    </Pressable>
  );
};
