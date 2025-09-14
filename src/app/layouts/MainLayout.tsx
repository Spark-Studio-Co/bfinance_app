import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
  isGradient,
  gradientColor = '161616',
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
  isGradient?: boolean;
  gradientColor?: string;
}) => {
  const navigation = useNavigation();

  // Убираем # если он есть в начале строки
  const cleanGradientColor = gradientColor?.startsWith('#')
    ? gradientColor.slice(1)
    : gradientColor;
  const gradientColors: [string, string] = [`#${cleanGradientColor}99`, '#00000000']; // 60% opacity to transparent

  const content = (
    <View className="flex-1">
      {isTitle && (
        <View
          className={`mb-[12px] mt-[24px] flex w-full flex-row items-center gap-x-[16px] ${isNoPadding ? 'px-[24px]' : ''}`}>
          {isBack && (
            <View className={isBack && isNoPadding ? '' : 'pl-[24px]'}>
              <BackButton onPress={onPrevStep?.onPress ?? (() => navigation.goBack())} />
            </View>
          )}

          {/* Иконка слева */}
          {isIcon && icon && iconPosition === 'before' && (
            <View className="flex-row items-center">{icon}</View>
          )}

          <TouchableOpacity
            onPress={isBack ? (onPrevStep?.onPress ?? (() => navigation.goBack())) : undefined}
            disabled={!isBack}
            activeOpacity={isBack ? 0.7 : 1}>
            <Text
              weight="semibold"
              style={{
                fontSize: 20,
                color: 'white',
                paddingLeft: !isBack && !isNoPadding ? 24 : 0,
              }}>
              {title}
            </Text>
          </TouchableOpacity>

          {/* Иконка справа */}
          {isIcon && icon && iconPosition === 'after' && (
            <View className="flex-row items-center">{icon}</View>
          )}
        </View>
      )}
      <View className={`flex-1 ${isNoPadding ? '' : 'px-[24px]'}`}>{children}</View>
    </View>
  );

  const backgroundContent = isGradient ? (
    <View className="flex-1">
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.46154 }}
        style={{
          position: 'absolute',
          top: -5,
          left: 0,
          right: 0,
          height: 398,
        }}
      />
      {content}
    </View>
  ) : (
    content
  );

  return (
    <SafeAreaView className="flex-1 bg-[#000000]" edges={['top', 'left', 'right']}>
      {isScroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          keyboardShouldPersistTaps="handled">
          {backgroundContent}
        </ScrollView>
      ) : (
        <View className="flex-1">{backgroundContent}</View>
      )}
    </SafeAreaView>
  );
};
