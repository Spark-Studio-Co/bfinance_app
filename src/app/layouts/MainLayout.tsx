import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BackButton } from '~/shared/ui/BackButton';
import { Text } from '~/shared/ui';

export const MainLayout = ({
  children,
  isBack,
  isNoPadding,
  isBottomShown = false,
  title,
  enableKeyboardAvoiding = true,
}: {
  children: React.ReactNode;
  isBack?: boolean;
  isNoPadding?: boolean;
  isBottomShown?: boolean;
  title?: string;
  enableKeyboardAvoiding?: boolean;
}) => {
  const content = (
    <View className={`flex-1 ${isNoPadding ? '' : 'px-[24px]'}`}>
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
  );

  return (
    <SafeAreaView className="flex-1 bg-[#000000]" edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        keyboardShouldPersistTaps="handled">
        {content}
      </ScrollView>
    </SafeAreaView>
  );
};
