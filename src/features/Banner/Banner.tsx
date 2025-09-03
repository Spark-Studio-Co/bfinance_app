import React from 'react';
import { Image, View, ImageSourcePropType } from 'react-native';
import { useResponsive } from '~/shared/hooks';
import { Text } from '~/shared/ui';

interface BannerProps {
  title?: string;
  subtitle?: string;
  image?: ImageSourcePropType;
}

export const Banner = ({
  title = 'Pay crypto like fiat',
  subtitle = 'Issue your Visa crypto-card in seconds',
  image = require('../../../assets/paycard.png'),
}: BannerProps) => {
  const { s } = useResponsive();

  const bannerStyle = {
    borderRadius: s(10),
    height: s(144),
    overflow: 'hidden' as const,
  };

  const textStyle = {
    width: s(130),
    fontSize: s(24),
  };

  const textSmallStyle = {
    width: s(165),
    fontSize: s(13),
  };

  const imageStyle = {
    right: s(18),
    top: s(-21),
  };

  return (
    <View className="w-full bg-[#0F0F0F] p-[24px]" style={bannerStyle}>
      <View className="flex flex-col items-start">
        <Text style={textStyle} className="text-left text-white" weight="bold">
          {title}
        </Text>
        <Text style={textSmallStyle} className="mt-[6px] text-left text-white" weight="regular">
          {subtitle}
        </Text>
      </View>
      <Image style={imageStyle} source={image} className="absolute h-[141px] w-[96px]" />
    </View>
  );
};
