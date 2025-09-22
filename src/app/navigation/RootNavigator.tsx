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
import {
  WithdrawalCryptoSelectionPage,
  WithdrawalNetworkSelectionPage,
  WithdrawalFormPage,
  WithdrawalConfirmationPage,
  WithdrawalSuccessPage,
} from '~/pages/withdrawal-pages';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor="#000000" />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={TabNavigatorWrapper} />
        <Stack.Screen
          name="History"
          component={TransactionHistoryScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetailsScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="TopUp"
          component={TopUpPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CardTopup"
          component={CardTopupPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="TopUpNetwork"
          component={TopUpNetworkPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="TopUpDetail"
          component={TopUpDetailPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="QRDeposit"
          component={QRDepositPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="WithdrawalCryptoSelection"
          component={WithdrawalCryptoSelectionPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="WithdrawalNetworkSelection"
          component={WithdrawalNetworkSelectionPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="WithdrawalForm"
          component={WithdrawalFormPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="WithdrawalConfirmation"
          component={WithdrawalConfirmationPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="WithdrawalSuccess"
          component={WithdrawalSuccessPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CardWithdrawal"
          component={CardWithdrawalPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CardWithdrawalSuccess"
          component={CardWithdrawalSuccessPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CardDetails"
          component={CardDetailsPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CardIssuanceDetails"
          component={CardIssuanceDetailsPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CardIssuance"
          component={CardIssuancePage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CardPayment"
          component={CardPaymentPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CardSuccess"
          component={CardSuccessPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Support"
          component={SupportPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="IdentityVerification"
          component={IdentityVerificationPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="PinCodeEnter"
          component={PinCodeEnterPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="PinCodeReEnter"
          component={PinCodeReEnterPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="PinCodeSuccess"
          component={PinCodeSuccessPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CardSettings"
          component={CardSettingsPage}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="CardTopupSuccess"
          component={CardTopupSuccess}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </>
  );
};
