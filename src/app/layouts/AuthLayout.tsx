import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BackButton } from '~/shared/ui/BackButton';
import { Text } from '~/shared/ui';
import { useResponsive } from '~/shared/hooks';

export const AuthLayout = ({
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
  const insets = useSafeAreaInsets();
  const { s } = useResponsive();

  const content = (
    <View className={`flex-1 ${isNoPadding ? '' : 'px-[24px]'}`}>
      {isBack && (
        <View className="mt-[24px] flex flex-row items-center gap-x-[24px]">
          <BackButton
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Text weight="semibold" className="text-white" style={{ fontSize: s(20) }}>
            {title}
          </Text>
        </View>
      )}
      {children}
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-[#000000]"
      edges={isBottomShown ? ['left', 'right'] : ['top', 'left', 'right', 'bottom']}>
      {enableKeyboardAvoiding ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {content}
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        content
      )}
      {isBottomShown && <View style={{ height: insets.bottom, backgroundColor: '#0F0F0F' }} />}
    </SafeAreaView>
  );
};
