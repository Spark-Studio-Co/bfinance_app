import React from 'react';
import { View } from 'react-native';
import { Text } from '~/shared/ui';
import { CryptoSelection } from '~/features/CryptoSelection/CryptoSelection';
import { useWithdrawalStore, type CryptoData } from '../../model/use-withdrawal-store';

export const CryptoSelectionStep: React.FC = () => {
  const { selectedCrypto, setSelectedCrypto, nextStep } = useWithdrawalStore();

  const handleCryptoSelect = (cryptoId: string) => {
    const cryptoData: CryptoData = {
      id: cryptoId,
      name: getCryptoName(cryptoId),
      symbol: getCryptoSymbol(cryptoId),
    };
    setSelectedCrypto(cryptoData);
    setTimeout(() => {
      nextStep();
    }, 100);
  };

  const getCryptoName = (id: string): string => {
    switch (id) {
      case 'bitcoin':
        return 'Bitcoin';
      case 'ethereum':
        return 'Ethereum';
      case 'ton':
        return 'The Open Network';
      default:
        return 'Unknown';
    }
  };

  const getCryptoSymbol = (id: string): string => {
    switch (id) {
      case 'bitcoin':
        return 'BTC';
      case 'ethereum':
        return 'ETH';
      case 'ton':
        return 'TON';
      default:
        return '';
    }
  };

  return (
    <View>
      <Text className="mb-2 mt-[24px] text-[#AAAAAA]" style={{ fontSize: 13 }}>
        CRYPTO
      </Text>
      <CryptoSelection selectedCrypto={selectedCrypto?.id} onCryptoSelect={handleCryptoSelect} />
    </View>
  );
};
