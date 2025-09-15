import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';
import { useTabStore } from '~/shared/store/useTabStore';
import type { RootStackScreenProps } from '~/shared/types/navigation';

export function TabNavigatorWrapper() {
  const route = useRoute<RootStackScreenProps<'Main'>['route']>();
  const { setActiveTab } = useTabStore();

  useEffect(() => {
    const initialTab = route.params?.initialTab;
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [route.params?.initialTab, setActiveTab]);

  return <TabNavigator />;
}
