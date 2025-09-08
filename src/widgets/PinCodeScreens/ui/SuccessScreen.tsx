import Animated from 'react-native-reanimated';
import { useResponsive } from '~/shared/hooks';
import BigCheckMarkIcon from '~/shared/icons/BigCheckMarkIcon';

import { Text } from '~/shared/ui';

export const SuccessScreen = () => {
  const { s } = useResponsive();

  return (
    <Animated.View className="flex-1 items-center justify-center" style={{ marginTop: s(271.57) }}>
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
