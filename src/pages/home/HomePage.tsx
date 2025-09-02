import React from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Text } from '../../shared/ui';
import type { TabScreenProps } from '../../shared/types/navigation';

type HomePageProps = TabScreenProps<'Home'>;

export function HomePage({}: HomePageProps) {
  return (
    <Container>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          <Text weight="bold" className="mb-4 text-2xl text-gray-800">
            Добро пожаловать в BFinance
          </Text>
          <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <Text weight="medium" className="mb-2 text-lg text-gray-700">
              Сводка
            </Text>
            <View className="mb-2 flex-row justify-between">
              <Text weight="regular" className="text-gray-600">
                Общий баланс:
              </Text>
              <Text weight="bold" className="text-green-600">
                ₽125,000
              </Text>
            </View>
            <View className="mb-2 flex-row justify-between">
              <Text weight="regular" className="text-gray-600">
                Расходы за месяц:
              </Text>
              <Text weight="bold" className="text-red-600">
                ₽35,000
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text weight="regular" className="text-gray-600">
                Бюджет:
              </Text>
              <Text weight="bold" className="text-blue-600">
                ₽50,000
              </Text>
            </View>
          </View>
          <View className="rounded-lg bg-white p-4 shadow-sm">
            <Text weight="medium" className="mb-2 text-lg text-gray-700">
              Последние транзакции
            </Text>
            <View className="space-y-2">
              <View className="flex-row justify-between border-b border-gray-100 pb-2">
                <Text weight="regular" className="text-gray-700">
                  Продукты
                </Text>
                <Text weight="medium" className="text-red-600">
                  -₽2,500
                </Text>
              </View>
              <View className="flex-row justify-between border-b border-gray-100 pb-2">
                <Text weight="regular" className="text-gray-700">
                  Зарплата
                </Text>
                <Text weight="medium" className="text-green-600">
                  +₽80,000
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text weight="regular" className="text-gray-700">
                  Кафе
                </Text>
                <Text weight="medium" className="text-red-600">
                  -₽1,200
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
