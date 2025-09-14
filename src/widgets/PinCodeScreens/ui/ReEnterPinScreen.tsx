import { View } from 'react-native';
import Animated, { FadeIn, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { NumberPad } from '~/features/NumberPad';
import { Text } from '~/shared/ui';
import { PinDots } from '~/features/PinDots';

import { usePinCodeStore } from '~/pages/pin-code/model/use-pin-code-store';
import { useResponsive } from '~/shared/hooks';

export const ReEnterPinScreen = () => {
  const { error } = usePinCodeStore();
  const { s } = useResponsive();

  return (
    <Animated.View className="flex-1" entering={SlideInRight} exiting={SlideOutLeft}>
      <View className="flex-1 items-center" style={{ paddingTop: s(106) }}>
        <Text weight="semibold" className="text-white" style={{ fontSize: s(19) }}>
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
    </Animated.View>
  );
};
