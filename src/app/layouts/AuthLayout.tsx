import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '~/shared/ui/BackButton';
import { Text } from '~/shared/ui';

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
  const navigation = useNavigation();

  const content = (
    <View className={`flex-1 ${isNoPadding ? '' : 'px-[24px]'}`}>
      {isBack && (
        <TouchableOpacity
          className="mt-[24px] flex flex-row items-center gap-x-[24px]"
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text weight="semibold" className="text-white" style={{ fontSize: 20 }}>
            {title}
          </Text>
        </TouchableOpacity>
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
