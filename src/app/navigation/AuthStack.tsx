import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../shared/types/navigation';
import { StartPage } from '~/pages/start';
import { AuthLayout } from '../layouts/AuthLayout';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartPage} />
    </Stack.Navigator>
  );
}
