import Animated from 'react-native-reanimated';
import BigCheckMarkIcon from '~/shared/icons/BigCheckMarkIcon';

import { useEffect } from 'react';
import { usePinCodeStore } from '~/pages/pin-code/model/use-pin-code-store';
import { useNavigation } from '@react-navigation/native';

import { Text } from '~/shared/ui';

export const SuccessScreen = () => {
  const navigation = useNavigation();
  const { reset } = usePinCodeStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      reset();
      navigation.goBack();
    }, 2000);

    return () => clearTimeout(timer);
  }, [reset]);

  return (
    <Animated.View className="flex-1 items-center justify-center">
      <BigCheckMarkIcon />

      <Text weight="semibold" className="mb-2 mt-3 text-[20px] text-white">
        Success!
      </Text>
      <Text className="text-center text-[17px] leading-[22px] text-[#AAAAAA]">
        Withdrawal accepted for{'\n'}processing
      </Text>
    </Animated.View>
  );
};
