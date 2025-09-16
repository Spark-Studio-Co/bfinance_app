import { MainLayout } from '~/app/layouts/MainLayout';
import { useNavigation } from '@react-navigation/native';
import { usePinCodeStore, PinCodeStep } from '~/pages/pin-code/model/use-pin-code-store';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useEffect } from 'react';

import { PinDots } from '~/features/PinDots';
import { NumberPad } from '~/features/NumberPad';
import { Text } from '~/shared/ui';
import { useResponsive } from '~/shared/hooks';

export const PinCodeEnterPage = () => {
  const navigation = useNavigation();
  const { error, currentPin, reset } = usePinCodeStore();
  const { s } = useResponsive();

  useEffect(() => {
    if (currentPin.length === 4) {
      console.log('PinCodeEnterPage: PIN completed, saving first pin and navigating to re-enter');
      // Сохраняем первый пин в сторе
      const store = usePinCodeStore.getState();
      store.setFirstPin(currentPin);

      setTimeout(() => {
        navigation.navigate('PinCodeReEnter');
      }, 300);

      setTimeout(() => {
        reset();
      }, 270);
    }
  }, [currentPin, navigation]);

  return (
    <MainLayout isTitle isBack title="PIN code setup">
      <View className=" items-center" style={{ paddingTop: s(106) }}>
        <Text weight="semibold" className="text-white" style={{ fontSize: 19 }}>
          Enter new PIN code
        </Text>

        <PinDots className="mb-[52px] mt-[20px]" />

        {error && (
          <Animated.View entering={FadeIn}>
            <Text className="mt-5 text-center text-sm text-red-500">{error}</Text>
          </Animated.View>
        )}
        <NumberPad />
      </View>
    </MainLayout>
  );
};
