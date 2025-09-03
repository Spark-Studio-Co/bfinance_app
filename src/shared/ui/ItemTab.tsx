import React from 'react';
import { View, Image } from 'react-native';
import { useResponsive } from '../hooks';
import Text from './Text';

interface ItemTabProps {
  isFiat: boolean;
  currency?: string;
  icon?: string;
  name?: string;
  value?: string;
  title?: string;
}

export const ItemTab: React.FC<ItemTabProps> = ({ isFiat, currency, icon, name, value, title }) => {
  const { s } = useResponsive();

  const containerStyle = {
    borderRadius: s(16),
    height: s(68),
    paddingLeft: s(16),
    paddingRight: s(16),
    paddingTop: s(11),
    paddingBottom: s(11),
  };

  const circleStyle = {
    width: s(40),
    height: s(40),
  };

  const circleTextStyle = {
    fontSize: s(19),
  };

  const nameStyle = {
    fontSize: s(17),
    lineHeight: s(24),
  };

  return (
    <View
      style={containerStyle}
      className="flex w-full flex-row items-center justify-between bg-[#0F0F0F]">
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
          <Image source={{ uri: icon }} style={circleStyle} className="rounded-full" />
        )}
        <Text style={nameStyle} weight="semibold" className="text-white">
          {name}
        </Text>
      </View>
      <Text className="text-white" weight="medium" style={nameStyle}>
        {value}
      </Text>
    </View>
  );
};
