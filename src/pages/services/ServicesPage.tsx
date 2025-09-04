import type { TabScreenProps } from '../../shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { View, ScrollView } from 'react-native';
import { ServiceItem } from '~/features/ServiceItem/ServiceItem';
import PlusIcon from '~/shared/icons/PlusIcon';
import ESimIcon from '~/shared/icons/ESimIcon';
import FlightIcon from '~/shared/icons/FlightIcon';
import HotelIcon from '~/shared/icons/HotelIcon';
import AirportLoungeIcon from '~/shared/icons/AirportLoungeIcon';

type ServicesPageProps = TabScreenProps<'Services'>;

export function ServicesPage({}: ServicesPageProps) {
  const services = [
    {
      id: 1,
      icon: <ESimIcon size={32} />,
      title: 'eSIM',
      description: 'Stay connected wherever you are',
      status: 'soon' as const,
    },
    {
      id: 2,
      icon: <FlightIcon size={32} />,
      title: 'Flights',
      description: 'Buy airline tickets directly in the app',
      status: 'soon' as const,
    },
    {
      id: 3,
      icon: <HotelIcon size={32} />,
      title: 'Stays',
      description: 'Book accommodations worldwide',
      status: 'soon' as const,
    },
    {
      id: 4,
      icon: <AirportLoungeIcon size={32} />,
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
    <MainLayout isTitle title="Services" isIcon icon={<PlusIcon />}>
      <ScrollView
        className="flex-1 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}>
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            status={service.status}
            onPress={() => handleServicePress(service.id)}
          />
        ))}
      </ScrollView>
    </MainLayout>
  );
}
