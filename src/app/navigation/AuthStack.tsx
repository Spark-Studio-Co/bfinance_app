import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../shared/types/navigation';

//pages
import { StartPage } from '~/pages/start';
import { EmailConfirmationPage } from '~/pages/email-confirmation/EmailConfirmatinonPage';
import { SignUpPage } from '~/pages/sign-up/SignUpPage';
import { IdentityVerificationPage } from '~/pages/identity-verification/ui/IdentityVerificationPage';
import { IdentityVerificationInnerPage } from '~/pages/identity-verification-inner/IdentityVerificationInnerPage';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartPage} />
      <Stack.Screen name="EmailConfirmation" component={EmailConfirmationPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="IdentityVerification" component={IdentityVerificationPage} />
      <Stack.Screen name="IdentityVerificationInner" component={IdentityVerificationInnerPage} />
    </Stack.Navigator>
  );
}
