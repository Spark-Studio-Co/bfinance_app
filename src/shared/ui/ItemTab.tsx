import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import Text from './Text';

interface ItemTabProps {
  isFiat: boolean;
  isCrypto?: boolean;
  currency?: string;
  icon?: ImageSourcePropType;
  name?: string;
  value?: string;
  title?: string;
  cryptoAmount?: string;
}

export const ItemTab: React.FC<ItemTabProps> = ({
  isFiat,
  isCrypto,
  currency,
  icon,
  name,
  value,
  cryptoAmount,
  title,
}) => {
  const containerStyle = {
    borderRadius: 16,
    height: 68,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 11,
    paddingBottom: 11,
  };

  const circleStyle = {
    width: 40,
    height: 40,
  };

  const circleTextStyle = {
    fontSize: 19,
  };

  const nameStyle = {
    fontSize: 17,
  };

  const cryptoAmountStyle = {
    fontSize: 15,
  };

  return (
    <View
      style={containerStyle}
      className="flex w-full flex-row items-center justify-between bg-[#131313]">
      <View className="flex flex-row items-center gap-[16px]">
        {isFiat ? (
          <View
            style={circleStyle}
            className="flex !items-center !justify-center rounded-full bg-white/10">
            <Text className="font-semibold text-white" style={circleTextStyle}>
              {currency}
            </Text>
          </View>
        ) : (
          <Image source={icon} style={circleStyle} className="rounded-full" />
        )}
        <View className="flex flex-col items-start">
          <Text style={nameStyle} weight="semibold" className="text-white">
            {name}
          </Text>
          {isCrypto && (
            <Text style={cryptoAmountStyle} weight="regular" className="mt-[2px] text-[#AAAAAA]">
              {cryptoAmount}
            </Text>
          )}
        </View>
      </View>
      <Text className="text-white" weight="medium" style={nameStyle}>
        {value}
      </Text>
    </View>
  );
};
