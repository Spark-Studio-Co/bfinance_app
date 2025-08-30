import { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { AuthLayout } from '~/app/layouts/AuthLayout';
import LogoIcon from '~/shared/icons/LogoIcon';
import { Text } from '~/shared/ui';
import { Button } from '~/shared/ui/Button';
import GoogleIcon from '~/shared/icons/GoogleIcon';
import AppleIcon from '~/shared/icons/AppleIcon';
import { Input } from '~/shared/ui/Input';
// если используешь декларацию типов .mp4 — можно так:
import heroVideo from '../../../assets/start_video.mp4';

import { useNavigation } from '@react-navigation/native';

export const StartPage = () => {
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation();

  return (
    <AuthLayout>
      {/* Контейнер-слой: видео = background */}
      <View className="flex-1" style={{ backgroundColor: 'black' }}>
        {/* Фоновое видео на заднем плане */}
        <Video
          ref={videoRef}
          source={heroVideo} // или: source={require("~/assets/start_video.mp4")}
          style={StyleSheet.absoluteFillObject} // растянуть на весь экран
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted
          pointerEvents="none" // не перехватывает нажатия
        />
        {/* Небольшое затемнение, чтобы текст читался */}
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.35)' }]} />

        {/* ДАЛЬШЕ — ВЕСЬ ТВОЙ КОНТЕНТ ПОВЕРХ */}
        <View className="mt-[20px] w-full items-center justify-center px-4">
          <LogoIcon />
        </View>

        <View className="mt-auto h-[364px] w-full rounded-tl-[24px] rounded-tr-[24px] border border-b-[1px] border-[#00000026] bg-[#000000] px-[24px] py-[32px]">
          <Text weight="semibold" className="text-center text-[24px] text-white">
            Welcome
          </Text>

          <Button
            label="Continue with Google"
            className="mt-[32px] h-[42px]"
            weight="semibold"
            labelClassName="text-[#000000] text-[15px]"
            icon={<GoogleIcon />}
            variant="light"
          />

          <Button
            label="Continue with Apple"
            className="mt-[12px] h-[42px]"
            weight="semibold"
            labelClassName="text-white text-[15px]"
            icon={<AppleIcon />}
            variant="dark"
          />

          <Text weight="semibold" className="mt-[12px] text-center text-[13px] text-[#FFFFFF99]">
            or
          </Text>

          <Input placeholder="Email" className="mt-[12px] h-[48px]" />

          <Button
            onPress={() => navigation.navigate('EmailConfirmation' as never)}
            label="Continue"
            className="mt-[12px] h-[42px]"
            weight="semibold"
            labelClassName="text-[#000000] text-[15px]"
            variant="light"
          />
        </View>
      </View>
    </AuthLayout>
  );
};
