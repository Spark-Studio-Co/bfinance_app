import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Typography } from '~/shared/ui/Typography';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, onBackPress }) => {
  return (
    <View className="mb-8 flex flex-row items-center px-4 pt-12">
      {showBackButton && (
        <TouchableOpacity className="mr-5" onPress={onBackPress}>
          <Text className="text-4xl text-white">‹</Text>
        </TouchableOpacity>
      )}
      <Typography variant="heading">{title}</Typography>
    </View>
  );
};
