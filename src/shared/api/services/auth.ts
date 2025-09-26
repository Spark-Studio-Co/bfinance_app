import { apiClient } from '../client';
import { setAuthToken, setUserData, clearAllData } from '../storage';
import {
  EmailAuthRequest,
  EmailCodeRequest,
  EmailCodeResponse,
  RegistrationRequest,
  RegistrationResponse,
  User,
  UserBalance,
  UserBalanceResponse,
} from '../types';

class AuthService {
  /**
   * Отправка email для авторизации
   */
  async sendEmailAuth(email: string): Promise<void> {
    const request: EmailAuthRequest = { email };
    await apiClient.post('/authorization/email', request);
  }

  /**
   * Подтверждение кода из email
   */
  async confirmEmailCode(email: string, confirmationCode: string): Promise<EmailCodeResponse> {
    const request: EmailCodeRequest = { email, confirmationCode };
    const response: EmailCodeResponse = await apiClient.post('/authorization/email/code', request);

    // Сохраняем токен и данные пользователя
    await setAuthToken(response.token);
    await setUserData(response.user);

    return response;
  }

  /**
   * Завершение регистрации пользователя
   */
  async completeRegistration(firstName: string, lastName: string): Promise<RegistrationResponse> {
    const request: RegistrationRequest = { firstName, lastName };
    const response: RegistrationResponse = await apiClient.post('/registration', request, true);

    // Обновляем данные пользователя
    await setUserData(response.user);

    return response;
  }

  /**
   * Получение информации о текущем пользователе
   */
  async getCurrentUser(): Promise<User> {
    const response: User = await apiClient.get('/me', true);

    // Обновляем данные пользователя
    await setUserData(response);

    return response;
  }

  /**
   * Выход из системы
   */
  async logout(): Promise<void> {
    await clearAllData();
  }

  /**
   * Проверка валидности токена
   */
  async validateToken(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch (error) {
      await clearAllData();
      return false;
    }
  }

  /**
   * Получение общего баланса пользователя
   */
  async getUserBalance(): Promise<UserBalance> {
    // В режиме разработки используем mock данные
    if (__DEV__) {
      const { delay, getMockUserBalance } = await import('../mocks/balance');
      await delay(500); // Имитируем задержку сети
      return getMockUserBalance();
    }

    const response: UserBalanceResponse = await apiClient.get('/user/total', true);
    return response.balance;
  }
}

export const authService = new AuthService();
