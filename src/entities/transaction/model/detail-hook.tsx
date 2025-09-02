import { useState, useEffect } from 'react';
import { Transaction } from './types';

// В реальном приложении это будут те же данные из TransactionHistory
const mockTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'APPLE.COM/BILL',
    amount: 1239,
    time: '19:20',
    cardNumber: '1234',
    type: 'expense',
    status: 'success',
    billedAmount: 10,
    fee: 0.5,
    transactionId: 'tid_enJsnLL837',
  },
  {
    id: '2',
    merchant: 'ALIEXPRESS.COM',
    amount: 1239,
    time: '19:20',
    cardNumber: '1234',
    type: 'expense',
    status: 'failed',
    billedAmount: 10,
    fee: 0.5,
    transactionId: 'tid_enJsnLL837',
    declineReason: 'Insufficient funds',
  },
  {
    id: '3',
    merchant: 'ALIEXPRESS.COM',
    amount: 100,
    time: '19:20',
    cardNumber: '1234',
    type: 'income',
    status: 'received',
    billedAmount: 10,
    fee: 0.5,
    transactionId: 'tid_enJsnLL837',
  },
];

export const useTransactionDetails = (transactionId: string) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransaction = () => {
      setLoading(true);

      // Имитируем загрузку данных
      setTimeout(() => {
        const foundTransaction = mockTransactions.find((t) => t.id === transactionId);
        setTransaction(foundTransaction || null);
        setLoading(false);
      }, 200);
    };

    loadTransaction();
  }, [transactionId]);

  return {
    transaction,
    loading,
  };
};
