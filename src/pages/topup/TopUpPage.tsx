import React from 'react';
import { View, Text } from 'react-native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { CurrencyPickCard } from '~/features/TopUp/CurrencyPickCard';
import BitcoinIcon from '~/shared/icons/BitcoinIcon';
import DollarIcon from '~/shared/icons/CurrenciesIcons/DollarIcon';
import EthereumIcon from '~/shared/icons/EthereumIcon';
import TonIcon from '~/shared/icons/TonIcon';

export const TopUpPage: React.FC = () => {
  const fiat = [{ id: 'usd', title: 'Dollars', code: 'USD', icon: <DollarIcon /> }];
  const crypto = [
    { id: 'btc-1', title: 'Bitcoin', code: 'BTC', icon: <BitcoinIcon /> },
    { id: 'eth-1', title: 'Ethereum', code: 'ETH', icon: <EthereumIcon /> },
    { id: 'ton-1', title: 'The Open Network', code: 'TON', icon: <TonIcon /> },
    { id: 'btc-2', title: 'Bitcoin', code: 'BTC', icon: <BitcoinIcon /> },
    { id: 'eth-2', title: 'Ethereum', code: 'ETH', icon: <EthereumIcon /> },
    { id: 'ton-2', title: 'The Open Network', code: 'TON', icon: <TonIcon /> },
  ];

  const onPick = (id: string) => {
    console.log('pick:', id);
  };

  return (
    <MainLayout isTitle isBack title="Topup" isScroll>
      {/* FIAT */}
      <View className="mt-8">
        <Text className="mb-4 text-[13px] font-normal text-[#AAAAAA]">FIAT</Text>
        {fiat.map((item) => (
          <CurrencyPickCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            subtitle={item.code}
            onPress={() => onPick(item.id)}
          />
        ))}
      </View>

      {/* CRYPTO */}
      <View className="mt-4">
        <Text className="mb-4 text-[13px] font-normal text-[#AAAAAA]">CRYPTO</Text>
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

      <View className="h-8" />
    </MainLayout>
  );
};
