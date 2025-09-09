import React from 'react';
import { View } from 'react-native';
import { Text } from '~/shared/ui';
import { useResponsive } from '~/shared/hooks/useResponsive';

export const SuccessStep: React.FC = () => {
  const { s } = useResponsive();

  const successIcon = (
    <View
      className="mb-8 items-center justify-center rounded-full bg-[#00D4AA]"
      style={{
        width: s(80),
        height: s(80),
      }}>
      <View
        style={{
          width: s(20),
          height: s(10),
          borderLeftWidth: s(3),
          borderBottomWidth: s(3),
          borderLeftColor: 'white',
          borderBottomColor: 'white',
          transform: [{ rotate: '-45deg' }],
          marginTop: s(-5),
          marginLeft: s(2),
        }}
      />
    </View>
  );

  return (
    <View className="flex-1 items-center justify-center px-6">
      {successIcon}

      <Text className="mb-4 text-center text-2xl font-bold text-white" style={{ fontSize: s(24) }}>
        Success!
      </Text>

      <Text className="text-center text-base text-[#78797E]" style={{ fontSize: s(16) }}>
        Withdrawal accepted for processing
      </Text>
    </View>
  );
};
