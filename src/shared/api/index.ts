// Экспорт клиента и конфигурации
export { apiClient } from './client';
export { default as API_CONFIG } from './config';

// Экспорт сервисов
export { authService } from './services/auth';
export { walletService } from './services/wallet';
export { transactionService } from './services/transaction';

// Экспорт утилит для работы с хранилищем
export {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getUserData,
  setUserData,
  removeUserData,
  clearAllData,
} from './storage';

// Экспорт типов
export type {
  EmailAuthRequest,
  EmailCodeRequest,
  EmailCodeResponse,
  RegistrationRequest,
  RegistrationResponse,
  User,
  Wallet,
  WalletsResponse,
  Transaction,
  TransactionsResponse,
  ApiError,
  ApiResponse,
} from './types';
