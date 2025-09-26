import { apiClient } from '../client';
import { TopUpCurrenciesResponse, TopUpCurrency, TopUpNetwork } from '../types';
import { mockTopUpCurrencies, delay } from '../mocks/topup';

class TopUpService {
  /**
   * Получение доступных валют для пополнения
   */
  async getCurrencies(): Promise<TopUpCurrenciesResponse> {
    // В режиме разработки используем mock данные
    if (__DEV__) {
      await delay(800); // Имитируем задержку сети
      return mockTopUpCurrencies;
    }

    const response: TopUpCurrenciesResponse = await apiClient.get(
      '/finance/topup/currencies',
      true
    );
    return response;
  }

  /**
   * Получение информации о конкретной валюте
   */
  async getCurrency(currencyId: string): Promise<TopUpCurrency> {
    // В режиме разработки используем mock данные
    if (__DEV__) {
      await delay(500);
      const allCurrencies = [...mockTopUpCurrencies.fiat, ...mockTopUpCurrencies.crypto];
      const currency = allCurrencies.find((c) => c.id === currencyId);
      if (!currency) {
        throw new Error(`Currency with id ${currencyId} not found`);
      }
      return currency;
    }

    const response: TopUpCurrency = await apiClient.get(
      `/finance/topup/currencies/${currencyId}`,
      true
    );
    return response;
  }

  /**
   * Получение доступных сетей для валюты
   */
  async getNetworks(currencyId: string): Promise<TopUpNetwork[]> {
    // В режиме разработки используем mock данные
    if (__DEV__) {
      await delay(400);
      const allCurrencies = [...mockTopUpCurrencies.fiat, ...mockTopUpCurrencies.crypto];
      const currency = allCurrencies.find((c) => c.id === currencyId);
      return currency?.networks || [];
    }

    const response: TopUpNetwork[] = await apiClient.get(
      `/finance/topup/currencies/${currencyId}/networks`,
      true
    );
    return response;
  }

  /**
   * Получение информации для пополнения баланса
   */
  async getTopUpInfo(currencyId: string, networkId: string): Promise<any> {
    const params = new URLSearchParams({
      currencyId,
      networkId,
    });

    const response = await apiClient.get(`/finance/topup?${params.toString()}`, true);
    return response;
  }

  /**
   * Создание запроса на пополнение
   */
  async createTopUpRequest(data: {
    currencyId: string;
    networkId?: string;
    amount: number;
    walletId: string;
  }): Promise<any> {
    const response = await apiClient.post('/finance/topup/create', data, true);
    return response;
  }
}

export const topUpService = new TopUpService();
