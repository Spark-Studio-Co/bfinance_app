import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '~/shared/ui';
import BigCheckMarkIcon from '~/shared/icons/BigCheckMarkIcon';
import { useWithdrawalStore } from '../../model/use-withdrawal-store';

export const SuccessStep: React.FC = () => {
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
