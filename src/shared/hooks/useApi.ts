import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/services/auth';
import { walletService } from '../api/services/wallet';
import { transactionService } from '../api/services/transaction';
import type {
  EmailAuthRequest,
  EmailCodeRequest,
  EmailCodeResponse,
  RegistrationRequest,
  RegistrationResponse,
  User,
  Wallet,
  Transaction,
  TransactionsResponse,
  WalletsResponse,
} from '../api/types';

// Query Keys
export const QueryKeys = {
  USER: ['user'] as const,
  WALLETS: ['wallets'] as const,
  TRANSACTIONS: ['transactions'] as const,
  TRANSACTION: (id: string) => ['transaction', id] as const,
} as const;

// Auth hooks
export const useSendEmailAuth = () => {
  return useMutation({
    mutationFn: (email: string) => authService.sendEmailAuth(email),
  });
};

export const useConfirmEmailCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, confirmationCode }: { email: string; confirmationCode: string }) =>
      authService.confirmEmailCode(email, confirmationCode),
    onSuccess: () => {
      // Инвалидируем пользовательские данные после успешной авторизации
      queryClient.invalidateQueries({ queryKey: QueryKeys.USER });
    },
  });
};

export const useCompleteRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ firstName, lastName }: { firstName: string; lastName: string }) =>
      authService.completeRegistration(firstName, lastName),
    onSuccess: () => {
      // Инвалидируем пользовательские данные после регистрации
      queryClient.invalidateQueries({ queryKey: QueryKeys.USER });
    },
  });
};

export const useValidateToken = () => {
  return useMutation({
    mutationFn: () => authService.validateToken(),
  });
};

// User hooks
export const useUser = (enabled = true) => {
  return useQuery<User>({
    queryKey: QueryKeys.USER,
    queryFn: () => authService.getCurrentUser(),
    enabled,
    staleTime: 10 * 60 * 1000, // Пользовательские данные свежие 10 минут
  });
};

// Wallet hooks
export const useWallets = (enabled = true) => {
  return useQuery<Wallet[]>({
    queryKey: QueryKeys.WALLETS,
    queryFn: () => walletService.getWallets(),
    enabled,
    staleTime: 5 * 60 * 1000, // Кошельки свежие 5 минут
  });
};

// Transaction hooks
export const useTransactions = (
  params: {
    page?: number;
    limit?: number;
    type?: 'income' | 'expense' | 'transfer';
    currency?: string;
    walletId?: string;
  } = {},
  enabled = true
) => {
  return useQuery<TransactionsResponse>({
    queryKey: [...QueryKeys.TRANSACTIONS, params],
    queryFn: () => transactionService.getTransactions(params),
    enabled,
    staleTime: 2 * 60 * 1000, // Транзакции свежие 2 минуты
  });
};

export const useTransaction = (id: string, enabled = true) => {
  return useQuery<Transaction>({
    queryKey: QueryKeys.TRANSACTION(id),
    queryFn: () => transactionService.getTransaction(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // Детали транзакции свежие 5 минут
  });
};

// Mutation hooks для обновления данных
export const useRefreshUserData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Принудительное обновление всех пользовательских данных
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QueryKeys.USER }),
        queryClient.invalidateQueries({ queryKey: QueryKeys.WALLETS }),
        queryClient.invalidateQueries({ queryKey: QueryKeys.TRANSACTIONS }),
      ]);
    },
  });
};

// Logout hook
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authService.logout();
      // Очищаем все данные из кэша при выходе
      queryClient.clear();
    },
  });
};
