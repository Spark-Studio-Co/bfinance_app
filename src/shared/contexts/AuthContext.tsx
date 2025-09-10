import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getUserData, getAuthToken } from '../api/storage';
import { User } from '../api/types';
import {
  useSendEmailAuth,
  useConfirmEmailCode,
  useCompleteRegistration,
  useLogout,
  useValidateToken,
} from '../hooks/useApi';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Auth methods
  sendEmailAuth: (email: string) => Promise<void>;
  confirmEmailCode: (email: string, code: string) => Promise<void>;
  completeRegistration: (firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;

  // Loading states for UI
  isSendingEmail: boolean;
  isConfirmingCode: boolean;
  isCompletingRegistration: boolean;
  isLoggingOut: boolean;

  // Legacy methods for backward compatibility
  login: (email: string, confirmationCode: string) => Promise<void>;
  register: (firstName: string, lastName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mutations
  const sendEmailMutation = useSendEmailAuth();
  const confirmCodeMutation = useConfirmEmailCode();
  const registrationMutation = useCompleteRegistration();
  const logoutMutation = useLogout();
  const validateTokenMutation = useValidateToken();

  const isAuthenticated = !!user;

  // Проверка авторизации при загрузке приложения
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);

      const token = await getAuthToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Проверяем валидность токена
      const isValid = await validateTokenMutation.mutateAsync();
      if (isValid) {
        const userData = await getUserData();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailAuth = async (email: string): Promise<void> => {
    await sendEmailMutation.mutateAsync(email);
  };

  const confirmEmailCode = async (email: string, code: string): Promise<void> => {
    const response = await confirmCodeMutation.mutateAsync({
      email,
      confirmationCode: code,
    });
    setUser(response.user);
  };

  const completeRegistration = async (firstName: string, lastName: string): Promise<void> => {
    const response = await registrationMutation.mutateAsync({
      firstName,
      lastName,
    });
    setUser(response.user);
  };

  const refreshUser = async (): Promise<void> => {
    await checkAuthStatus();
  };

  const logout = async (): Promise<void> => {
    await logoutMutation.mutateAsync();
    setUser(null);
  };

  // Legacy methods for backward compatibility
  const login = async (email: string, confirmationCode: string): Promise<void> => {
    await confirmEmailCode(email, confirmationCode);
  };

  const register = async (firstName: string, lastName: string): Promise<void> => {
    await completeRegistration(firstName, lastName);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,

    sendEmailAuth,
    confirmEmailCode,
    completeRegistration,
    logout,
    refreshUser,

    isSendingEmail: sendEmailMutation.isPending,
    isConfirmingCode: confirmCodeMutation.isPending,
    isCompletingRegistration: registrationMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    // Legacy
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
