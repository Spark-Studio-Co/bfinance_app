import type { TransactionsResponse, Transaction } from '../types';

// Mock данные для транзакций
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 500.0,
    currency: 'USD',
    description: 'Salary deposit',
    status: 'completed',
    createdAt: '2025-09-20T10:30:00Z',
    updatedAt: '2025-09-20T10:30:00Z',
    fromWallet: undefined,
    toWallet: 'wallet-usd-1',
  },
  {
    id: '2',
    type: 'expense',
    amount: 0.005,
    currency: 'BTC',
    description: 'Coffee purchase',
    status: 'completed',
    createdAt: '2025-09-19T15:45:00Z',
    updatedAt: '2025-09-19T15:45:00Z',
    fromWallet: 'wallet-btc-1',
    toWallet: undefined,
  },
  {
    id: '3',
    type: 'transfer',
    amount: 100.0,
    currency: 'USD',
    description: 'Transfer to savings',
    status: 'pending',
    createdAt: '2025-09-18T14:20:00Z',
    updatedAt: '2025-09-18T14:20:00Z',
    fromWallet: 'wallet-usd-1',
    toWallet: 'wallet-usd-savings',
  },
  {
    id: '4',
    type: 'income',
    amount: 0.1,
    currency: 'ETH',
    description: 'Ethereum mining reward',
    status: 'completed',
    createdAt: '2025-09-17T09:15:00Z',
    updatedAt: '2025-09-17T09:15:00Z',
    fromWallet: undefined,
    toWallet: 'wallet-eth-1',
  },
  {
    id: '5',
    type: 'expense',
    amount: 25.5,
    currency: 'USD',
    description: 'Online shopping',
    status: 'failed',
    createdAt: '2025-09-16T16:30:00Z',
    updatedAt: '2025-09-16T16:35:00Z',
    fromWallet: 'wallet-usd-1',
    toWallet: undefined,
  },
  {
    id: '6',
    type: 'income',
    amount: 1000.0,
    currency: 'USDT',
    description: 'USDT top-up',
    status: 'completed',
    createdAt: '2025-09-15T11:00:00Z',
    updatedAt: '2025-09-15T11:05:00Z',
    fromWallet: undefined,
    toWallet: 'wallet-usdt-1',
  },
  {
    id: '7',
    type: 'transfer',
    amount: 50.0,
    currency: 'TON',
    description: 'TON transfer to friend',
    status: 'completed',
    createdAt: '2025-09-14T13:25:00Z',
    updatedAt: '2025-09-14T13:25:00Z',
    fromWallet: 'wallet-ton-1',
    toWallet: 'external-wallet',
  },
  {
    id: '8',
    type: 'expense',
    amount: 0.002,
    currency: 'BTC',
    description: 'Network fee',
    status: 'completed',
    createdAt: '2025-09-13T08:45:00Z',
    updatedAt: '2025-09-13T08:45:00Z',
    fromWallet: 'wallet-btc-1',
    toWallet: undefined,
  },
  {
    id: '9',
    type: 'income',
    amount: 750.0,
    currency: 'EUR',
    description: 'Freelance payment',
    status: 'completed',
    createdAt: '2025-09-12T12:10:00Z',
    updatedAt: '2025-09-12T12:10:00Z',
    fromWallet: undefined,
    toWallet: 'wallet-eur-1',
  },
  {
    id: '10',
    type: 'transfer',
    amount: 200.0,
    currency: 'USD',
    description: 'Emergency fund transfer',
    status: 'pending',
    createdAt: '2025-09-11T17:00:00Z',
    updatedAt: '2025-09-11T17:00:00Z',
    fromWallet: 'wallet-usd-1',
    toWallet: 'wallet-usd-emergency',
  },
];

export const mockTransactionsResponse: TransactionsResponse = {
  transactions: mockTransactions,
  pagination: {
    page: 1,
    limit: 10,
    total: 25,
    totalPages: 3,
  },
};

// Функция для получения отфильтрованных транзакций с пагинацией
export const getMockTransactions = (
  params: {
    page?: number;
    limit?: number;
    type?: 'income' | 'expense' | 'transfer';
    currency?: string;
    walletId?: string;
  } = {}
): TransactionsResponse => {
  const { page = 1, limit = 10, type, currency, walletId } = params;

  let filteredTransactions = [...mockTransactions];

  // Фильтрация по типу
  if (type) {
    filteredTransactions = filteredTransactions.filter((t) => t.type === type);
  }

  // Фильтрация по валюте
  if (currency) {
    filteredTransactions = filteredTransactions.filter((t) => t.currency === currency);
  }

  // Фильтрация по кошельку
  if (walletId) {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.fromWallet === walletId || t.toWallet === walletId
    );
  }

  // Пагинация
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  return {
    transactions: paginatedTransactions,
    pagination: {
      page,
      limit,
      total: filteredTransactions.length,
      totalPages: Math.ceil(filteredTransactions.length / limit),
    },
  };
};

// Функция для получения конкретной транзакции
export const getMockTransaction = (id: string): Transaction | null => {
  return mockTransactions.find((t) => t.id === id) || null;
};

// Функция для имитации задержки API
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
