import { useCallback } from 'react';
import { useUserBalance } from '~/shared/hooks/useApi';
import { useAuth } from '~/shared/contexts/AuthContext';

/**
 * Hook for managing total balance display with refresh functionality
 */
export const useTotalBalance = () => {
  const { isAuthenticated } = useAuth();

  const {
    data: balanceData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useUserBalance(isAuthenticated);

  const refreshBalance = useCallback(async () => {
    if (isAuthenticated) {
      await refetch();
    }
  }, [isAuthenticated, refetch]);

  const formatNumber = useCallback((num: number | string) => {
    if (typeof num !== 'number') num = Number(num);
    return num.toLocaleString('en-US');
  }, []);

  const getCurrencySymbol = useCallback((currencyCode: string) => {
    switch (currencyCode) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'JPY':
        return '¥';
      default:
        return currencyCode;
    }
  }, []);

  const balance = balanceData?.totalBalance ?? 0;
  const currency = balanceData?.currency ?? 'USD';
  const lastUpdated = balanceData?.lastUpdated;

  return {
    balance,
    currency,
    lastUpdated,
    isLoading,
    isFetching,
    error,
    refreshBalance,
    formatNumber: (num: number) => formatNumber(num),
    getCurrencySymbol: (currency: string) => getCurrencySymbol(currency),
    formattedBalance: formatNumber(balance),
    currencySymbol: getCurrencySymbol(currency),
  };
};
