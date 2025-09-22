import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text, CryptoCard } from '~/shared/ui';
import {
  useWithdrawalStore,
  type NetworkData,
} from '~/pages/withdrawal/model/use-withdrawal-store';
import BitcoinIcon from '~/shared/icons/BitcoinIcon';
import EthereumIcon from '~/shared/icons/EthereumIcon';
import TonIcon from '~/shared/icons/TonIcon';

export const WithdrawalNetworkSelectionPage: React.FC = () => {
  const navigation = useNavigation();
  const { selectedCrypto, selectedNetwork, setSelectedNetwork } = useWithdrawalStore();

  const getNetworksForCrypto = () => {
    if (!selectedCrypto) return [];

    switch (selectedCrypto.symbol) {
      case 'BTC':
        return [
          {
            id: 'bitcoin-mainnet',
            name: 'Bitcoin',
            symbol: 'BTC',
            icon: <BitcoinIcon />,
          },
          {
            id: 'bitcoin-lightning',
            name: 'Lightning Network',
            symbol: 'BTC',
            icon: <BitcoinIcon />,
          },
        ];
      case 'ETH':
        return [
          {
            id: 'ethereum-mainnet',
            name: 'Ethereum',
            symbol: 'ETH',
            icon: <EthereumIcon />,
          },
          {
            id: 'ethereum-polygon',
            name: 'Polygon',
            symbol: 'ETH',
            icon: <EthereumIcon />,
          },
        ];
      case 'TON':
        return [
          {
            id: 'ton-mainnet',
            name: 'The Open Network',
            symbol: 'TON',
            icon: <TonIcon />,
          },
        ];
      default:
        return [];
    }
  };

  const handleNetworkSelect = (networkId: string) => {
    const networks = getNetworksForCrypto();
    const network = networks.find((n) => n.id === networkId);

    if (network) {
      const networkData: NetworkData = {
        id: network.id,
        name: network.name,
        symbol: network.symbol,
      };
      setSelectedNetwork(networkData);
      setTimeout(() => {
        navigation.navigate('WithdrawalForm');
      }, 100);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const networks = getNetworksForCrypto();

  return (
    <MainLayout
      isBack
      isTitle
      title="Select Network"
      onPrevStep={{
        onPress: handleBack,
      }}>
      <View>
        <Text className="mb-2 mt-[24px] text-[#AAAAAA]" style={{ fontSize: 13 }}>
          SELECT NETWORK
        </Text>

        {networks.map((network) => (
          <CryptoCard
            key={network.id}
            icon={network.icon}
            name={network.name}
            symbol={network.symbol}
            selected={selectedNetwork?.id === network.id}
            onPress={() => handleNetworkSelect(network.id)}
          />
        ))}
      </View>
    </MainLayout>
  );
};
