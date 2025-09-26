import { apiClient } from '../client';
import { TransactionsResponse, Transaction } from '../types';
import { getMockTransactions, getMockTransaction, delay } from '../mocks/transactions';

interface GetTransactionsParams {
  page?: number;
  limit?: number;
  type?: 'income' | 'expense' | 'transfer';
  currency?: string;
  walletId?: string;
  startDate?: string;
  endDate?: string;
}

interface CreateTransactionRequest {
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  currency: string;
  description: string;
  fromWallet?: string;
  toWallet?: string;
}

class TransactionService {
  /**
   * Получение списка транзакций с фильтрацией и пагинацией
   */
  async getTransactions(params: GetTransactionsParams = {}): Promise<TransactionsResponse> {
    // В режиме разработки используем mock данные
    if (__DEV__) {
      await delay(600); // Имитируем задержку сети
      return getMockTransactions(params);
    }

    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/user/transactions?${queryString}` : '/user/transactions';

    const response: TransactionsResponse = await apiClient.get(endpoint, true);
    return response;
  }

  /**
   * Получение информации о конкретной транзакции
   */
  async getTransaction(transactionId: string): Promise<Transaction> {
    // В режиме разработки используем mock данные
    if (__DEV__) {
      await delay(400);
      const transaction = getMockTransaction(transactionId);
      if (!transaction) {
        throw new Error(`Transaction with id ${transactionId} not found`);
      }
      return transaction;
    }

    const response: Transaction = await apiClient.get(`/user/transactions/${transactionId}`, true);
    return response;
  }

  /**
   * Создание новой транзакции
   */
  async createTransaction(transactionData: CreateTransactionRequest): Promise<Transaction> {
    const response: Transaction = await apiClient.post('/transactions', transactionData, true);
    return response;
  }

  /**
   * Обновление транзакции
   */
  async updateTransaction(
    transactionId: string,
    updates: Partial<CreateTransactionRequest>
  ): Promise<Transaction> {
    const response: Transaction = await apiClient.put(
      `/transactions/${transactionId}`,
      updates,
      true
    );
    return response;
  }

  /**
   * Отмена транзакции
   */
  async cancelTransaction(transactionId: string): Promise<void> {
    await apiClient.delete(`/transactions/${transactionId}`, true);
  }

  /**
   * Получение статистики транзакций
   */
  async getTransactionStats(period: 'week' | 'month' | 'year' = 'month'): Promise<any> {
    const response = await apiClient.get(`/transactions/stats?period=${period}`, true);
    return response;
  }
}

export const transactionService = new TransactionService();
