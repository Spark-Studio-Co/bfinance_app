import React from 'react';
import { View } from 'react-native';
import { ItemTab } from '../../shared/ui/ItemTab';
import { useResponsive } from '~/shared/hooks';
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
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    name: 'Bitcoin',
    value: '0.5 BTC',
    title: 'Bitcoin',
  },
  {
    id: '4',
    isFiat: false,
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    name: 'Ethereum',
    value: '10.2 ETH',
    title: 'Ethereum',
  },
];

export const ItemsList: React.FC<ItemsListProps> = ({ title, isFiat, isCrypto }) => {
  const { s } = useResponsive();

  const titleContainer = {
    fontSize: s(13),
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
        <Text className="mb-[8px] mt-[16px] px-4 text-[#AAAAAA]" style={titleContainer}>
          {title}
        </Text>
      )}
      {itemsToShow.map((item) => (
        <View key={item.id} className="mb-[10px]">
          <ItemTab
            isFiat={item.isFiat}
            currency={'currency' in item ? item.currency : undefined}
            icon={'icon' in item ? item.icon : undefined}
            name={item.name}
            value={item.value}
            title={item.title}
          />
        </View>
      ))}
    </View>
  );
};
