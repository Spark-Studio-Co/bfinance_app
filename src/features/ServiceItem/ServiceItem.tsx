import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '~/shared/ui';
import { useResponsive } from '~/shared/hooks';

export interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status?: 'available' | 'soon' | 'coming';
  onPress?: () => void;
}

export const ServiceItem = ({
  icon,
  title,
  description,
  status = 'available',
  onPress,
}: ServiceItemProps) => {
  const { s } = useResponsive();

  const containerStyle = {
    borderRadius: s(16),
    padding: s(20),
    minHeight: s(80),
  };

  const getStatusBadge = () => {
    if (status === 'soon') {
      return (
        <View className="rounded-full bg-green-500 px-3 py-1">
          <Text className="text-center text-black" style={{ fontSize: s(12) }} weight="semibold">
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
      className={`w-full border-2 ${
        isDisabled ? 'border-gray-700 bg-gray-900/50' : 'border-blue-500 bg-gray-900'
      }`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          {/* Icon */}
          <View className="mr-4">{icon}</View>

          {/* Content */}
          <View className="flex-1">
            <View className="mb-1 flex-row items-center">
              <Text
                className={`${isDisabled ? 'text-gray-400' : 'text-white'}`}
                style={{ fontSize: s(18) }}
                weight="semibold">
                {title}
              </Text>
              {status === 'soon' && <View className="ml-2">{getStatusBadge()}</View>}
            </View>
            <Text
              className={`${isDisabled ? 'text-gray-500' : 'text-gray-300'}`}
              style={{ fontSize: s(14) }}
              weight="regular">
              {description}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
