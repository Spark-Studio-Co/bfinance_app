import { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
import { useAuth } from '~/shared/contexts/AuthContext';
import { useErrorHandler } from '~/shared/hooks/useErrorHandler';
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
  const { wp, hp, ms } = useResponsive();
  const { sendEmailAuth, isSendingEmail } = useAuth();
  const { showError } = useErrorHandler();
  const [email, setEmail] = useState('');

  // Используем hook для отслеживания клавиатуры
  const keyboard = useAnimatedKeyboard();

  // Функция для пропуска авторизации и перехода на главный экран
  const handleSkipAuth = () => {
    (navigation as any).navigate('Main');
  };

  // Функция для отправки email для авторизации
  const handleEmailAuth = async () => {
    if (!email.trim()) {
      showError('Пожалуйста, введите email');
      return;
    }

    // // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Пожалуйста, введите корректный email');
      return;
    }

    try {
      // await sendEmailAuth(email);
      (navigation as any).navigate('EmailConfirmation', { email });
    } catch (error) {
      console.error('Email auth error:', error);
      showError('Не удалось отправить код подтверждения. Попробуйте еще раз.');
    }

    // navigation.navigate('Support' as never);
  };

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

        {/* Skip Button */}
        <View className="absolute right-6 top-16 z-10">
          <TouchableOpacity onPress={handleSkipAuth} className="rounded-full bg-black/50 px-4 py-2">
            <Text weight="medium" className="text-white" style={{ fontSize: 16 }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

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
            <Text weight="semibold" className="text-center text-white" style={{ fontSize: 24 }}>
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
              onPress={() => (navigation as any).navigate('TopUp')}
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
              style={{ fontSize: 13 }}>
              or
            </Text>

            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{ height: hp(5.9), marginTop: hp(1.5) }}
            />

            <Button
              onPress={handleEmailAuth}
              label="Continue"
              weight="semibold"
              variant="light"
              className="mt-3"
              style={{ height: 42 }}
              labelClassName="text-[#000000]"
              loading={isSendingEmail}
            />
          </View>
        </Animated.ScrollView>
      </View>
    </AuthLayout>
  );
};
