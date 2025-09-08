import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BackButton, Text } from '~/shared/ui';

export const MainLayout = ({
  children,
  isTitle,
  isIcon,
  isNoPadding,
  isBottomShown = false,
  title,
  icon,
  enableKeyboardAvoiding = true,
  isBack,
}: {
  children: React.ReactNode;
  isTitle?: boolean;
  isIcon?: boolean;
  isNoPadding?: boolean;
  isBottomShown?: boolean;
  title?: string;
  icon?: React.ReactNode;
  enableKeyboardAvoiding?: boolean;
  isBack?: boolean;
}) => {
  const content = (
    <View className={`flex-1 ${isNoPadding ? '' : 'px-[24px]'}`}>
      {isTitle && (
        <View className="mt-[24px] flex w-full flex-row items-center gap-x-[24px]">
          {isBack && <BackButton />}
          <Text weight="semibold" className="text-[20px] text-white">
            {title}
          </Text>
          {isIcon && icon && <View>{icon}</View>}
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
