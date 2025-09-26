import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { CurrencyPickCard } from '~/features/TopUp/CurrencyPickCard';
import { useTopUpCurrencies } from '~/shared/hooks/useApi';
import { LoadingState } from '~/shared/ui/LoadingState';
import { ErrorState } from '~/shared/ui/ErrorState';
import BitcoinIcon from '~/shared/icons/BitcoinIcon';
import DollarIcon from '~/shared/icons/CurrenciesIcons/DollarIcon';
import EthereumIcon from '~/shared/icons/EthereumIcon';
import TonIcon from '~/shared/icons/TonIcon';

// Функция для получения иконки валюты
const getCurrencyIcon = (code: string) => {
  switch (code.toUpperCase()) {
    case 'USD':
      return <DollarIcon />;
    case 'BTC':
      return <BitcoinIcon />;
    case 'ETH':
      return <EthereumIcon />;
    case 'TON':
      return <TonIcon />;
    default:
      return <DollarIcon />; // Дефолтная иконка
  }
};

export const TopUpPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { data: currenciesData, isLoading, error, refetch } = useTopUpCurrencies();

  const onPick = (currencyId: string, currencyCode: string) => {
    console.log('pick:', currencyId);
    // Переходим на страницу выбора сети для пополнения
    navigation.navigate('TopUpNetwork', {
      title: `Top up with ${currencyCode.toUpperCase()}`,
      currencyId,
    });
  };

  if (isLoading) {
    return (
      <MainLayout isTitle isBack title="Topup" isScroll>
        <LoadingState message="Loading currencies..." className="mt-20" />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout isTitle isBack title="Topup" isScroll>
        <ErrorState
          title="Failed to load currencies"
          message="Please check your connection and try again"
          onRetry={() => refetch()}
          className="mt-20"
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout isTitle isBack title="Topup" isScroll>
      {/* FIAT */}
      {currenciesData?.fiat && currenciesData.fiat.length > 0 && (
        <View className="mt-8">
          <Text className="mb-4 text-[13px] font-normal text-[#AAAAAA]">FIAT</Text>
          {currenciesData.fiat.map((item) => (
            <CurrencyPickCard
              key={item.id}
              icon={getCurrencyIcon(item.code)}
              title={item.name}
              subtitle={item.code}
              onPress={() => onPick(item.id, item.code)}
            />
          ))}
        </View>
      )}

      {/* CRYPTO */}
      {currenciesData?.crypto && currenciesData.crypto.length > 0 && (
        <View className="mt-4">
          <Text className="mb-4 text-[13px] font-normal text-[#AAAAAA]">CRYPTO</Text>
          {currenciesData.crypto.map((item) => (
            <CurrencyPickCard
              key={item.id}
              icon={getCurrencyIcon(item.code)}
              title={item.name}
              subtitle={item.code}
              onPress={() => onPick(item.id, item.code)}
            />
          ))}
        </View>
      )}

      {/* Fallback если нет данных */}
      {!currenciesData?.fiat?.length && !currenciesData?.crypto?.length && (
        <View className="mt-8">
          <Text className="text-center text-[#AAAAAA]">No currencies available</Text>
        </View>
      )}

      <View className="h-8" />
    </MainLayout>
  );
};
