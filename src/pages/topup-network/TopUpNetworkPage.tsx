import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { CurrencyPickCard } from '~/features/TopUp/CurrencyPickCard';
import BitcoinIcon from '~/shared/icons/BitcoinIcon';
import EthereumIcon from '~/shared/icons/EthereumIcon';
import TonIcon from '~/shared/icons/TonIcon';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/shared/types/navigation';

export const TopUpNetworkPage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const crypto = [
    { id: 'btc-1', title: 'Bitcoin', code: 'BTC', icon: <BitcoinIcon /> },
    { id: 'eth-1', title: 'Ethereum', code: 'ETH', icon: <EthereumIcon /> },
    { id: 'ton-1', title: 'The Open Network', code: 'TON', icon: <TonIcon /> },
  ];

  const onPick = (id: string) => {
    const picked = crypto.find((c) => c.id === id);
    if (!picked) return;

    // Для всех криптовалют переходим на QR экран
    let address = '';
    let minAmount = '';

    switch (picked.code) {
      case 'BTC':
        address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
        minAmount = '0.001 BTC';
        break;
      case 'ETH':
        address = '0x742f35Cc6481C7f41c3fa0F1aC2b0A2F9F745B1d';
        minAmount = '0.01 ETH';
        break;
      case 'TON':
        address = 'UQCj5nBQIRMMfgUuHtuep7AZ5Id64RJShCs0LLYw1vDPALYW';
        minAmount = '0.1 TON';
        break;
      default:
        address = 'Unknown address';
        minAmount = '0.001';
    }

    navigation.navigate('QRDeposit', {
      currency: picked.code,
      network: picked.title,
      address,
      minAmount,
    });
  };

  return (
    <MainLayout isTitle isBack title="USDT" isScroll>
      {/* FIAT */}
      <View className="mt-8">
        <Text className="mb-4 text-[13px] font-normal text-[#AAAAAA]">SELECT NETWORK</Text>
        {crypto.map((item) => (
          <CurrencyPickCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            subtitle={item.code}
            onPress={() => onPick(item.id)}
          />
        ))}
      </View>
    </MainLayout>
  );
};
