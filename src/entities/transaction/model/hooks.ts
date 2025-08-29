import { useState, useEffect } from 'react';
import { Transaction, TransactionGroup } from './types';

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
  {
    id: '4',
    merchant: 'APPLE.COM/BILL',
    amount: 10.32,
    time: '19:20',
    cardNumber: '1234',
    type: 'expense',
    status: 'success',
    billedAmount: 10,
    fee: 0.5,
    transactionId: 'tid_enJsnLL837',
  },
  {
    id: '5',
    merchant: 'APPLE.COM/BILL',
    amount: 10.32,
    time: '19:20',
    cardNumber: '1234',
    type: 'expense',
    status: 'success',
    billedAmount: 10,
    fee: 0.5,
    transactionId: 'tid_enJsnLL837',
  },
  {
    id: '6',
    merchant: 'APPLE.COM/BILL',
    amount: 10.32,
    time: '19:20',
    cardNumber: '1234',
    type: 'expense',
    status: 'success',
    billedAmount: 10,
    fee: 0.5,
    transactionId: 'tid_enJsnLL837',
  },
  {
    id: '7',
    merchant: 'APPLE.COM/BILL',
    amount: 10.32,
    time: '19:20',
    cardNumber: '1234',
    type: 'expense',
    status: 'success',
    billedAmount: 10,
    fee: 0.5,
    transactionId: 'tid_enJsnLL837',
  },
  {
    id: '8',
    merchant: 'APPLE.COM/BILL',
    amount: 10.32,
    time: '19:20',
    cardNumber: '1234',
    type: 'expense',
    status: 'success',
    billedAmount: 10,
    fee: 0.5,
    transactionId: 'tid_enJsnLL837',
  },
];
export const useTransactionHistory = () => {
  const [transactions, setTransactions] = useState<TransactionGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = () => {
      setLoading(true);

      const grouped: TransactionGroup[] = [
        {
          date: 'TODAY',
          transactions: mockTransactions.slice(0, 2),
        },
        {
          date: 'YESTERDAY',
          transactions: mockTransactions.slice(2, 6),
        },
        {
          date: 'YESTERDAY',
          transactions: mockTransactions.slice(6),
        },
      ];

      setTransactions(grouped);
      setLoading(false);
    };

    setTimeout(loadTransactions, 300);
  }, []);

  const handleTransactionPress = (transaction: Transaction) => {
    console.log('Transaction pressed:', transaction);
  };

  return {
    transactions,
    loading,
    handleTransactionPress,
  };
};
