import React from 'react';
import { View } from 'react-native';
import { Text } from '~/shared/ui';
import BigCheckMarkIcon from '~/shared/icons/BigCheckMarkIcon';

export const SuccessStep: React.FC = () => {
  return (
    <View className="items-center justify-center px-6" style={{ marginTop: 271.57 }}>
      <BigCheckMarkIcon />

      <Text weight="semibold" className="mt-3 text-center text-white" style={{ fontSize: 20 }}>
        Success!
      </Text>

      <Text className="mt-1 max-w-[228px] text-center text-[#AAAAAA]" style={{ fontSize: 17 }}>
        Withdrawal accepted for processing
      </Text>
    </View>
  );
};
