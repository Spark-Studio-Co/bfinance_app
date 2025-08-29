import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '../navigation';

interface NavigationProviderProps {
  children?: React.ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  return (
    <NavigationContainer>
      <RootNavigator />
      {children}
    </NavigationContainer>
  );
}
