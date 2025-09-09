import { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { AuthLayout } from '~/app/layouts/AuthLayout';
import LogoIcon from '~/shared/icons/LogoIcon';
import GoogleIcon from '~/shared/icons/GoogleIcon';
import AppleIcon from '~/shared/icons/AppleIcon';
import { Text } from '~/shared/ui';
import { Button } from '~/shared/ui/Button';
import { Input } from '~/shared/ui/Input';
import heroVideo from '../../../assets/start_video.mp4';
import { useResponsive } from '~/shared/hooks/useResponsive';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
} from 'react-native-reanimated';

export const StartPage = () => {
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation();
  const { wp, hp, ms, fs } = useResponsive();

  // Используем hook для отслеживания клавиатуры
  const keyboard = useAnimatedKeyboard();

  // Анимированный стиль для контейнера
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      keyboard.height.value,
      [0, 300], // От 0 до примерной высоты клавиатуры
      [0, -keyboard.height.value * 0.6], // Плавно поднимаем контент
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          translateY: withSpring(translateY, {
            damping: 20,
            stiffness: 90,
            mass: 0.8,
          }),
        },
      ],
    };
  });

  return (
    <AuthLayout isNoPadding isBottomShown={true} enableKeyboardAvoiding={false}>
      <View className="flex-1" style={{ backgroundColor: 'black' }}>
        <Video
          ref={videoRef}
          source={heroVideo}
          style={[
            StyleSheet.absoluteFillObject,
            { transform: [{ translateY: -hp(5) }] }, // move video 5% screen height upward
          ]}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted
          pointerEvents="none"
        />

        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.35)' }]} />

        {/* Logo */}
        <View className="w-full items-center justify-center" style={{ marginTop: hp(7) }}>
          <LogoIcon />
        </View>

        {/* Content Container */}
        <Animated.ScrollView
          style={[{ flex: 1 }, animatedStyle]}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          bounces={false}>
          <View
            className="w-full rounded-tl-[24px] rounded-tr-[24px] border border-b-[1px] border-[#00000026] bg-[#000000]"
            style={{
              minHeight: hp(44),
              paddingHorizontal: wp(6.4),
              paddingVertical: hp(4),
              borderTopLeftRadius: ms(24),
              borderTopRightRadius: ms(24),
            }}>
            <Text weight="semibold" className="text-center text-white" style={{ fontSize: fs(24) }}>
              Welcome!
            </Text>

            <Button
              label="Continue with Google"
              weight="semibold"
              icon={<GoogleIcon />}
              variant="light"
              className="mt-8"
              style={{ height: hp(5.2) }}
              labelClassName="text-[#000000]"
            />

            <Button
              label="Continue with Apple"
              weight="semibold"
              icon={<AppleIcon />}
              variant="dark"
              className="mt-3"
              style={{ height: hp(5.2) }}
              labelClassName="text-white"
            />

            <Text
              weight="semibold"
              className="mt-3 text-center text-[#FFFFFF99]"
              style={{ fontSize: fs(13) }}>
              or
            </Text>

            <Input placeholder="Email" style={{ height: hp(5.9), marginTop: hp(1.5) }} />

            <Button
              onPress={() => navigation.navigate('Withdrawal' as never)}
              label="Continue"
              weight="semibold"
              variant="light"
              className="mt-3"
              style={{ height: hp(5.2) }}
              labelClassName="text-[#000000]"
            />
          </View>
        </Animated.ScrollView>
      </View>
    </AuthLayout>
  );
};
