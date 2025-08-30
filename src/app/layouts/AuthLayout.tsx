import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-[#000000]" edges={['top']}>
      <View className="flex-1">{children}</View>
      <View style={{ height: insets.bottom, backgroundColor: '#0F0F0F' }} />
    </SafeAreaView>
  );
};
