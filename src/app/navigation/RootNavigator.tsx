import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { AuthStack } from './AuthStack';
import type { RootStackParamList } from '../../shared/types/navigation';
import { TransactionHistoryScreen } from '~/pages/history/HistoryPage';
import { TransactionDetailsScreen } from '~/pages/transaction-detail/TransactionDetailsPage';
import { ProfileScreen } from '~/pages/profile/ProfilePage';
import { TopUpPage } from '~/pages/topup/TopUpPage';
import { TopUpNetworkPage } from '~/pages/topup-network/TopUpNetworkPage';
import { TopUpDetailPage } from '~/pages/topup-detail/TopUpDetailPage';
import { WithdrawalPage } from '~/pages/withdrawal/ui/WithdrawalPage';
import { QRDepositPage } from '~/pages/qr-deposit';
import { CardDetailsPage } from '~/pages/card-details';
import { SupportPage } from '~/pages/support/SupportPage';
import { IdentityVerificationPage } from '~/pages/identity-verification';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <>
      <StatusBar backgroundColor="#000000" />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="History" component={TransactionHistoryScreen} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="TopUp" component={TopUpPage} />
        <Stack.Screen name="TopUpNetwork" component={TopUpNetworkPage} />
        <Stack.Screen name="TopUpDetail" component={TopUpDetailPage} />
        <Stack.Screen name="QRDeposit" component={QRDepositPage} />
        <Stack.Screen name="Withdrawal" component={WithdrawalPage} />
        <Stack.Screen name="CardDetails" component={CardDetailsPage} />
        <Stack.Screen name="Support" component={SupportPage} />
        <Stack.Screen name="IdentityVerification" component={IdentityVerificationPage} />
      </Stack.Navigator>
    </>
  );
};
