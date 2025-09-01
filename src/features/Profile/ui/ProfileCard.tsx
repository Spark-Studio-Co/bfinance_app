import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity
      className="mb-2.5 h-[68px] flex-row items-center gap-3 rounded-2xl bg-[#0F0F0F] px-6"
      onPress={onPress}
      activeOpacity={0.7}>
      <View className="mr-4 h-6 w-6 items-center justify-center">{icon}</View>
      <Text className="flex-1 text-[17px] text-white">{title}</Text>
    </TouchableOpacity>
  );
};
