import { useState, useEffect } from 'react';
import { Transaction, TransactionGroup } from './types';
import { useTransactions } from '~/shared/hooks/useApi';
import type { Transaction as ApiTransaction } from '~/shared/api/types';

// Функция для преобразования API транзакции в локальный формат
const adaptApiTransaction = (apiTransaction: ApiTransaction): Transaction => {
  // Извлекаем время из ISO строки
  const date = new Date(apiTransaction.createdAt);
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Определяем статус в локальном формате
  let status: 'success' | 'failed' | 'received';
  switch (apiTransaction.status) {
    case 'completed':
      status = apiTransaction.type === 'income' ? 'received' : 'success';
      break;
    case 'failed':
      status = 'failed';
      break;
    case 'pending':
      status = 'success'; // Для pending показываем как success, но можно добавить отдельный статус
      break;
    default:
      status = 'success';
  }

  return {
    id: apiTransaction.id,
    merchant: apiTransaction.description || 'Unknown merchant',
    amount: apiTransaction.amount,
    time,
    cardNumber: '****', // Заглушка для номера карты
    type: apiTransaction.type === 'transfer' ? 'expense' : apiTransaction.type, // transfer считаем как expense
    status,
    billedAmount: apiTransaction.amount,
    fee: 0, // API пока не возвращает fee, можно добавить позже
    transactionId: apiTransaction.id,
    declineReason: apiTransaction.status === 'failed' ? 'Transaction failed' : undefined,
  };
};

// Функция для группировки транзакций по датам
const groupTransactionsByDate = (apiTransactions: ApiTransaction[]): TransactionGroup[] => {
  const groups: { [key: string]: Transaction[] } = {};

  apiTransactions.forEach((apiTransaction) => {
    const transaction = adaptApiTransaction(apiTransaction);
    const date = new Date(apiTransaction.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateKey: string;
    if (date.toDateString() === today.toDateString()) {
      dateKey = 'TODAY';
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateKey = 'YESTERDAY';
    } else {
      dateKey = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
  });

  // Преобразуем в массив и сортируем
  return Object.entries(groups)
    .map(([date, transactions]) => ({
      date,
      transactions: transactions.sort((a, b) => b.time.localeCompare(a.time)),
    }))
    .sort((a, b) => {
      // Сортируем группы: TODAY, YESTERDAY, затем остальные по дате
      if (a.date === 'TODAY') return -1;
      if (b.date === 'TODAY') return 1;
      if (a.date === 'YESTERDAY') return -1;
      if (b.date === 'YESTERDAY') return 1;
      return b.date.localeCompare(a.date);
    });
};
export const useTransactionHistory = (params?: {
  page?: number;
  limit?: number;
  type?: 'income' | 'expense' | 'transfer';
  currency?: string;
  walletId?: string;
}) => {
  const [transactions, setTransactions] = useState<TransactionGroup[]>([]);

  // Используем общий API хук
  const { data: transactionsData, isLoading, error } = useTransactions(params || {});

  useEffect(() => {
    if (transactionsData?.transactions) {
      const grouped = groupTransactionsByDate(transactionsData.transactions);
      setTransactions(grouped);
    }
  }, [transactionsData]);

  const handleTransactionPress = (transaction: Transaction) => {
    console.log('Transaction pressed:', transaction);
  };

  return {
    transactions,
    loading: isLoading,
    error,
    pagination: transactionsData?.pagination,
    handleTransactionPress,
  };
};
