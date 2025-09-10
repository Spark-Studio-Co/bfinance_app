import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { CurrencyPickCard } from '~/features/TopUp/CurrencyPickCard';
import BitcoinIcon from '~/shared/icons/BitcoinIcon';
import EthereumIcon from '~/shared/icons/EthereumIcon';
import TonIcon from '~/shared/icons/TonIcon';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '~/shared/types/navigation';

export const TopUpNetworkPage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const crypto = [
    { id: 'btc-1', title: 'Bitcoin', code: 'BTC', icon: <BitcoinIcon /> },
    { id: 'eth-1', title: 'Ethereum', code: 'ETH', icon: <EthereumIcon /> },
    { id: 'ton-1', title: 'The Open Network', code: 'TON', icon: <TonIcon /> },
  ];

  const onPick = (id: string) => {
    const picked = crypto.find((c) => c.id === id);
    if (!picked) return;

    navigation.navigate('TopUpDetail', {
      title: picked.title,
      details: {
        currency: picked.code,
      },
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
