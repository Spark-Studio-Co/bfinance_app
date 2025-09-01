import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import ChevronLeft from '~/shared/icons/ChevronLeft';

interface HeaderProps {
  title: string;
  showTitle?: boolean;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showTitle = false, onBackPress }) => {
  return (
    <TouchableOpacity onPress={onBackPress} className="mb-8 flex flex-row items-center px-4 pt-24">
      <TouchableOpacity onPress={onBackPress} className="mr-6">
        <Text className="text-white">
          <ChevronLeft />
        </Text>
      </TouchableOpacity>

      {showTitle && <Text className="text-[20px] font-semibold text-white">{title}</Text>}
    </TouchableOpacity>
  );
};
