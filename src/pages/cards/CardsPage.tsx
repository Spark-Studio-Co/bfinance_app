import type { TabScreenProps } from '../../shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { CardItem } from '~/features/CardItem/CardItem';
import { EmptyState } from '~/shared/ui/EmptyState';
import { Text } from '~/shared/ui';
import PlusIcon from '~/shared/icons/PlusIcon';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/shared/types/navigation';
import { useCards } from '~/shared/hooks/useApi';

type CardsPageProps = TabScreenProps<'Cards'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function CardsPage({}: CardsPageProps) {
  const navigation = useNavigation<NavigationProp>();

  // Fetch cards from API
  const { data: cards = [], isLoading, error } = useCards();

  const handleCardPress = (cardId: string) => {
    const card = cards.find((c) => c.id === cardId);
    if (card) {
      navigation.navigate('CardDetails', {
        cardId: parseInt(card.id), // Convert string to number for navigation
        cardNumber: card.cardNumber,
        balance: typeof card.balance === 'string' ? card.balance : card.balance.toString(),
        currency: card.currency,
      });
    }
  };

  const handleIssueCard = () => {
    navigation.navigate('CardIssuance');
  };

  // Show loading state
  if (isLoading) {
    return (
      <MainLayout isTitle title="Cards">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#00E675" />
          <Text className="mt-4 text-[#AAAAAA]">Loading cards...</Text>
        </View>
      </MainLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <MainLayout isTitle title="Cards">
        <View className="flex-1 items-center justify-center">
          <Text className="mb-4 text-center text-red-500">
            Failed to load cards: {error.message}
          </Text>
          <TouchableOpacity
            onPress={() => window.location.reload()}
            className="rounded-lg bg-[#00E675] px-4 py-2">
            <Text className="font-semibold text-black">Retry</Text>
          </TouchableOpacity>
        </View>
      </MainLayout>
    );
  }

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
              balance={typeof card.balance === 'string' ? card.balance : card.balance.toString()}
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
