import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';
import { BackButton, Text } from '~/shared/ui';
import { useNavigation } from '@react-navigation/native';

export const MainLayout = ({
  children,
  isTitle,
  isIcon,
  isNoPadding,
  title,
  icon,
  isBack,
  isScroll = false,
  onPrevStep,
  iconPosition = 'after',
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
  isScroll?: boolean;
  onPrevStep?: { onPress: () => void };
  iconPosition?: 'before' | 'after';
}) => {
  const navigation = useNavigation();

  const content = (
    <View className={`flex-1 ${isNoPadding ? '' : 'px-[24px]'}`}>
      {isTitle && (
        <View className="mt-[24px] flex w-full flex-row items-center gap-x-[16px]">
          {isBack && <BackButton onPress={onPrevStep?.onPress ?? (() => navigation.goBack())} />}

          {/* Иконка слева */}
          {isIcon && icon && iconPosition === 'before' && (
            <View className="flex-row items-center">{icon}</View>
          )}

          <Text weight="semibold" className="text-[20px] text-white">
            {title}
          </Text>

          {/* Иконка справа */}
          {isIcon && icon && iconPosition === 'after' && (
            <View className="flex-row items-center">{icon}</View>
          )}
        </View>
      )}
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#000000]" edges={['top', 'left', 'right']}>
      {isScroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : (
        <View className="flex-1">{content}</View>
      )}
    </SafeAreaView>
  );
};
