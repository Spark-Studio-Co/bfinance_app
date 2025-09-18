import React from 'react';
import { View, ScrollView } from 'react-native';
import { CryptoCard } from '~/shared/ui';
import BitcoinIcon from '~/shared/icons/BitcoinIcon';
import EthereumIcon from '~/shared/icons/EthereumIcon';
import TonIcon from '~/shared/icons/TonIcon';

export interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
  icon: React.ReactNode;
}

export interface CryptoSelectionProps {
  selectedCrypto?: string;
  onCryptoSelect: (cryptoId: string) => void;
  className?: string;
}

const cryptoOptions: CryptoOption[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: <BitcoinIcon />,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: <EthereumIcon />,
  },
  {
    id: 'ton',
    name: 'The Open Network',
    symbol: 'TON',
    icon: <TonIcon />,
  },
  {
    id: 'bitcoin-2',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: <BitcoinIcon />,
  },
  {
    id: 'ethereum-2',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: <EthereumIcon />,
  },
  {
    id: 'ton-2',
    name: 'The Open Network',
    symbol: 'TON',
    icon: <TonIcon />,
  },
];

export const CryptoSelection: React.FC<CryptoSelectionProps> = ({
  selectedCrypto,
  onCryptoSelect,
  className = '',
}) => {
  return (
    <View className={className}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cryptoOptions.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            icon={crypto.icon}
            name={crypto.name}
            symbol={crypto.symbol}
            selected={selectedCrypto === crypto.id}
            onPress={() => onCryptoSelect(crypto.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
