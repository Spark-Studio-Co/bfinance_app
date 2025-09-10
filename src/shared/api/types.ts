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
