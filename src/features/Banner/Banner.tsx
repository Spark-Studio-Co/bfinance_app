import { Image, View, ImageSourcePropType } from 'react-native';
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
  const bannerStyle = {
    borderRadius: 10,
    height: 144,
    overflow: 'hidden' as const,
  };

  const textStyle = {
    width: 130,
    fontSize: 24,
  };

  const textSmallStyle = {
    width: 165,
    fontSize: 13,
  };

  const imageStyle = {
    right: 18,
    top: -21,
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
