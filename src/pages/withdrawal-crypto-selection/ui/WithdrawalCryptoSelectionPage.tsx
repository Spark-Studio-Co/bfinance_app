import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text } from '~/shared/ui';
import { CryptoSelection } from '~/features/CryptoSelection/CryptoSelection';
import { useWithdrawalStore, type CryptoData } from '~/pages/withdrawal/model/use-withdrawal-store';

export const WithdrawalCryptoSelectionPage: React.FC = () => {
  const navigation = useNavigation();
  const { selectedCrypto, setSelectedCrypto } = useWithdrawalStore();

  const handleCryptoSelect = (cryptoId: string) => {
    const cryptoData: CryptoData = {
      id: cryptoId,
      name: getCryptoName(cryptoId),
      symbol: getCryptoSymbol(cryptoId),
    };
    setSelectedCrypto(cryptoData);
    setTimeout(() => {
      navigation.navigate('WithdrawalNetworkSelection');
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

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <MainLayout
      isBack
      isTitle
      title="Select Currency"
      onPrevStep={{
        onPress: handleBack,
      }}>
      <View>
        <Text className="mb-2 mt-[24px] text-[#AAAAAA]" style={{ fontSize: 13 }}>
          Choose a digital currency for withdrawal
        </Text>
        <CryptoSelection selectedCrypto={selectedCrypto?.id} onCryptoSelect={handleCryptoSelect} />
      </View>
    </MainLayout>
  );
};
