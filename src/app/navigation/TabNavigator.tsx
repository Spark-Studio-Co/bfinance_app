import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomePage } from '../../pages/home';
import { FinancePage } from '../../pages/finance';
import { BudgetPage } from '../../pages/budget';
import type { TabParamList } from '../../shared/types/navigation';
import HouseIcon from '~/shared/icons/HouseIcon';
import PaymentIcon from '~/shared/icons/PaymentIcon';
import ServiceIcon from '~/shared/icons/ServiceIcon';
import { CardsPage } from '~/pages/cards/CardsPage';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F0F0F',
          borderTopColor: '#2A2A2A',
          borderTopWidth: 1,
          paddingTop: 16.5,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => <HouseIcon color={focused ? '#00E675' : '#A2ACB0'} />,
        }}
      />
      <Tab.Screen
        name="Cards"
        component={CardsPage}
        options={{
          tabBarIcon: ({ focused }) => <PaymentIcon color={focused ? '#00E675' : '#A2ACB0'} />,
        }}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetPage}
        options={{
          tabBarIcon: ({ focused }) => <ServiceIcon color={focused ? '#00E675' : '#A2ACB0'} />,
        }}
      />
    </Tab.Navigator>
  );
}
