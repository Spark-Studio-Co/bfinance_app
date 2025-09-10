import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import type { TabScreenProps } from '../../shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { TotalBalanceTab } from '~/widgets/ui/TotalBalanceTab';
import { ProfileAvatar } from '~/shared/ui/ProfileAvatar';
import { ItemsList } from '~/features/ItemsList/ItemList';
import { BannerSwiper } from '~/features/BannerSwiper/BannerSwiper';
import { useUser, useWallets, useTransactions } from '~/shared/hooks/useApi';
import { useAuth } from '~/shared/contexts/AuthContext';

type HomePageProps = TabScreenProps<'Home'>;

export function HomePage({}: HomePageProps) {
  const { isAuthenticated } = useAuth();

  // Загружаем данные только если пользователь авторизован
  const { data: user, isLoading: isUserLoading, error: userError } = useUser(isAuthenticated);
  const {
    data: wallets,
    isLoading: isWalletsLoading,
    error: walletsError,
  } = useWallets(isAuthenticated);
  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError,
  } = useTransactions({}, isAuthenticated);

  // Отображаем индикатор загрузки для критических данных
  if (isAuthenticated && isUserLoading) {
    return (
      <MainLayout>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563eb" />
          <Text className="mt-2 text-gray-600">Загрузка данных...</Text>
        </View>
      </MainLayout>
    );
  }

  // Показываем ошибки если они есть
  if (userError || walletsError || transactionsError) {
    return (
      <MainLayout>
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500">Ошибка загрузки данных</Text>
          <Text className="mt-1 text-gray-600">
            {userError?.message || walletsError?.message || transactionsError?.message}
          </Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ProfileAvatar />
      <TotalBalanceTab />
      <BannerSwiper />
      {isWalletsLoading ? (
        <View className="py-4">
          <ActivityIndicator size="small" color="#2563eb" />
        </View>
      ) : (
        <>
          <ItemsList title="FIAT" isFiat />
          <ItemsList title="CRYPTO" isCrypto />
        </>
      )}
    </MainLayout>
  );
}
