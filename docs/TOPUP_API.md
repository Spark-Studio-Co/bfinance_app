# TopUp API Integration

Этот документ описывает интеграцию API для пополнения в приложении BFinance.

## Обзор

API пополнения позволяет получать список доступных валют (фиат и криптовалют) для пополнения кошельков пользователей.

## Структура API

### Основные типы

```typescript
interface TopUpCurrency {
  id: string;
  name: string;
  code: string;
  type: 'fiat' | 'crypto';
  icon?: string;
  isActive: boolean;
  networks?: TopUpNetwork[];
}

interface TopUpNetwork {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  minAmount?: number;
  maxAmount?: number;
  fee?: number;
}

interface TopUpCurrenciesResponse {
  fiat: TopUpCurrency[];
  crypto: TopUpCurrency[];
}
```

### Доступные методы

#### 1. Получение валют для пополнения

**Endpoint:** `GET /api/v1/finance/topup/currencies`

**Headers:**

- `x-auth-token: <JWT_TOKEN>`

**Response:**

```json
{
  "fiat": [
    {
      "id": "usd",
      "name": "US Dollar",
      "code": "USD",
      "type": "fiat",
      "isActive": true,
      "networks": [...]
    }
  ],
  "crypto": [
    {
      "id": "btc",
      "name": "Bitcoin",
      "code": "BTC",
      "type": "crypto",
      "isActive": true,
      "networks": [...]
    }
  ]
}
```

#### 2. Получение информации о валюте

**Endpoint:** `GET /api/v1/finance/topup/currencies/{currencyId}`

#### 3. Получение сетей для валюты

**Endpoint:** `GET /api/v1/finance/topup/currencies/{currencyId}/networks`

#### 4. Создание запроса на пополнение

**Endpoint:** `POST /api/v1/finance/topup/create`

**Body:**

```json
{
  "currencyId": "btc",
  "networkId": "btc-mainnet",
  "amount": 0.001,
  "walletId": "user-wallet-id"
}
```

## Использование в React Native

### Хуки

Приложение предоставляет готовые React Query хуки для работы с API:

```typescript
import { useTopUpCurrencies, useTopUpNetworks, useCreateTopUpRequest } from '~/shared/hooks/useApi';

// Получение валют
const { data: currencies, isLoading, error } = useTopUpCurrencies();

// Получение сетей для валюты
const { data: networks } = useTopUpNetworks(currencyId);

// Создание запроса на пополнение
const createTopUpRequest = useCreateTopUpRequest();
```

### Пример использования в компоненте

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { useTopUpCurrencies } from '~/shared/hooks/useApi';
import { LoadingState, ErrorState } from '~/shared/ui';

export const TopUpPage = () => {
  const { data: currenciesData, isLoading, error, refetch } = useTopUpCurrencies();

  if (isLoading) {
    return <LoadingState message="Loading currencies..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load currencies"
        message="Please check your connection and try again"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <View>
      <Text>FIAT</Text>
      {currenciesData?.fiat.map((currency) => (
        <CurrencyPickCard key={currency.id} {...currency} />
      ))}

      <Text>CRYPTO</Text>
      {currenciesData?.crypto.map((currency) => (
        <CurrencyPickCard key={currency.id} {...currency} />
      ))}
    </View>
  );
};
```

## Режим разработки

В режиме разработки (`__DEV__ === true`) API использует mock данные из файла `src/shared/api/mocks/topup.ts`. Это позволяет разрабатывать и тестировать интерфейс без необходимости подключения к реальному серверу.

Mock данные включают:

- 2 фиатные валюты (USD, EUR)
- 4 криптовалюты (BTC, ETH, TON, USDT)
- Различные сети для каждой валюты
- Реалистичные лимиты и комиссии

## Обработка ошибок

API использует стандартную обработку ошибок:

1. **401/403** - Ошибки авторизации автоматически обрабатываются интерцептором
2. **Network errors** - Обрабатываются через React Query и показываются пользователю
3. **Validation errors** - Передаются из response.data.message

## Кеширование

React Query автоматически кеширует данные:

- Валюты пополнения: 10 минут
- Сети валют: 10 минут
- Детали валюты: 10 минут

Кеш автоматически инвалидируется при создании запроса на пополнение.
