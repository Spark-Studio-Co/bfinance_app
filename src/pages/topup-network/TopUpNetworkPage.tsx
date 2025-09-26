import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { CurrencyPickCard } from '~/features/TopUp/CurrencyPickCard';
import { useTopUpNetworks, useTopUpCurrency } from '~/shared/hooks/useApi';
import { LoadingState, ErrorState } from '~/shared/ui';
import BitcoinIcon from '~/shared/icons/BitcoinIcon';
import EthereumIcon from '~/shared/icons/EthereumIcon';
import TonIcon from '~/shared/icons/TonIcon';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/shared/types/navigation';

// Функция для получения иконки сети на основе кода сети и валюты
const getNetworkIcon = (networkCode: string, currencyCode?: string) => {
  // Сначала пробуем по коду сети
  switch (networkCode.toUpperCase()) {
    case 'BTC':
    case 'BITCOIN':
      return <BitcoinIcon />;
    case 'ETH':
    case 'ETHEREUM':
      return <EthereumIcon />;
    case 'TON':
      return <TonIcon />;
    case 'TRX':
    case 'TRON':
      return <BitcoinIcon />; // Используем Bitcoin иконку как placeholder для TRON
    case 'BSC':
    case 'BNB':
      return <BitcoinIcon />; // Используем Bitcoin иконку как placeholder для BSC
    case 'MATIC':
    case 'POLYGON':
      return <EthereumIcon />; // Используем Ethereum иконку для Polygon (схожие экосистемы)
    default:
      // Если не найдено по коду сети, пробуем по коду валюты
      if (currencyCode) {
        switch (currencyCode.toUpperCase()) {
          case 'BTC':
            return <BitcoinIcon />;
          case 'ETH':
            return <EthereumIcon />;
          case 'TON':
            return <TonIcon />;
          case 'USDT':
          case 'USDC':
            return <BitcoinIcon />; // Placeholder для стейблкоинов
          default:
            return <BitcoinIcon />; // Дефолтная иконка
        }
      }
      return <BitcoinIcon />; // Дефолтная иконка
  }
};

type TopUpNetworkPageProps = NativeStackScreenProps<RootStackParamList, 'TopUpNetwork'>;

export const TopUpNetworkPage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<TopUpNetworkPageProps['route']>();

  const { currencyId, title } = route.params || {};

  // Загружаем данные о валюте и её сетях
  const {
    data: currency,
    isLoading: currencyLoading,
    error: currencyError,
  } = useTopUpCurrency(currencyId || '', !!currencyId);
  const {
    data: networks,
    isLoading: networksLoading,
    error: networksError,
    refetch,
  } = useTopUpNetworks(currencyId || '', !!currencyId);

  const isLoading = currencyLoading || networksLoading;
  const error = currencyError || networksError;

  const onPick = (networkId: string) => {
    if (!networks || !currency) return;

    const selectedNetwork = networks.find((network) => network.id === networkId);
    if (!selectedNetwork) return;

    // Генерируем тестовый адрес (в реальном приложении должен приходить от API)
    let address = '';
    let minAmount = '';

    switch (currency.code.toUpperCase()) {
      case 'BTC':
        address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
        minAmount = `${selectedNetwork.minAmount || 0.001} ${currency.code}`;
        break;
      case 'ETH':
        address = '0x742f35Cc6481C7f41c3fa0F1aC2b0A2F9F745B1d';
        minAmount = `${selectedNetwork.minAmount || 0.01} ${currency.code}`;
        break;
      case 'TON':
        address = 'UQCj5nBQIRMMfgUuHtuep7AZ5Id64RJShCs0LLYw1vDPALYW';
        minAmount = `${selectedNetwork.minAmount || 0.1} ${currency.code}`;
        break;
      case 'USDT':
        if (selectedNetwork.code === 'ETH') {
          address = '0x742f35Cc6481C7f41c3fa0F1aC2b0A2F9F745B1d';
        } else if (selectedNetwork.code === 'TRX') {
          address = 'TRX9QNWUTQshX3CLNi6Ly3KZhA7KUaQr1x';
        } else if (selectedNetwork.code === 'BSC') {
          address = '0x742f35Cc6481C7f41c3fa0F1aC2b0A2F9F745B1d';
        }
        minAmount = `${selectedNetwork.minAmount || 1} ${currency.code}`;
        break;
      default:
        address = 'Unknown address';
        minAmount = `${selectedNetwork.minAmount || 0.001} ${currency.code}`;
    }

    navigation.navigate('QRDeposit', {
      currency: currency.code,
      network: selectedNetwork.name,
      address,
      minAmount,
    });
  };

  if (isLoading) {
    return (
      <MainLayout isTitle isBack title={title || 'Select Network'} isScroll>
        <LoadingState message="Loading networks..." className="mt-20" />
      </MainLayout>
    );
  }

  if (error || !currencyId) {
    return (
      <MainLayout isTitle isBack title={title || 'Select Network'} isScroll>
        <ErrorState
          title="Failed to load networks"
          message="Please check your connection and try again"
          onRetry={() => refetch()}
          className="mt-20"
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout isTitle isBack title={currency?.code || title || 'Select Network'} isScroll>
      <View className="mt-8">
        <Text className="mb-4 text-[13px] font-normal text-[#AAAAAA]">SELECT NETWORK</Text>

        {networks && networks.length > 0 ? (
          networks
            .filter((network) => network.isActive) // Показываем только активные сети
            .map((network) => (
              <CurrencyPickCard
                key={network.id}
                icon={getNetworkIcon(network.code, currency?.code)}
                title={network.name}
                subtitle={`${network.code}${network.fee ? ` • Fee: ${network.fee}${currency?.type === 'crypto' ? ' ' + currency.code : '%'}` : ''}`}
                onPress={() => onPick(network.id)}
              />
            ))
        ) : (
          <View className="mt-8">
            <Text className="text-center text-[#AAAAAA]">
              No networks available for this currency
            </Text>
          </View>
        )}
      </View>

      <View className="h-8" />
    </MainLayout>
  );
};
