import { View } from 'react-native';
import HouseIcon from '~/shared/icons/HouseIcon';
import PaymentIcon from '~/shared/icons/PaymentIcon';
import ServiceIcon from '~/shared/icons/ServiceIcon';

export const BottomTab = () => {
  return (
    <View className="flex flex-row items-center justify-between border-t border-[#2A2A2A] bg-[#0F0F0F] px-8 py-4">
      <HouseIcon />
      <PaymentIcon />
      <ServiceIcon />
    </View>
  );
};
