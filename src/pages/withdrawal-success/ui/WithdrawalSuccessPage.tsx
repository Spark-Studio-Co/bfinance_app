import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text } from '~/shared/ui';
import BigCheckMarkIcon from '~/shared/icons/BigCheckMarkIcon';
import { useWithdrawalStore } from '~/pages/withdrawal/model/use-withdrawal-store';

export const WithdrawalSuccessPage: React.FC = () => {
  const navigation = useNavigation();
  const { reset } = useWithdrawalStore();

  useEffect(() => {
    // Устанавливаем таймер на 3 секунды для навигации на Home
    const timer = setTimeout(() => {
      reset();
      navigation.navigate('Main', { initialTab: 'Home' });
    }, 3000);

    // Очищаем таймер при размонтировании компонента
    return () => clearTimeout(timer);
  }, [navigation, reset]);

  const handleBack = () => {
    reset();
    navigation.navigate('Main', { initialTab: 'Home' });
  };

  return (
    <MainLayout
      isBack
      isTitle
      title="Withdrawal Complete"
      onPrevStep={{
        onPress: handleBack,
      }}>
      <View className="items-center justify-center px-6" style={{ marginTop: 271.57 }}>
        <BigCheckMarkIcon />

        <Text weight="semibold" className="mt-3 text-center text-white" style={{ fontSize: 20 }}>
          Success!
        </Text>

        <Text className="mt-1 max-w-[228px] text-center text-[#AAAAAA]" style={{ fontSize: 17 }}>
          Withdrawal accepted for processing
        </Text>
      </View>
    </MainLayout>
  );
};
