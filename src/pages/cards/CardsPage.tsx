import type { TabScreenProps } from '../../shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { TotalBalanceTab } from '~/widgets/ui/TotalBalanceTab';
import { ProfileAvatar } from '~/shared/ui/ProfileAvatar';
import { ItemsList } from '~/features/ItemsList/ItemList';
import { BannerSwiper } from '~/features/BannerSwiper/BannerSwiper';
import { View } from 'react-native';

type CardsPageProps = TabScreenProps<'Cards'>;

export function CardsPage({}: CardsPageProps) {
  return (
    <MainLayout title="Cards">
      <View></View>
    </MainLayout>
  );
}
