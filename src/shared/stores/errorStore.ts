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

export const useErrorStore = create<ErrorState>((set, get) => ({
  errors: [],

  addError: (error) => {
    const newError: AppError = {
      ...error,
      id: generateId(),
      timestamp: Date.now(),
    };

    set((state) => ({
      errors: [...state.errors, newError],
    }));

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
