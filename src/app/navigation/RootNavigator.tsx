import { StatusBar } from 'react-native';
import { MainStack } from './MainStack';
import { AuthStack } from './AuthStack';

export const RootNavigator = () => {
  const isAuth = false;

  return (
    <>
      <StatusBar backgroundColor="#000000" />
      {isAuth ? <MainStack /> : <AuthStack />}
    </>
  );
};
