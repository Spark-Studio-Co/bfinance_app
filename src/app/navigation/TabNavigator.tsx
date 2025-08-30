import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomePage } from '../../pages/home';
import { FinancePage } from '../../pages/finance';
import { BudgetPage } from '../../pages/budget';
import { SettingsPage } from '../../pages/settings/';
import type { TabParamList } from '../../shared/types/navigation';
import { TransactionHistoryScreen } from '~/pages/history/HistoryPage';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomePage} options={{ title: 'Главная' }} />
      <Tab.Screen name="Finance" component={FinancePage} options={{ title: 'Финансы' }} />
      <Tab.Screen name="Budget" component={BudgetPage} options={{ title: 'Бюджет' }} />
      <Tab.Screen name="Settings" component={SettingsPage} options={{ title: 'Настройки' }} />
      <Tab.Screen name="History" component={TransactionHistoryScreen} />
    </Tab.Navigator>
  );
}
