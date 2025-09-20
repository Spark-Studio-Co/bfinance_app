import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '~/shared/ui';

interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity
      className="mb-[8px] h-[68px] flex-row items-center  rounded-2xl bg-[#0F0F0F] px-[16px]"
      onPress={onPress}
      activeOpacity={0.7}>
      <View className="mr-[16px] h-[40px] w-[40px] items-center justify-center">{icon}</View>
      <Text className="flex-1 text-[17px] text-white" weight="medium">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
