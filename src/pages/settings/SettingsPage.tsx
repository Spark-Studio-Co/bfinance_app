import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '../../shared/ui';
import type { TabScreenProps } from '../../shared/types/navigation';

type SettingsPageProps = TabScreenProps<'Settings'>;

export function SettingsPage({}: SettingsPageProps) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const settingsItems = [
    {
      icon: 'person-circle' as keyof typeof Ionicons.glyphMap,
      title: 'Профиль',
      subtitle: 'Управление личными данными',
      action: () => console.log('Открыть профиль'),
    },
    {
      icon: 'card' as keyof typeof Ionicons.glyphMap,
      title: 'Счета и карты',
      subtitle: 'Управление банковскими счетами',
      action: () => console.log('Открыть счета'),
    },
    {
      icon: 'analytics' as keyof typeof Ionicons.glyphMap,
      title: 'Отчеты',
      subtitle: 'Просмотр финансовых отчетов',
      action: () => console.log('Открыть отчеты'),
    },
    {
      icon: 'cloud-upload' as keyof typeof Ionicons.glyphMap,
      title: 'Резервное копирование',
      subtitle: 'Синхронизация данных',
      action: () => console.log('Резервное копирование'),
    },
    {
      icon: 'shield-checkmark' as keyof typeof Ionicons.glyphMap,
      title: 'Безопасность',
      subtitle: 'Настройки защиты данных',
      action: () => console.log('Безопасность'),
    },
    {
      icon: 'help-circle' as keyof typeof Ionicons.glyphMap,
      title: 'Помощь',
      subtitle: 'Часто задаваемые вопросы',
      action: () => console.log('Помощь'),
    },
    {
      icon: 'information-circle' as keyof typeof Ionicons.glyphMap,
      title: 'О приложении',
      subtitle: 'Версия 1.0.0',
      action: () => console.log('О приложении'),
    },
  ];

  return (
    <Container>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          {/* Профиль пользователя */}
          <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <View className="flex-row items-center">
              <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-blue-500">
                <Text className="text-xl font-bold text-white">ИИ</Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">Иван Иванов</Text>
                <Text className="text-gray-600">ivan@example.com</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Быстрые настройки */}
          <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-700">Быстрые настройки</Text>

            <View className="space-y-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="notifications" size={24} color="#6b7280" />
                  <View className="ml-3">
                    <Text className="font-medium text-gray-800">Уведомления</Text>
                    <Text className="text-sm text-gray-600">Получать push-уведомления</Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#f3f4f6', true: '#3b82f6' }}
                  thumbColor={notificationsEnabled ? '#ffffff' : '#f3f4f6'}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="moon" size={24} color="#6b7280" />
                  <View className="ml-3">
                    <Text className="font-medium text-gray-800">Темная тема</Text>
                    <Text className="text-sm text-gray-600">Использовать темное оформление</Text>
                  </View>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: '#f3f4f6', true: '#3b82f6' }}
                  thumbColor={darkModeEnabled ? '#ffffff' : '#f3f4f6'}
                />
              </View>
            </View>
          </View>

          {/* Основные настройки */}
          <View className="rounded-lg bg-white p-4 shadow-sm">
            <Text className="mb-4 text-lg font-semibold text-gray-700">Настройки</Text>

            <View className="space-y-1">
              {settingsItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center justify-between border-b border-gray-100 py-3"
                  onPress={item.action}>
                  <View className="flex-row items-center">
                    <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <Ionicons name={item.icon} size={20} color="#6b7280" />
                    </View>
                    <View className="flex-1">
                      <Text className="font-medium text-gray-800">{item.title}</Text>
                      <Text className="text-sm text-gray-600">{item.subtitle}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Кнопка выхода */}
          <TouchableOpacity className="mt-4 rounded-lg bg-red-500 p-4">
            <View className="flex-row items-center justify-center">
              <Ionicons name="log-out" size={24} color="white" />
              <Text className="ml-2 font-semibold text-white">Выйти</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}
