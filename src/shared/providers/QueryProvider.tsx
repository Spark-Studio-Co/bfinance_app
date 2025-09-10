import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Создание клиента для запросов
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Повтор запроса до 3 раз при ошибке
      staleTime: 5 * 60 * 1000, // Данные считаются свежими 5 минут
      gcTime: 10 * 60 * 1000, // Кэш хранится 10 минут (заменяет cacheTime)
      refetchOnWindowFocus: false, // Не обновлять при фокусе
      refetchOnReconnect: true, // Обновлять при восстановлении соединения
    },
    mutations: {
      retry: 1, // Повтор мутации 1 раз при ошибке
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { queryClient };
