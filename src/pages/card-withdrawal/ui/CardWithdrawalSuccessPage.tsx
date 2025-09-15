import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/shared/types/navigation';
import { useResponsive } from '~/shared/hooks';
import { Text } from '~/shared/ui';
import { MainLayout } from '~/app/layouts/MainLayout';
import BigCheckMarkIcon from '~/shared/icons/BigCheckMarkIcon';

export const CardWithdrawalSuccessPage = () => {
  const { s } = useResponsive();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main', { initialTab: 'Home' });
    }, 3000);
  }, []);

  return (
    <MainLayout
      isTitle
      title="Withdraw from card"
      isBack
      onPrevStep={{ onPress: () => navigation.navigate('Main') }}>
      <View className="items-center justify-center px-6" style={{ marginTop: s(271.57) }}>
        <BigCheckMarkIcon />

        <Text weight="semibold" className="mt-3 text-center text-white" style={{ fontSize: s(20) }}>
          Success!
        </Text>

        <Text className="mt-1 max-w-[228px] text-center text-[#AAAAAA]" style={{ fontSize: s(17) }}>
          Withdrawal accepted for processing
        </Text>
      </View>
    </MainLayout>
  );
};
