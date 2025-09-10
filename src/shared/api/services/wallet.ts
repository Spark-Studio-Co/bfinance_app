import { apiClient } from '../client';
import { WalletsResponse, Wallet } from '../types';

class WalletService {
  /**
   * Получение списка всех кошельков пользователя
   */
  async getWallets(): Promise<Wallet[]> {
    const response: WalletsResponse = await apiClient.get('/wallets', true);
    return response.wallets;
  }

  /**
   * Получение информации о конкретном кошельке
   */
  async getWallet(walletId: string): Promise<Wallet> {
    const response: Wallet = await apiClient.get(`/wallets/${walletId}`, true);
    return response;
  }

  /**
   * Создание нового кошелька
   */
  async createWallet(currency: string, type: 'fiat' | 'crypto'): Promise<Wallet> {
    const request = { currency, type };
    const response: Wallet = await apiClient.post('/wallets', request, true);
    return response;
  }

  /**
   * Обновление кошелька
   */
  async updateWallet(walletId: string, updates: Partial<Wallet>): Promise<Wallet> {
    const response: Wallet = await apiClient.put(`/wallets/${walletId}`, updates, true);
    return response;
  }

  /**
   * Деактивация кошелька
   */
  async deactivateWallet(walletId: string): Promise<void> {
    await apiClient.delete(`/wallets/${walletId}`, true);
  }
}

export const walletService = new WalletService();
