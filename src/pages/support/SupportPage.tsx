import { View } from 'react-native';
import { Text } from '~/shared/ui';
import { MainLayout } from '~/app/layouts/MainLayout';
import { SupportTab } from '~/features/SupportTab/ui/SupportTab';

import { useResponsive } from '~/shared/hooks';

import CircleTGIcon from '~/shared/icons/CircleTGIcon';
import WhatsappCircleIcon from '~/shared/icons/WhatsappCircleIcon';
import PhoneCircleIcon from '~/shared/icons/PhoneCircleIcon';

export const SupportPage = () => {
  const supportContent = [
    {
      label: 'Telegram',
      icon: <CircleTGIcon />,
      url: 'https://t.me/bfinsupbot',
    },
    {
      label: 'WhatsApp',
      icon: <WhatsappCircleIcon />,
      url: 'https://t.me/bfinsupbot',
    },
    {
      label: '+1 701 800 0012',
      description: 'United States',
      url: 'tel:+17018000012',
      icon: <PhoneCircleIcon />,
    },
    {
      label: '+44 7700 107074',
      description: 'United Kingdom',
      url: 'tel:+447700107074',
      icon: <PhoneCircleIcon />,
    },
  ];

  return (
    <MainLayout isTitle title="Support" isBack>
      <Text weight="regular" className="mt-6 text-[#AAAAAA]" style={{ fontSize: 13 }}>
        CHAT
      </Text>
      <View className="mt-2 flex flex-col gap-y-2">
        {supportContent.slice(0, 2).map((item, index) => (
          <SupportTab key={index} {...item} />
        ))}
      </View>
      <Text weight="regular" className="mt-6 text-[#AAAAAA]" style={{ fontSize: 13 }}>
        PHONE
      </Text>
      <View className="mt-2 flex flex-col gap-y-2">
        {supportContent.slice(2, 4).map((item, index) => (
          <SupportTab key={index} {...item} />
        ))}
      </View>
    </MainLayout>
  );
};
