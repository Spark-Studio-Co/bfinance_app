import React from 'react';
import { View } from 'react-native';
import { ItemTab } from '../../shared/ui/ItemTab';
import Text from '../../shared/ui/Text';

interface ItemsListProps {
  title?: string;
  isFiat?: boolean;
  isCrypto?: boolean;
}

const fiatItems = [
  {
    id: '1',
    isFiat: true,
    currency: '$',
    name: 'Dollars',
    value: '10,000 USD',
    title: 'US Dollar',
  },
  {
    id: '2',
    isFiat: true,
    currency: '€',
    name: 'Euros',
    value: '10,000 EUR',
    title: 'Euro',
  },
];

const cryptoItems = [
  {
    id: '3',
    isFiat: false,
    icon: require('../../../assets/bitcoin.png'),
    name: 'Bitcoin',
    cryptoAmount: '0.5 BTC',
    value: '$10,000',
    title: 'Bitcoin',
  },
  {
    id: '4',
    isFiat: false,
    icon: require('../../../assets/bitcoin.png'), // временно используем bitcoin для всех
    name: 'Ethereum',
    cryptoAmount: '10.2 ETH',
    value: '$10,000',
    title: 'Ethereum',
  },
  {
    id: '5',
    isFiat: false,
    icon: require('../../../assets/bitcoin.png'),
    name: 'Cardano',
    cryptoAmount: '1,500 ADA',
    value: '$10,000',
    title: 'Cardano',
  },
  {
    id: '6',
    isFiat: false,
    icon: require('../../../assets/bitcoin.png'),
    name: 'Solana',
    cryptoAmount: '25.8 SOL',
    value: '$10,000',
    title: 'Solana',
  },
  {
    id: '7',
    isFiat: false,
    icon: require('../../../assets/bitcoin.png'),
    name: 'Polygon',
    cryptoAmount: '800 MATIC',
    value: '$10,000',
    title: 'Polygon',
  },
  {
    id: '8',
    isFiat: false,
    icon: require('../../../assets/bitcoin.png'),
    name: 'Chainlink',
    cryptoAmount: '45.2 LINK',
    value: '$10,000',
    title: 'Chainlink',
  },
  {
    id: '9',
    isFiat: false,
    icon: require('../../../assets/bitcoin.png'),
    name: 'Polkadot',
    cryptoAmount: '120.5 DOT',
    value: '$10,000',
    title: 'Polkadot',
  },
];

export const ItemsList: React.FC<ItemsListProps> = ({ title, isFiat, isCrypto }) => {
  const titleContainer = {
    fontSize: 13,
  };

  // Determine which items to show based on props
  const itemsToShow = [];
  if (isFiat) {
    itemsToShow.push(...fiatItems);
  }
  if (isCrypto) {
    itemsToShow.push(...cryptoItems);
  }

  // If no specific type is requested, show fiat items by default
  if (!isFiat && !isCrypto) {
    itemsToShow.push(...fiatItems);
  }

  return (
    <View className="flex flex-col">
      {title && (
        <Text className="mb-[8px] mt-[16px] text-[#AAAAAA]" weight="regular" style={titleContainer}>
          {title}
        </Text>
      )}
      {itemsToShow.map((item) => (
        <View key={item.id} className="mb-[13px]">
          <ItemTab
            isFiat={item.isFiat}
            currency={'currency' in item ? item.currency : undefined}
            icon={'icon' in item ? item.icon : undefined}
            name={item.name}
            value={item.value}
            cryptoAmount={'cryptoAmount' in item ? item.cryptoAmount : undefined}
            title={item.title}
            isCrypto={isCrypto}
          />
        </View>
      ))}
    </View>
  );
};
