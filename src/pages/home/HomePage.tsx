import type { TabScreenProps } from '../../shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { TotalBalanceTab } from '~/widgets/ui/TotalBalanceTab';
import { ProfileAvatar } from '~/shared/ui/ProfileAvatar';
import { ItemsList } from '~/features/ItemsList/ItemList';

type HomePageProps = TabScreenProps<'Home'>;

export function HomePage({}: HomePageProps) {
  return (
    <MainLayout>
      <ProfileAvatar />
      <TotalBalanceTab />
      <ItemsList title="FIAT" isFiat />
      <ItemsList title="CRYPTO" isCrypto />
    </MainLayout>
  );
}
