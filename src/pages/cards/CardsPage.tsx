import type { TabScreenProps } from '../../shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { View, ScrollView } from 'react-native';
import { CardItem } from '~/features/CardItem/CardItem';

type CardsPageProps = TabScreenProps<'Cards'>;

export function CardsPage({}: CardsPageProps) {
  // Mock data for cards
  const cards = [
    {
      id: 1,
      cardNumber: '4532123456789012',
      cardHolder: 'John Doe',
      expiryDate: '12/27',
      cardType: 'visa' as const,
      balance: '$2,450.00',
      currency: 'USD',
      isActive: true,
    },
    {
      id: 2,
      cardNumber: '5555123456789012',
      cardHolder: 'John Doe',
      expiryDate: '08/26',
      cardType: 'mastercard' as const,
      balance: '$1,230.50',
      currency: 'EUR',
      isActive: false,
    },
    {
      id: 3,
      cardNumber: '4000123456789012',
      cardHolder: 'John Doe',
      expiryDate: '03/28',
      cardType: 'visa' as const,
      balance: '$850.25',
      currency: 'GBP',
      isActive: false,
    },
  ];

  const handleCardPress = (cardId: number) => {
    console.log('Card pressed:', cardId);
    // Add navigation or other logic here
  };

  return (
    <MainLayout isTitle title="Cards">
      {cards.map((card) => (
        <CardItem
          key={card.id}
          cardNumber={card.cardNumber}
          cardHolder={card.cardHolder}
          expiryDate={card.expiryDate}
          cardType={card.cardType}
          balance={card.balance}
          currency={card.currency}
          isActive={card.isActive}
          onPress={() => handleCardPress(card.id)}
        />
      ))}
    </MainLayout>
  );
}
