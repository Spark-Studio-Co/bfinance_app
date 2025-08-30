import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

export type AuthStackParamList = {
  Start: undefined;
  EmailConfirmation: { email: string };
  ResetPassword: { token?: string };
  SignUp: undefined;
  IdentityVerification: undefined;
};

export type TabParamList = {
  Home: undefined;
  Finance: undefined;
  Budget: undefined;
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
