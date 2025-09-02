import React from 'react';
import { View } from 'react-native';
import { BackButton } from '~/shared/ui';
import { Text } from '~/shared/ui/Text';

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
    <View className="mt-[24px] flex flex-row items-center gap-x-[24px] px-[24px]">
      <BackButton />
      <Text weight="semibold" className="text-[20px] text-white">
        {title}
      </Text>
    </View>
  );
};
