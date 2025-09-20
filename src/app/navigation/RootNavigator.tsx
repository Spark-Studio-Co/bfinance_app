import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigatorWrapper } from './TabNavigatorWrapper';
import { AuthStack } from './AuthStack';
import type { RootStackParamList } from '../../shared/types/navigation';
import { TransactionHistoryScreen } from '~/pages/history/HistoryPage';
import { TransactionDetailsScreen } from '~/pages/transaction-detail/TransactionDetailsPage';
import { ProfileScreen } from '~/pages/profile/ProfilePage';
import { TopUpPage } from '~/pages/topup/TopUpPage';
import { TopUpNetworkPage } from '~/pages/topup-network/TopUpNetworkPage';
import { TopUpDetailPage } from '~/pages/topup-detail/TopUpDetailPage';
import { WithdrawalPage } from '~/pages/withdrawal/ui/WithdrawalPage';
import { CardWithdrawalPage, CardWithdrawalSuccessPage } from '~/pages/card-withdrawal';
import { QRDepositPage } from '~/pages/qr-deposit';
import { CardDetailsPage } from '~/pages/card-details';
import { CardTopupPage } from '~/pages/card-topup/CardTopupPage';
import { CardIssuanceDetailsPage } from '~/pages/card-details/CardIssuanceDetailsPage';
import { CardIssuancePage } from '~/pages/card-issuance';
import { CardPaymentPage } from '~/pages/card-payment';
import { CardSuccessPage } from '~/pages/card-success';
import { SupportPage } from '~/pages/support/SupportPage';
import { IdentityVerificationPage } from '~/pages/identity-verification/ui/IdentityVerificationPage';
import { CardSettingsPage } from '~/pages/card-settings';
import { CardTopupSuccess } from '~/pages/card-topup-success/CardTopupSuccess';
import { PinCodeEnterPage } from '~/pages/pin-code-enter';
import { PinCodeReEnterPage } from '~/pages/pin-code-re-enter';
import { PinCodeSuccessPage } from '~/pages/pin-code-success';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor="#000000" />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={TabNavigatorWrapper} />
        <Stack.Screen name="History" component={TransactionHistoryScreen} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="TopUp" component={TopUpPage} />
        <Stack.Screen name="CardTopup" component={CardTopupPage} />
        <Stack.Screen name="TopUpNetwork" component={TopUpNetworkPage} />
        <Stack.Screen name="TopUpDetail" component={TopUpDetailPage} />
        <Stack.Screen name="QRDeposit" component={QRDepositPage} />
        <Stack.Screen name="Withdrawal" component={WithdrawalPage} />
        <Stack.Screen name="CardWithdrawal" component={CardWithdrawalPage} />
        <Stack.Screen name="CardWithdrawalSuccess" component={CardWithdrawalSuccessPage} />
        <Stack.Screen name="CardDetails" component={CardDetailsPage} />
        <Stack.Screen name="CardIssuanceDetails" component={CardIssuanceDetailsPage} />
        <Stack.Screen name="CardIssuance" component={CardIssuancePage} />
        <Stack.Screen name="CardPayment" component={CardPaymentPage} />
        <Stack.Screen name="CardSuccess" component={CardSuccessPage} />
        <Stack.Screen name="Support" component={SupportPage} />
        <Stack.Screen name="IdentityVerification" component={IdentityVerificationPage} />
        <Stack.Screen name="PinCodeEnter" component={PinCodeEnterPage} />
        <Stack.Screen name="PinCodeReEnter" component={PinCodeReEnterPage} />
        <Stack.Screen name="PinCodeSuccess" component={PinCodeSuccessPage} />
        <Stack.Screen name="CardSettings" component={CardSettingsPage} />
        <Stack.Screen name="CardTopupSuccess" component={CardTopupSuccess} />
      </Stack.Navigator>
    </>
  );
};
