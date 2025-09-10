import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import API_CONFIG from './config';
import { getAuthToken, removeAuthToken } from './storage';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor для добавления токена авторизации
    this.instance.interceptors.request.use(
      async (config) => {
        // Проверяем, требуется ли авторизация для этого запроса
        if (config.metadata?.requireAuth) {
          const token = await getAuthToken();
          if (token) {
            config.headers['x-auth-token'] = token;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor для обработки ошибок авторизации
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await removeAuthToken();
          // Можно добавить навигацию на страницу авторизации
        }
        return Promise.reject(error);
      }
    );
  }

  private async makeRequest<T = any>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    endpoint: string,
    data?: any,
    requireAuth = false
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig & { metadata?: { requireAuth: boolean } } = {
        metadata: { requireAuth },
      };

      let response: AxiosResponse<T>;

      switch (method) {
        case 'get':
          response = await this.instance.get(endpoint, config);
          break;
        case 'post':
          response = await this.instance.post(endpoint, data, config);
          break;
        case 'put':
          response = await this.instance.put(endpoint, data, config);
          break;
        case 'delete':
          response = await this.instance.delete(endpoint, config);
          break;
        case 'patch':
          response = await this.instance.patch(endpoint, data, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  // Публичные методы
  get<T = any>(endpoint: string, requireAuth = false): Promise<T> {
    return this.makeRequest<T>('get', endpoint, undefined, requireAuth);
  }

  post<T = any>(endpoint: string, data?: any, requireAuth = false): Promise<T> {
    return this.makeRequest<T>('post', endpoint, data, requireAuth);
  }

  put<T = any>(endpoint: string, data?: any, requireAuth = false): Promise<T> {
    return this.makeRequest<T>('put', endpoint, data, requireAuth);
  }

  delete<T = any>(endpoint: string, requireAuth = false): Promise<T> {
    return this.makeRequest<T>('delete', endpoint, undefined, requireAuth);
  }

  patch<T = any>(endpoint: string, data?: any, requireAuth = false): Promise<T> {
    return this.makeRequest<T>('patch', endpoint, data, requireAuth);
  }
}

// Расширяем типы для metadata
declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      requireAuth?: boolean;
    };
  }
}

export const apiClient = new ApiClient();
