import React from 'react';
import { View } from 'react-native';

import { Text, BackButton } from '~/shared/ui';

interface PinCodeHeaderProps {
  title: string;
  showUserIcon?: boolean;
  userIconText?: string;
}

export const PinCodeHeader = ({
  title,
  showUserIcon = false,
  userIconText = 'D',
}: PinCodeHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between pb-10 pt-5">
      <BackButton />
      <Text className="text-lg font-semibold text-white">{title}</Text>
      {showUserIcon ? (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-orange-500">
          <Text className="text-base font-semibold text-white">{userIconText}</Text>
        </View>
      ) : (
        <View className="h-6 w-6" />
      )}
    </View>
  );
};
