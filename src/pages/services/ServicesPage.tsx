import type { TabScreenProps } from '../../shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { View, ScrollView } from 'react-native';
import { ServiceItem } from '~/features/ServiceItem/ServiceItem';
import PlusIcon from '~/shared/icons/PlusIcon';

type ServicesPageProps = TabScreenProps<'Services'>;

export function ServicesPage({}: ServicesPageProps) {
  const services = [
    {
      id: 1,
      image: require('../../../assets/esim.png'),
      title: 'eSIM',
      description: 'Stay connected wherever you are',
      status: 'soon' as const,
    },
    {
      id: 2,
      image: require('../../../assets/plane.png'),
      title: 'Flights',
      description: 'Buy airline tickets directly in the app',
      status: 'soon' as const,
    },
    {
      id: 3,
      image: require('../../../assets/key.png'),
      title: 'Stays',
      description: 'Book accommodations worldwide',
      status: 'soon' as const,
    },
    {
      id: 4,
      image: require('../../../assets/crown.png'),
      title: 'Airport Lounge',
      description: 'Access premium airport lounges',
      status: 'soon' as const,
    },
  ];

  const handleServicePress = (serviceId: number) => {
    console.log('Service pressed:', serviceId);
    // Add navigation or other logic here
  };

  return (
    <MainLayout isTitle title="Services">
      <View className=" gap-y-[12px]">
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            image={service.image}
            title={service.title}
            description={service.description}
            status={service.status}
            onPress={() => handleServicePress(service.id)}
          />
        ))}
      </View>
    </MainLayout>
  );
}
