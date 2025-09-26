// Типы для запросов авторизации
export interface EmailAuthRequest {
  email: string;
}

export interface EmailCodeRequest {
  email: string;
  confirmationCode: string;
}

export interface EmailCodeResponse {
  token: string;
  user: User;
}

// Типы для регистрации
export interface RegistrationRequest {
  firstName: string;
  lastName: string;
}

export interface RegistrationResponse {
  user: User;
}

// Типы для пользователя
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
}

// Типы для общего баланса пользователя
export interface UserBalance {
  totalBalance: number;
  currency: string;
  lastUpdated: string;
}

export interface UserBalanceResponse {
  balance: UserBalance;
}

// Типы для кошельков
export interface Wallet {
  id: string;
  currency: string;
  balance: number;
  type: 'fiat' | 'crypto';
  isActive: boolean;
}

export interface WalletsResponse {
  wallets: Wallet[];
}

// Типы для транзакций
export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  currency: string;
  description: string;
  fromWallet?: string;
  toWallet?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Типы для валют пополнения
export interface TopUpCurrency {
  id: string;
  name: string;
  code: string;
  type: 'fiat' | 'crypto';
  icon?: string;
  isActive: boolean;
  networks?: TopUpNetwork[];
}

export interface TopUpNetwork {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  minAmount?: number;
  maxAmount?: number;
  fee?: number;
}

export interface TopUpCurrenciesResponse {
  fiat: TopUpCurrency[];
  crypto: TopUpCurrency[];
}

// Типы для карт
export interface Card {
  id: string;
  cardName: string;
  cardNumber: string;
  cardHolder: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  balance: string | number;
  currency: string;
  isActive: boolean;
  isBlocked?: boolean;
  expiryDate?: string;
  cvv?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardType {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  fees?: {
    issuance?: number;
    monthly?: number;
    transaction?: number;
    atm?: number;
  };
}

export interface CardsResponse {
  cards: Card[];
}

// Общие типы для ответов API
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
