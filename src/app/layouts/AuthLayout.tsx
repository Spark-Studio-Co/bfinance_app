import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { BackButton } from '~/shared/ui/BackButton';
import { Text } from '~/shared/ui';

export const AuthLayout = ({
  children,
  isBack,
  title,
}: {
  children: React.ReactNode;
  isBack?: boolean;
  title?: string;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-[#000000]" edges={['top']}>
      <View className="flex-1 px-4">
        {isBack && (
          <View className="mt-[24px] flex flex-row items-center gap-x-[24px]">
            <BackButton />
            <Text weight="semibold" className="text-[20px] text-white">
              {title}
            </Text>
          </View>
        )}
        {children}
      </View>
      <View style={{ height: insets.bottom, backgroundColor: '#0F0F0F' }} />
    </SafeAreaView>
  );
};
