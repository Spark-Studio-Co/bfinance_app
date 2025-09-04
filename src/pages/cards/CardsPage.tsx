import type { TabScreenProps } from '../../shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { View, ScrollView } from 'react-native';
import { CardItem } from '~/features/CardItem/CardItem';
import PlusIcon from '~/shared/icons/PlusIcon';

type CardsPageProps = TabScreenProps<'Cards'>;

export function CardsPage({}: CardsPageProps) {
  // Mock data for cards
  const cards = [
    {
      id: 1,
      cardName: 'Business Card',
      cardNumber: '4532123456789012',
      cardHolder: 'John Doe',

      cardType: 'visa' as const,
      balance: '2,450.00',
      currency: 'USD',
      isActive: true,
    },
    {
      id: 2,
      cardName: 'Personal Card',
      cardNumber: '5555123456789012',
      cardHolder: 'John Doe',
      cardType: 'mastercard' as const,
      balance: '1,230.50',
      currency: 'EUR',
      isActive: false,
    },
    {
      id: 3,
      cardName: 'Travel Card',
      cardNumber: '4000123456789012',
      cardHolder: 'John Doe',
      cardType: 'visa' as const,
      balance: '850.25',
      currency: 'GBP',
      isActive: false,
    },
  ];

  const handleCardPress = (cardId: number) => {
    console.log('Card pressed:', cardId);
    // Add navigation or other logic here
  };

  return (
    <MainLayout isTitle title="Cards" isIcon icon={<PlusIcon />}>
      <ScrollView
        className="flex-1 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}>
        {cards.map((card) => (
          <CardItem
            key={card.id}
            cardName={card.cardName}
            cardNumber={card.cardNumber}
            cardType={card.cardType}
            balance={card.balance}
            currency={card.currency}
            isActive={card.isActive}
            onPress={() => handleCardPress(card.id)}
          />
        ))}
      </ScrollView>
    </MainLayout>
  );
}
