import type { TabScreenProps } from '../../shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { ScrollView, TouchableOpacity } from 'react-native';
import { CardItem } from '~/features/CardItem/CardItem';
import { EmptyState } from '~/shared/ui/EmptyState';
import PlusIcon from '~/shared/icons/PlusIcon';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/shared/types/navigation';

type CardsPageProps = TabScreenProps<'Cards'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function CardsPage({}: CardsPageProps) {
  const navigation = useNavigation<NavigationProp>();

  // Mock data for cards - set to empty array to show empty state
  // const cards: any[] = [];
  // /*
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
    const card = cards.find((c) => c.id === cardId);
    if (card) {
      navigation.navigate('CardDetails', {
        cardId: card.id,
        cardNumber: card.cardNumber,
        balance: card.balance,
        currency: card.currency,
      });
    }
  };

  const handleIssueCard = () => {
    navigation.navigate('CardIssuance');
  };

  return (
    <MainLayout
      isTitle
      title="Cards"
      isIcon
      icon={
        cards.length > 0 && (
          <TouchableOpacity onPress={handleIssueCard} activeOpacity={0.7}>
            <PlusIcon />
          </TouchableOpacity>
        )
      }>
      {cards.length === 0 ? (
        <EmptyState
          title="Nothing here :("
          description="Issue your card and start paying with crypto today"
          buttonText="Issue card now"
          onButtonPress={handleIssueCard}
        />
      ) : (
        <ScrollView
          className="flex-1 "
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
      )}
    </MainLayout>
  );
}
