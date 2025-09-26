import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/services/auth';
import { walletService } from '../api/services/wallet';
import { transactionService } from '../api/services/transaction';
import { topUpService } from '../api/services/topup';
import { cardService } from '../api/services/card';
import type {
  EmailAuthRequest,
  EmailCodeRequest,
  EmailCodeResponse,
  RegistrationRequest,
  RegistrationResponse,
  User,
  UserBalance,
  UserBalanceResponse,
  Wallet,
  Transaction,
  TransactionsResponse,
  WalletsResponse,
  TopUpCurrenciesResponse,
  TopUpCurrency,
  TopUpNetwork,
  Card,
  CardType,
  CardsResponse,
} from '../api/types';

// Query Keys
export const QueryKeys = {
  USER: ['user'] as const,
  USER_BALANCE: ['user', 'balance'] as const,
  WALLETS: ['wallets'] as const,
  TRANSACTIONS: ['transactions'] as const,
  TRANSACTION: (id: string) => ['transaction', id] as const,
  CARDS: ['cards'] as const,
  CARD: (id: string) => ['card', id] as const,
  CARD_TYPES: ['card', 'types'] as const,
  TOPUP_CURRENCIES: ['topup', 'currencies'] as const,
  TOPUP_CURRENCY: (id: string) => ['topup', 'currency', id] as const,
  TOPUP_NETWORKS: (currencyId: string) => ['topup', 'networks', currencyId] as const,
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

export const useUserBalance = (enabled = true) => {
  return useQuery<UserBalance>({
    queryKey: QueryKeys.USER_BALANCE,
    queryFn: () => authService.getUserBalance(),
    enabled,
    staleTime: 5 * 60 * 1000, // Баланс свежий 5 минут
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
        queryClient.invalidateQueries({ queryKey: QueryKeys.USER_BALANCE }),
        queryClient.invalidateQueries({ queryKey: QueryKeys.WALLETS }),
        queryClient.invalidateQueries({ queryKey: QueryKeys.TRANSACTIONS }),
      ]);
    },
  });
};

// TopUp hooks
export const useTopUpCurrencies = (enabled = true) => {
  return useQuery<TopUpCurrenciesResponse>({
    queryKey: QueryKeys.TOPUP_CURRENCIES,
    queryFn: () => topUpService.getCurrencies(),
    enabled,
    staleTime: 10 * 60 * 1000, // Валюты свежие 10 минут
  });
};

export const useTopUpCurrency = (currencyId: string, enabled = true) => {
  return useQuery<TopUpCurrency>({
    queryKey: QueryKeys.TOPUP_CURRENCY(currencyId),
    queryFn: () => topUpService.getCurrency(currencyId),
    enabled: enabled && !!currencyId,
    staleTime: 10 * 60 * 1000, // Данные валюты свежие 10 минут
  });
};

export const useTopUpNetworks = (currencyId: string, enabled = true) => {
  return useQuery<TopUpNetwork[]>({
    queryKey: QueryKeys.TOPUP_NETWORKS(currencyId),
    queryFn: () => topUpService.getNetworks(currencyId),
    enabled: enabled && !!currencyId,
    staleTime: 10 * 60 * 1000, // Сети свежие 10 минут
  });
};

export const useTopUpInfo = (currencyId: string, networkId: string, enabled = true) => {
  return useQuery({
    queryKey: ['topup', 'info', currencyId, networkId],
    queryFn: () => topUpService.getTopUpInfo(currencyId, networkId),
    enabled: enabled && !!currencyId && !!networkId,
    staleTime: 2 * 60 * 1000, // Информация для пополнения свежая 2 минуты
  });
};

export const useCreateTopUpRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      currencyId: string;
      networkId?: string;
      amount: number;
      walletId: string;
    }) => topUpService.createTopUpRequest(data),
    onSuccess: () => {
      // Обновляем данные кошельков, транзакций и баланса после создания запроса
      queryClient.invalidateQueries({ queryKey: QueryKeys.USER_BALANCE });
      queryClient.invalidateQueries({ queryKey: QueryKeys.WALLETS });
      queryClient.invalidateQueries({ queryKey: QueryKeys.TRANSACTIONS });
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

// Card hooks
export const useCards = (enabled = true) => {
  return useQuery<Card[]>({
    queryKey: QueryKeys.CARDS,
    queryFn: () => cardService.getCards(),
    enabled,
    staleTime: 5 * 60 * 1000, // Карты свежие 5 минут
  });
};

export const useCard = (cardId: string, enabled = true) => {
  return useQuery<Card>({
    queryKey: QueryKeys.CARD(cardId),
    queryFn: () => cardService.getCard(cardId),
    enabled: enabled && !!cardId,
    staleTime: 5 * 60 * 1000, // Данные карты свежие 5 минут
  });
};

export const useCardTypes = (enabled = true) => {
  return useQuery<CardType[]>({
    queryKey: QueryKeys.CARD_TYPES,
    queryFn: () => cardService.getCardTypes(),
    enabled,
    staleTime: 30 * 60 * 1000, // Типы карт свежие 30 минут
  });
};

// Card mutation hooks
export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardData: { cardName: string; cardType: string; currency: string }) =>
      cardService.createCard(cardData),
    onSuccess: () => {
      // Обновляем список карт после создания
      queryClient.invalidateQueries({ queryKey: QueryKeys.CARDS });
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, updates }: { cardId: string; updates: Partial<Card> }) =>
      cardService.updateCard(cardId, updates),
    onSuccess: (_, { cardId }) => {
      // Обновляем данные карты и список карт
      queryClient.invalidateQueries({ queryKey: QueryKeys.CARD(cardId) });
      queryClient.invalidateQueries({ queryKey: QueryKeys.CARDS });
    },
  });
};

export const useToggleCardStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, isActive }: { cardId: string; isActive: boolean }) =>
      cardService.toggleCardStatus(cardId, isActive),
    onSuccess: (_, { cardId }) => {
      // Обновляем данные карты и список карт
      queryClient.invalidateQueries({ queryKey: QueryKeys.CARD(cardId) });
      queryClient.invalidateQueries({ queryKey: QueryKeys.CARDS });
    },
  });
};

export const useBlockCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, reason }: { cardId: string; reason?: string }) =>
      cardService.blockCard(cardId, reason),
    onSuccess: (_, { cardId }) => {
      // Обновляем данные карты и список карт
      queryClient.invalidateQueries({ queryKey: QueryKeys.CARD(cardId) });
      queryClient.invalidateQueries({ queryKey: QueryKeys.CARDS });
    },
  });
};

export const useUnblockCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: string) => cardService.unblockCard(cardId),
    onSuccess: (_, cardId) => {
      // Обновляем данные карты и список карт
      queryClient.invalidateQueries({ queryKey: QueryKeys.CARD(cardId) });
      queryClient.invalidateQueries({ queryKey: QueryKeys.CARDS });
    },
  });
};
