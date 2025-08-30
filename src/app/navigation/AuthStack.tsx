import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../shared/types/navigation';

//pages
import { StartPage } from '~/pages/start';
import { EmailConfirmation } from '~/pages/email-confirmation/EmailConfirmatinon';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartPage} />
      <Stack.Screen name="EmailConfirmation" component={EmailConfirmation} />
    </Stack.Navigator>
  );
}
