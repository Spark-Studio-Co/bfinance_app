import { create } from 'zustand';

export interface AppError {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: number;
  autoDismiss?: boolean;
  duration?: number; // in milliseconds
}

interface ErrorState {
  errors: AppError[];
  addError: (error: Omit<AppError, 'id' | 'timestamp'>) => void;
  removeError: (id: string) => void;
  clearAllErrors: () => void;
  showError: (
    message: string,
    type?: AppError['type'],
    autoDismiss?: boolean,
    duration?: number
  ) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);
const MAX_ERRORS = 2; // Maximum number of errors to show at once
const DUPLICATE_TIMEOUT = 2000; // 2 seconds to prevent duplicate messages

export const useErrorStore = create<ErrorState>((set, get) => ({
  errors: [],

  addError: (error) => {
    const currentState = get();
    const now = Date.now();

    // Check for duplicate messages within the timeout period
    const isDuplicate = currentState.errors.some(
      (existingError) =>
        existingError.message === error.message &&
        existingError.type === error.type &&
        now - existingError.timestamp < DUPLICATE_TIMEOUT
    );

    if (isDuplicate) {
      return; // Don't add duplicate error
    }

    const newError: AppError = {
      ...error,
      id: generateId(),
      timestamp: now,
    };

    set((state) => {
      // Limit the number of errors
      let updatedErrors = [...state.errors, newError];

      // Remove oldest errors if we exceed the limit
      if (updatedErrors.length > MAX_ERRORS) {
        updatedErrors = updatedErrors.slice(-MAX_ERRORS);
      }

      return { errors: updatedErrors };
    });

    // Auto-dismiss if specified
    if (newError.autoDismiss) {
      const duration = newError.duration || 5000; // Default 5 seconds
      setTimeout(() => {
        get().removeError(newError.id);
      }, duration);
    }
  },

  removeError: (id) => {
    set((state) => ({
      errors: state.errors.filter((error) => error.id !== id),
    }));
  },

  clearAllErrors: () => {
    set({ errors: [] });
  },

  showError: (message, type = 'error', autoDismiss = true, duration = 5000) => {
    get().addError({
      message,
      type,
      autoDismiss,
      duration,
    });
  },
}));
