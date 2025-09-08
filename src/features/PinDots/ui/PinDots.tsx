import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { usePinCodeStore } from '~/pages/pin-code/model/use-pin-code-store';

export const PinDots = ({ className }: { className?: string }) => {
  const { pinDots } = usePinCodeStore();

  return (
    <View className={`flex-row items-center justify-center gap-x-[24px] ${className}`}>
      {pinDots.map((filled, index) => (
        <Animated.View
          key={index}
          className={`h-[13px] w-[13px] rounded-full  ${filled ? 'bg-[#00E675]' : 'bg-[#00E675]/10'}`}
          entering={FadeIn.delay(index * 100)}
        />
      ))}
    </View>
  );
};
