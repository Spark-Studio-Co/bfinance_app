import type { TopUpCurrenciesResponse } from '../types';

// Мок данные для тестирования API интеграции
export const mockTopUpCurrencies: TopUpCurrenciesResponse = {
  fiat: [
    {
      id: 'usd',
      name: 'US Dollar',
      code: 'USD',
      type: 'fiat',
      isActive: true,
      networks: [
        {
          id: 'usd-bank',
          name: 'Bank Transfer',
          code: 'BANK',
          isActive: true,
          minAmount: 10,
          maxAmount: 10000,
          fee: 0,
        },
        {
          id: 'usd-card',
          name: 'Credit/Debit Card',
          code: 'CARD',
          isActive: true,
          minAmount: 1,
          maxAmount: 5000,
          fee: 2.5,
        },
      ],
    },
    {
      id: 'eur',
      name: 'Euro',
      code: 'EUR',
      type: 'fiat',
      isActive: true,
      networks: [
        {
          id: 'eur-sepa',
          name: 'SEPA Transfer',
          code: 'SEPA',
          isActive: true,
          minAmount: 10,
          maxAmount: 10000,
          fee: 0,
        },
      ],
    },
  ],
  crypto: [
    {
      id: 'btc',
      name: 'Bitcoin',
      code: 'BTC',
      type: 'crypto',
      isActive: true,
      networks: [
        {
          id: 'btc-mainnet',
          name: 'Bitcoin Network',
          code: 'BTC',
          isActive: true,
          minAmount: 0.0001,
          maxAmount: 10,
          fee: 0.0001,
        },
        {
          id: 'btc-lightning',
          name: 'Lightning Network',
          code: 'LN',
          isActive: true,
          minAmount: 0.000001,
          maxAmount: 0.1,
          fee: 0.000001,
        },
      ],
    },
    {
      id: 'eth',
      name: 'Ethereum',
      code: 'ETH',
      type: 'crypto',
      isActive: true,
      networks: [
        {
          id: 'eth-mainnet',
          name: 'Ethereum Mainnet',
          code: 'ETH',
          isActive: true,
          minAmount: 0.001,
          maxAmount: 100,
          fee: 0.002,
        },
        {
          id: 'eth-polygon',
          name: 'Polygon Network',
          code: 'MATIC',
          isActive: true,
          minAmount: 0.001,
          maxAmount: 100,
          fee: 0.001,
        },
      ],
    },
    {
      id: 'ton',
      name: 'The Open Network',
      code: 'TON',
      type: 'crypto',
      isActive: true,
      networks: [
        {
          id: 'ton-mainnet',
          name: 'TON Network',
          code: 'TON',
          isActive: true,
          minAmount: 0.1,
          maxAmount: 10000,
          fee: 0.005,
        },
      ],
    },
    {
      id: 'usdt',
      name: 'Tether USD',
      code: 'USDT',
      type: 'crypto',
      isActive: true,
      networks: [
        {
          id: 'usdt-eth',
          name: 'Ethereum (ERC-20)',
          code: 'ETH',
          isActive: true,
          minAmount: 1,
          maxAmount: 50000,
          fee: 5,
        },
        {
          id: 'usdt-tron',
          name: 'Tron (TRC-20)',
          code: 'TRX',
          isActive: true,
          minAmount: 1,
          maxAmount: 50000,
          fee: 1,
        },
        {
          id: 'usdt-bsc',
          name: 'BNB Smart Chain (BEP-20)',
          code: 'BSC',
          isActive: true,
          minAmount: 1,
          maxAmount: 50000,
          fee: 0.5,
        },
      ],
    },
  ],
};

// Функция для имитации задержки API
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
