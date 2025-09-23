import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Platform, View } from 'react-native';

import { HomePage } from '../../pages/home';
import type { TabParamList } from '../../shared/types/navigation';
import HouseIcon from '~/shared/icons/HouseIcon';
import PaymentIcon from '~/shared/icons/PaymentIcon';
import ServiceIcon from '~/shared/icons/ServiceIcon';
import { CardsPage } from '~/pages/cards/CardsPage';
import { ServicesPage } from '~/pages/services/ServicesPage';
import { useTabStore } from '~/shared/store/useTabStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<TabParamList>();

// Анимированный компонент для иконок
const AnimatedTabIcon = ({
  children,
  focused,
  onPress,
}: {
  children: React.ReactNode;
  focused: boolean;
  onPress?: () => void;
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.7);
  const backgroundColor = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.15 : 1, {
      damping: 15,
      stiffness: 200,
    });
    opacity.value = withTiming(focused ? 1 : 0.7, {
      duration: 200,
    });
    backgroundColor.value = withTiming(focused ? 1 : 0, {
      duration: 300,
    });
  }, [focused]);

  const handlePress = () => {
    // Анимация пульсации при нажатии
    pulseScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withSpring(1, { damping: 15, stiffness: 200 })
    );
    onPress?.();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const bgOpacity = interpolate(backgroundColor.value, [0, 1], [0, 0.15]);
    return {
      transform: [{ scale: scale.value * pulseScale.value }],
      opacity: opacity.value,
      backgroundColor: `rgba(0, 230, 117, ${bgOpacity})`,
      borderRadius: 12,
      padding: 8,
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export function TabNavigator() {
  const { activeTab, setActiveTab } = useTabStore();
  const [key, setKey] = useState(0);
  const slideAnim = useSharedValue(0);
  const insets = useSafeAreaInsets();

  // Force re-render when activeTab changes to switch to the correct tab
  useEffect(() => {
    // Анимация слайда при смене таба
    slideAnim.value = withTiming(1, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(setKey)((prev) => prev + 1);
        slideAnim.value = 0;
      }
    });
  }, [activeTab]);

  return (
    <>
      <Tab.Navigator
        key={key}
        initialRouteName={activeTab as keyof TabParamList}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: '#0F0F0F',
            paddingTop: 10.5,
            paddingBottom: 20,
            height: 65,
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
          },
          tabBarShowLabel: false,
          tabBarBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: '#0F0F0F',
                borderTopWidth: 1,
                borderTopColor: '#2A2A2A',
              }}
            />
          ),
        }}
        screenListeners={{
          state: (e) => {
            const routeName = e.data?.state?.routeNames[e.data?.state?.index];
            if (routeName) {
              setActiveTab(routeName);
            }
          },
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
          name="Services"
          component={ServicesPage}
          options={{
            tabBarIcon: ({ focused }) => <ServiceIcon color={focused ? '#00E675' : '#A2ACB0'} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
