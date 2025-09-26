import { UserBalance } from '../types';

/**
 * Delay utility function for simulating network latency
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock user balance data
 */
export const getMockUserBalance = (): UserBalance => {
  return {
    totalBalance: 15348.75,
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Mock different balance scenarios for testing
 */
export const getMockUserBalanceVariants = () => {
  return {
    high: {
      totalBalance: 125847.32,
      currency: 'USD',
      lastUpdated: new Date().toISOString(),
    },
    medium: {
      totalBalance: 15348.75,
      currency: 'USD',
      lastUpdated: new Date().toISOString(),
    },
    low: {
      totalBalance: 247.18,
      currency: 'USD',
      lastUpdated: new Date().toISOString(),
    },
    zero: {
      totalBalance: 0,
      currency: 'USD',
      lastUpdated: new Date().toISOString(),
    },
    euro: {
      totalBalance: 8425.6,
      currency: 'EUR',
      lastUpdated: new Date().toISOString(),
    },
  };
};
