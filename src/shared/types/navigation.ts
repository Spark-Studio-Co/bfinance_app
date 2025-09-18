import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Auth: undefined;
  Main: { initialTab?: keyof TabParamList } | undefined;
  History: undefined;
  Services: undefined;
  TransactionDetails: { transactionId: string };
  Profile: undefined;
  TopUp: undefined;
  CardTopup: undefined;
  TopUpNetwork: { title?: string } | undefined;
  TopUpDetail: { title?: string; details?: TopUpDetails } | undefined;
  QRDeposit:
    | {
        currency?: string;
        network?: string;
        address?: string;
        minAmount?: string;
      }
    | undefined;
  Withdrawal: undefined;
  CardWithdrawal: undefined;
  CardWithdrawalSuccess: undefined;
  CardDetails: {
    cardId: number;
    cardNumber: string;
    balance: string;
    currency: string;
  };
  CardIssuanceDetails: {
    cardType: 'lite' | 'card';
    cardName: string;
  };
  CardIssuance: undefined;
  CardPayment: {
    cardType: 'lite' | 'card';
    cardName: string;
  };
  CardSuccess: undefined;
  CardTopupSuccess: undefined;
  Support: undefined;
  IdentityVerification: undefined;
  PinCode: { fromSettings?: boolean; cardNumber?: string };
  PinCodeEnter: undefined;
  PinCodeReEnter: undefined;
  PinCodeSuccess: undefined;
  CardSettings: { cardNumber: string };
};

export type TopUpDetails = Partial<
  Record<
    'currency' | 'name' | 'accountNumber' | 'accountType' | 'swift' | 'bankAddress' | 'reference',
    string
  >
>;

export type AuthStackParamList = {
  Start: undefined;
  EmailConfirmation: { email: string };
  ResetPassword: { token?: string };
  SignUp: undefined;
  IdentityVerification: undefined;
  IdentityVerificationInner: undefined;
  PinCode: { fromSettings?: boolean; cardNumber?: string };
  CurrencyPage: undefined;
  Support: undefined;
};

export type TabParamList = {
  Home: undefined;
  Finance: undefined;
  Budget: undefined;
  Cards: undefined;
  Services: undefined;
  Settings: undefined;
  History: undefined;
  TransactionDetail: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<TabParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
