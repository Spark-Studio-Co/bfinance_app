import { View } from 'react-native';
import { useEffect } from 'react';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text } from '~/shared/ui';
import CardSuccessIcon from '~/shared/icons/CardSuccessIcon';

import { useNavigation } from '@react-navigation/native';

export function CardSuccessPage() {
  const navigation = useNavigation();

  const navigateToCards = () => {
    navigation.navigate('Main', { initialTab: 'Cards' });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToCards();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout isTitle title="Card issuance" isBack onPrevStep={{ onPress: navigateToCards }}>
      <View className="flex-1 items-center justify-center">
        <View className="items-center">
          <CardSuccessIcon />

          <View className="items-center">
            <Text weight="semibold" className="mb-1 text-center text-[20px] text-white">
              Success!
            </Text>

            <Text
              weight="regular"
              className="max-w-[246px] text-center text-[17px] leading-[22px] text-[#aaaaaa]">
              The request for card issuance has been accepted. It will be issued very soon
            </Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
}
