import { useState, useEffect } from 'react';
import { Transaction } from './types';
import { useTransaction } from '~/shared/hooks/useApi';
import type { Transaction as ApiTransaction } from '~/shared/api/types';

// Функция для преобразования API транзакции в локальный формат (та же, что в hooks.ts)
const adaptApiTransaction = (apiTransaction: ApiTransaction): Transaction => {
  const date = new Date(apiTransaction.createdAt);
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  let status: 'success' | 'failed' | 'received';
  switch (apiTransaction.status) {
    case 'completed':
      status = apiTransaction.type === 'income' ? 'received' : 'success';
      break;
    case 'failed':
      status = 'failed';
      break;
    case 'pending':
      status = 'success';
      break;
    default:
      status = 'success';
  }

  return {
    id: apiTransaction.id,
    merchant: apiTransaction.description || 'Unknown merchant',
    amount: apiTransaction.amount,
    time,
    cardNumber: '****',
    type: apiTransaction.type === 'transfer' ? 'expense' : apiTransaction.type,
    status,
    billedAmount: apiTransaction.amount,
    fee: 0,
    transactionId: apiTransaction.id,
    declineReason: apiTransaction.status === 'failed' ? 'Transaction failed' : undefined,
  };
};

export const useTransactionDetails = (transactionId: string) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  // Используем общий API хук
  const { data: apiTransaction, isLoading, error } = useTransaction(transactionId);

  useEffect(() => {
    if (apiTransaction) {
      const adaptedTransaction = adaptApiTransaction(apiTransaction);
      setTransaction(adaptedTransaction);
    }
  }, [apiTransaction]);

  return {
    transaction,
    loading: isLoading,
    error,
  };
};
