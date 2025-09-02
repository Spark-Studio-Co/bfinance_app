import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import ChevronLeft from '~/shared/icons/ChevronLeft';
import LogOut from '~/shared/icons/LogOut';

interface HeaderProps {
  title: string;
  showTitle?: boolean;
  showLogout?: boolean;
  onBackPress?: () => void;
  onLogoutPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showTitle = false,
  showLogout = false,
  onBackPress,
  onLogoutPress,
}) => {
  return (
    <View className="mb-8 flex flex-row items-center justify-between px-4 pt-24">
      <TouchableOpacity onPress={onBackPress} className="mr-6">
        <Text className="text-white">
          <ChevronLeft />
        </Text>
      </TouchableOpacity>

      {showTitle && (
        <Text className="flex-1 text-center text-[20px] font-semibold text-white">{title}</Text>
      )}

      {showLogout ? (
        <TouchableOpacity onPress={onLogoutPress}>
          <LogOut />
        </TouchableOpacity>
      ) : (
        <View className="w-6" />
      )}
    </View>
  );
};
