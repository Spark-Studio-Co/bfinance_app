import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '../../shared/ui';
import type { TabScreenProps } from '../../shared/types/navigation';

type FinancePageProps = TabScreenProps<'Finance'>;

export function FinancePage({}: FinancePageProps) {
  return (
    <Container>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          {/* Статистика */}
          <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-700">Финансовая статистика</Text>

            <View className="mb-4 flex-row justify-between">
              <View className="mr-2 flex-1 rounded-lg bg-green-50 p-3">
                <Text className="text-sm text-green-600">Доходы</Text>
                <Text className="text-xl font-bold text-green-700">₽120,000</Text>
              </View>
              <View className="ml-2 flex-1 rounded-lg bg-red-50 p-3">
                <Text className="text-sm text-red-600">Расходы</Text>
                <Text className="text-xl font-bold text-red-700">₽85,000</Text>
              </View>
            </View>

            <View className="rounded-lg bg-blue-50 p-3">
              <Text className="text-sm text-blue-600">Остаток</Text>
              <Text className="text-xl font-bold text-blue-700">₽35,000</Text>
            </View>
          </View>

          {/* Кнопки действий */}
          <View className="mb-4 flex-row">
            <TouchableOpacity className="mr-2 flex-1 rounded-lg bg-green-500 p-4">
              <View className="flex-row items-center justify-center">
                <Ionicons name="add-circle" size={24} color="white" />
                <Text className="ml-2 font-semibold text-white">Доход</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="ml-2 flex-1 rounded-lg bg-red-500 p-4">
              <View className="flex-row items-center justify-center">
                <Ionicons name="remove-circle" size={24} color="white" />
                <Text className="ml-2 font-semibold text-white">Расход</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* История транзакций */}
          <View className="rounded-lg bg-white p-4 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-700">История транзакций</Text>

            <View className="space-y-3">
              <View className="flex-row items-center justify-between border-b border-gray-100 pb-3">
                <View className="flex-row items-center">
                  <View className="mr-3 rounded-full bg-green-100 p-2">
                    <Ionicons name="trending-up" size={16} color="#059669" />
                  </View>
                  <View>
                    <Text className="font-medium text-gray-800">Зарплата</Text>
                    <Text className="text-sm text-gray-500">15 янв 2025</Text>
                  </View>
                </View>
                <Text className="font-bold text-green-600">+₽80,000</Text>
              </View>

              <View className="flex-row items-center justify-between border-b border-gray-100 pb-3">
                <View className="flex-row items-center">
                  <View className="mr-3 rounded-full bg-red-100 p-2">
                    <Ionicons name="restaurant" size={16} color="#dc2626" />
                  </View>
                  <View>
                    <Text className="font-medium text-gray-800">Продукты</Text>
                    <Text className="text-sm text-gray-500">14 янв 2025</Text>
                  </View>
                </View>
                <Text className="font-bold text-red-600">-₽2,500</Text>
              </View>

              <View className="flex-row items-center justify-between border-b border-gray-100 pb-3">
                <View className="flex-row items-center">
                  <View className="mr-3 rounded-full bg-red-100 p-2">
                    <Ionicons name="car" size={16} color="#dc2626" />
                  </View>
                  <View>
                    <Text className="font-medium text-gray-800">Бензин</Text>
                    <Text className="text-sm text-gray-500">13 янв 2025</Text>
                  </View>
                </View>
                <Text className="font-bold text-red-600">-₽3,000</Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-3 rounded-full bg-red-100 p-2">
                    <Ionicons name="cafe" size={16} color="#dc2626" />
                  </View>
                  <View>
                    <Text className="font-medium text-gray-800">Кафе</Text>
                    <Text className="text-sm text-gray-500">12 янв 2025</Text>
                  </View>
                </View>
                <Text className="font-bold text-red-600">-₽1,200</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
