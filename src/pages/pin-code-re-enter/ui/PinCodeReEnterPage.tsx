import { MainLayout } from '~/app/layouts/MainLayout';
import { useNavigation } from '@react-navigation/native';
import { usePinCodeStore, PinCodeStep } from '~/pages/pin-code/model/use-pin-code-store';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { NumberPad } from '~/features/NumberPad';
import { Text } from '~/shared/ui';
import { PinDots } from '~/features/PinDots';

import { useResponsive } from '~/shared/hooks';

export const PinCodeReEnterPage = () => {
  const { s } = useResponsive();
  const navigation = useNavigation();
  const { currentPin, error } = usePinCodeStore();

  useEffect(() => {
    if (currentPin.length === 4) {
      console.log('PinCodeEnterPage: PIN completed, saving first pin and navigating to re-enter');
      const store = usePinCodeStore.getState();
      store.setFirstPin(currentPin);

      setTimeout(() => {
        navigation.navigate('PinCodeSuccess');
      }, 300);
    }
  }, [currentPin, navigation]);

  const handleBack = () => {
    console.log('PinCodeReEnterPage: Going back to enter page');
    navigation.goBack();
  };

  return (
    <MainLayout
      isTitle
      title="PIN code setup"
      onPrevStep={{
        onPress: handleBack,
      }}
      isBack>
      <View className="flex-1 items-center" style={{ paddingTop: s(106) }}>
        <Text weight="semibold" className="text-white" style={{ fontSize: 19 }}>
          Re-enter new PIN code
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
