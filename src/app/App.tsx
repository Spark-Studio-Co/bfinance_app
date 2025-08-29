import { StatusBar } from 'expo-status-bar';
import { NavigationProvider } from './providers';

export function App() {
  return (
    <>
      <NavigationProvider />
      <StatusBar style="auto" />
    </>
  );
}
