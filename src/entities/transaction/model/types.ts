export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  time: string;
  cardNumber: string;
  type: 'expense' | 'income';
  status: 'success' | 'failed' | 'received';
  billedAmount?: number;
  fee?: number;
  transactionId?: string;
  declineReason?: string;
}

export interface TransactionGroup {
  date: string;
  transactions: Transaction[];
}
