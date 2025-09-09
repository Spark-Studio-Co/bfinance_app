import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

export const CurrencyActionButton: React.FC<Props> = ({ icon, label, onPress }) => {
  return (
    <View className="w-[120px] items-center">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        className="mb-2 h-[56px] w-[56px] items-center justify-center rounded-full bg-[#181818]">
        {icon}
      </TouchableOpacity>
      <Text className="text-[13px] text-white">{label}</Text>
    </View>
  );
};
