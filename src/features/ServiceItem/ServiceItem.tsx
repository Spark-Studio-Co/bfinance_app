import { View, Pressable, Image, ImageSourcePropType } from 'react-native';
import { Text } from '~/shared/ui';

export interface ServiceItemProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  status?: 'available' | 'soon' | 'coming';
  onPress?: () => void;
}

export const ServiceItem = ({
  image,
  title,
  description,
  status = 'available',
  onPress,
}: ServiceItemProps) => {
  const containerStyle = {
    borderRadius: 16,
  };

  const getStatusBadge = () => {
    if (status === 'soon') {
      return (
        <View
          style={{ paddingHorizontal: 10, paddingVertical: 2 }}
          className="!rounded-full bg-[#00E675]">
          <Text className="text-center text-black" style={{ fontSize: 12 }} weight="semibold">
            soon
          </Text>
        </View>
      );
    }
    return null;
  };

  const isDisabled = status === 'soon' || status === 'coming';

  return (
    <Pressable
      onPress={!isDisabled ? onPress : undefined}
      style={containerStyle}
      className="flex items-center justify-center rounded-[16px] bg-[#0F0F0F] px-[16px] py-[14px]">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <View className="mr-4">
            <Image source={image} style={{ width: 40, height: 40 }} resizeMode="contain" />
          </View>
          <View className="flex-1">
            <View className="mb-1 flex-row items-center">
              <Text className={`text-white`} style={{ fontSize: 17 }} weight="medium">
                {title}
              </Text>
              {status === 'soon' && (
                <View className="ml-2 rounded-full bg-[#00E675]">{getStatusBadge()}</View>
              )}
            </View>
            <Text className="text-[#AAAAAA]" style={{ fontSize: 13 }} weight="regular">
              {description}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
