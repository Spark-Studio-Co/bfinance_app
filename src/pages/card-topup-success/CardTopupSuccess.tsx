import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '~/shared/ui';
import { useResponsive } from '~/shared/hooks/useResponsive';
import BigCheckMarkIcon from '~/shared/icons/BigCheckMarkIcon';
import { MainLayout } from '~/app/layouts/MainLayout';

import { useNavigation } from '@react-navigation/native';

export const CardTopupSuccess: React.FC = () => {
  const { s } = useResponsive();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main');
    }, 3000);
  }, []);

  return (
    <MainLayout
      isTitle
      title="Card topup"
      isBack
      onPrevStep={{ onPress: () => navigation.navigate('Main') }}>
      <View className="items-center justify-center px-6" style={{ marginTop: s(271.57) }}>
        <BigCheckMarkIcon />

        <Text weight="semibold" className="mt-3 text-center text-white" style={{ fontSize: s(20) }}>
          Success!
        </Text>

        <Text className="mt-1 max-w-[228px] text-center text-[#AAAAAA]" style={{ fontSize: s(17) }}>
          Top-up accepted for processing
        </Text>
      </View>
    </MainLayout>
  );
};
