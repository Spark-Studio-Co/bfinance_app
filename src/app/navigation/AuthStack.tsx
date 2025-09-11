import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../shared/types/navigation';

//pages
import { StartPage } from '~/pages/start';
import { EmailConfirmationPage } from '~/pages/email-confirmation/EmailConfirmatinonPage';
import { SignUpPage } from '~/pages/sign-up/SignUpPage';
import { IdentityVerificationPage } from '~/pages/identity-verification/ui/IdentityVerificationPage';
import { IdentityVerificationInnerPage } from '~/pages/identity-verification-inner/IdentityVerificationInnerPage';
import { PinCodePage } from '~/pages/pin-code';
import { WithdrawalPage } from '~/pages/withdrawal/ui/WithdrawalPage';
import { TopUpPage } from '~/pages/topup/TopUpPage';
import { TopUpDetailPage } from '~/pages/topup-detail/TopUpDetailPage';
import { TopUpNetworkPage } from '~/pages/topup-network/TopUpNetworkPage';
import { SupportPage } from '~/pages/support/SupportPage';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartPage} />
      <Stack.Screen name="EmailConfirmation" component={EmailConfirmationPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="IdentityVerification" component={IdentityVerificationPage} />
      <Stack.Screen name="IdentityVerificationInner" component={IdentityVerificationInnerPage} />
      <Stack.Screen name="PinCode" component={PinCodePage} />
      <Stack.Screen name="Withdrawal" component={WithdrawalPage} />
      <Stack.Screen name="TopUpNetwork" component={TopUpNetworkPage} />
      <Stack.Screen name="TopUpDetail" component={TopUpDetailPage} />
      <Stack.Screen name="TopUp" component={TopUpPage} />
      <Stack.Screen name="Support" component={SupportPage} />
    </Stack.Navigator>
  );
}
