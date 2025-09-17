import { useCallback } from 'react';
import { useErrorStore } from '../stores/errorStore';

export interface UseErrorHandlerReturn {
  showError: (message: string, autoDismiss?: boolean, duration?: number) => void;
  showWarning: (message: string, autoDismiss?: boolean, duration?: number) => void;
  showInfo: (message: string, autoDismiss?: boolean, duration?: number) => void;
  clearErrors: () => void;
  handleAsyncError: <T>(asyncFn: () => Promise<T>, errorMessage?: string) => Promise<T | null>;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const { showError: storeShowError, clearAllErrors } = useErrorStore();

  const showError = useCallback(
    (message: string, autoDismiss = true, duration = 5000) => {
      storeShowError(message, 'error', autoDismiss, duration);
    },
    [storeShowError]
  );

  const showWarning = useCallback(
    (message: string, autoDismiss = true, duration = 5000) => {
      storeShowError(message, 'warning', autoDismiss, duration);
    },
    [storeShowError]
  );

  const showInfo = useCallback(
    (message: string, autoDismiss = true, duration = 3000) => {
      storeShowError(message, 'info', autoDismiss, duration);
    },
    [storeShowError]
  );

  const clearErrors = useCallback(() => {
    clearAllErrors();
  }, [clearAllErrors]);

  const handleAsyncError = useCallback(
    async <T>(asyncFn: () => Promise<T>, errorMessage = 'An error occurred'): Promise<T | null> => {
      try {
        return await asyncFn();
      } catch (error) {
        const message = error instanceof Error ? error.message : errorMessage;
        showError(message);
        return null;
      }
    },
    [showError]
  );

  return {
    showError,
    showWarning,
    showInfo,
    clearErrors,
    handleAsyncError,
  };
};
