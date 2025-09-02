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

export const StartPage = () => {
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation();
  const { wp, hp, ms, fs } = useResponsive(); // ← используем

  return (
    <AuthLayout isNoPadding isBottomShown={true}>
      <View className="flex-1" style={{ backgroundColor: 'black' }}>
        <Video
          ref={videoRef}
          source={heroVideo}
          style={StyleSheet.absoluteFillObject}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted
          pointerEvents="none"
        />

        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.35)' }]} />

        {/* было: className="mt-[70px]" */}
        <View className="w-full items-center justify-center" style={{ marginTop: hp(7) }}>
          <LogoIcon />
        </View>

        {/* было: h-[364px] px-[24px] py-[32px] rounded-[24px] */}
        <View
          className="mt-auto w-full rounded-tl-[24px] rounded-tr-[24px] border border-b-[1px]
                     border-[#00000026] bg-[#000000]"
          style={{
            height: hp(44), // ~44% высоты экрана вместо фиксированных 364
            paddingHorizontal: wp(6.4), // 24px от макета → относительное
            paddingVertical: hp(4), // 32px → относительное
            borderTopLeftRadius: ms(24),
            borderTopRightRadius: ms(24),
          }}>
          {/* было: text-[24px] */}
          <Text weight="semibold" className="text-center text-white" style={{ fontSize: fs(24) }}>
            Welcome!
          </Text>

          {/* Кнопки: лучше, чтобы ваш <Button> принимал проп style и прокидывал в корневой View */}
          <Button
            label="Continue with Google"
            weight="semibold"
            icon={<GoogleIcon />}
            variant="light"
            className="mt-8" // отступ можно оставить через Tailwind-скейл
            style={{ height: hp(5.2) }} // было: h-[42px]
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
            style={{ fontSize: fs(13) }} // было: text-[13px]
          >
            or
          </Text>

          <Input placeholder="Email" style={{ height: hp(5.9), marginTop: hp(1.5) }} />

          <Button
            onPress={() => navigation.navigate('EmailConfirmation' as never)}
            label="Continue"
            weight="semibold"
            variant="light"
            className="mt-3"
            style={{ height: hp(5.2) }}
            labelClassName="text-[#000000]"
          />
        </View>
      </View>
    </AuthLayout>
  );
};
