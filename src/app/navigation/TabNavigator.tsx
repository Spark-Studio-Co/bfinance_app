import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HomePage } from '../../pages/home';
import { FinancePage } from '../../pages/finance';
import { BudgetPage } from '../../pages/budget';
import { SettingsPage } from '../../pages/settings/';
import type { TabParamList } from '../../shared/types/navigation';
import { TransactionHistoryScreen } from '~/pages/history/HistoryPage';
import { TransactionDetailsScreen } from '~/pages/transaction-detail/TransactionDetailsPage';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Finance') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Budget') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen name="Home" component={HomePage} options={{ title: 'Главная' }} />
      <Tab.Screen name="Finance" component={FinancePage} options={{ title: 'Финансы' }} />
      <Tab.Screen name="Budget" component={BudgetPage} options={{ title: 'Бюджет' }} />
      <Tab.Screen name="Settings" component={SettingsPage} options={{ title: 'Настройки' }} />
      <Tab.Screen name="History" component={TransactionHistoryScreen} />
    </Tab.Navigator>
  );
}
