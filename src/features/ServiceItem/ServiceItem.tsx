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
        <View className="rounded-full bg-[#00E675] px-[10px] py-[4px]">
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
      className="rounded-[16px] bg-[#0F0F0F]">
      <View className="flex-row items-center justify-between"></View>
    </Pressable>
  );
};
