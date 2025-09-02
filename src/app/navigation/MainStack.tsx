import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import type { RootStackParamList } from '../../shared/types/navigation';
import { TransactionHistoryScreen } from '~/pages/history/HistoryPage';
import { TransactionDetailsScreen } from '~/pages/transaction-detail/TransactionDetailsPage';
import { ProfileScreen } from '~/pages/profile/ProfilePage';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="History" component={TransactionHistoryScreen} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
