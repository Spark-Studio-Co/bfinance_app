import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '../../shared/ui';
import type { TabScreenProps } from '../../shared/types/navigation';

type BudgetPageProps = TabScreenProps<'Budget'>;

interface BudgetCategory {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  budgeted: number;
  spent: number;
  color: string;
}

const budgetCategories: BudgetCategory[] = [
  {
    name: 'Продукты',
    icon: 'restaurant',
    budgeted: 15000,
    spent: 12500,
    color: '#059669',
  },
  {
    name: 'Транспорт',
    icon: 'car',
    budgeted: 8000,
    spent: 9200,
    color: '#dc2626',
  },
  {
    name: 'Развлечения',
    icon: 'game-controller',
    budgeted: 5000,
    spent: 2800,
    color: '#2563eb',
  },
  {
    name: 'Одежда',
    icon: 'shirt',
    budgeted: 10000,
    spent: 4500,
    color: '#7c3aed',
  },
  {
    name: 'Коммунальные',
    icon: 'home',
    budgeted: 12000,
    spent: 11800,
    color: '#ea580c',
  },
];

export function BudgetPage({}: BudgetPageProps) {
  return (
    <Container>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          {/* Общий бюджет */}
          <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-700">Бюджет на январь 2025</Text>

            <View className="mb-4 rounded-lg bg-blue-50 p-4">
              <View className="mb-2 flex-row justify-between">
                <Text className="text-blue-600">Запланировано:</Text>
                <Text className="font-bold text-blue-700">₽50,000</Text>
              </View>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-blue-600">Потрачено:</Text>
                <Text className="font-bold text-blue-700">₽40,800</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-blue-600">Остается:</Text>
                <Text className="font-bold text-green-600">₽9,200</Text>
              </View>
            </View>

            {/* Прогресс бар */}
            <View className="mb-2 h-3 rounded-full bg-gray-200">
              <View className="h-3 rounded-full bg-blue-500" style={{ width: '81.6%' }} />
            </View>
            <Text className="text-center text-sm text-gray-600">Использовано 81.6% бюджета</Text>
          </View>

          {/* Кнопка создания нового бюджета */}
          <TouchableOpacity className="mb-4 rounded-lg bg-blue-500 p-4">
            <View className="flex-row items-center justify-center">
              <Ionicons name="add-circle" size={24} color="white" />
              <Text className="ml-2 font-semibold text-white">Создать новую категорию</Text>
            </View>
          </TouchableOpacity>

          {/* Категории бюджета */}
          <View className="rounded-lg bg-white p-4 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-700">Категории</Text>

            <View className="space-y-4">
              {budgetCategories.map((category, index) => {
                const percentage = (category.spent / category.budgeted) * 100;
                const isOverBudget = category.spent > category.budgeted;

                return (
                  <View key={index} className="border-b border-gray-100 pb-4">
                    <View className="mb-2 flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View
                          className="mr-3 rounded-full p-2"
                          style={{ backgroundColor: `${category.color}20` }}>
                          <Ionicons name={category.icon} size={20} color={category.color} />
                        </View>
                        <Text className="font-medium text-gray-800">{category.name}</Text>
                      </View>
                      <View className="items-end">
                        <Text
                          className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-700'}`}>
                          ₽{category.spent.toLocaleString()} / ₽{category.budgeted.toLocaleString()}
                        </Text>
                        <Text
                          className={`text-sm ${isOverBudget ? 'text-red-500' : 'text-gray-500'}`}>
                          {percentage.toFixed(1)}%
                        </Text>
                      </View>
                    </View>

                    <View className="h-2 rounded-full bg-gray-200">
                      <View
                        className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
