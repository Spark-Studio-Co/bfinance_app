import { apiClient } from '../client';
import { Card, CardType, CardsResponse } from '../types';
import { getMockCards, getMockCardTypes, getMockCard, delay } from '../mocks/cards';

class CardService {
  /**
   * Получение списка карт пользователя
   */
  async getCards(): Promise<Card[]> {
    // В режиме разработки используем mock данные
    if (__DEV__) {
      await delay(500); // Имитируем задержку сети
      return getMockCards();
    }

    const response: CardsResponse = await apiClient.get('/cards/list', true);
    return response.cards || response; // Support both response formats
  }

  /**
   * Получение типов карт
   */
  async getCardTypes(): Promise<CardType[]> {
    // В режиме разработки используем mock данные
    if (__DEV__) {
      await delay(300);
      return getMockCardTypes();
    }

    const response: CardType[] = await apiClient.get('/cards/types', true);
    return response;
  }

  /**
   * Получение информации о конкретной карте
   */
  async getCard(cardId: string): Promise<Card> {
    // В режиме разработки используем mock данные
    if (__DEV__) {
      await delay(400);
      const card = getMockCard(cardId);
      if (!card) {
        throw new Error(`Card with id ${cardId} not found`);
      }
      return card;
    }

    const response: Card = await apiClient.get(`/cards/${cardId}`, true);
    return response;
  }

  /**
   * Создание новой карты
   */
  async createCard(cardData: {
    cardName: string;
    cardType: string;
    currency: string;
  }): Promise<Card> {
    const response: Card = await apiClient.post('/cards/create', cardData, true);
    return response;
  }

  /**
   * Обновление карты
   */
  async updateCard(cardId: string, updates: Partial<Card>): Promise<Card> {
    const response: Card = await apiClient.put(`/cards/${cardId}`, updates, true);
    return response;
  }

  /**
   * Активация/деактивация карты
   */
  async toggleCardStatus(cardId: string, isActive: boolean): Promise<Card> {
    const response: Card = await apiClient.patch(`/cards/${cardId}/status`, { isActive }, true);
    return response;
  }

  /**
   * Блокировка карты
   */
  async blockCard(cardId: string, reason?: string): Promise<void> {
    await apiClient.post(`/cards/${cardId}/block`, { reason }, true);
  }

  /**
   * Разблокировка карты
   */
  async unblockCard(cardId: string): Promise<void> {
    await apiClient.post(`/cards/${cardId}/unblock`, {}, true);
  }
}

export const cardService = new CardService();
