import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import type { RootStackParamList } from '../../shared/types/navigation';
import { TransactionHistoryScreen } from '~/pages/history/HistoryPage';
import { ProfileScreen } from '~/pages/profile/ProfilePage';
import { ServicesPage } from '~/pages/services/ServicesPage';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MainStack() {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="History" component={TransactionHistoryScreen} />
      <Stack.Screen name="Services" component={ServicesPage} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
