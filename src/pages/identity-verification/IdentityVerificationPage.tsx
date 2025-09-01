import { AuthLayout } from '~/app/layouts/AuthLayout';
import { IdentityVerificationCard } from '~/features/IdentityVerificationCard/IdentityVerificationCard';
import { Text } from '~/shared/ui';
import { Button } from '~/shared/ui/Button';

import GreenBookIcon from '~/shared/icons/GreenBookIcon';
import GreenCheckmarkIcon from '~/shared/icons/GreenCheckmarkIcon';
import GreenPinIcon from '~/shared/icons/GreenPinIcon';

import { useNavigation } from '@react-navigation/native';

export const IdentityVerificationPage = () => {
  const navigation = useNavigation();

  return (
    <AuthLayout>
      <Text weight="semibold" className="mt-[24px] text-[20px] text-white">
        Identity Verification
      </Text>
      <Text
        weight="regular"
        className="mt-[12px] max-w-[290px] text-[14px] leading-[22px] tracking-[-0.43px] text-[#FFFFFFCC]">
        Due to regulatory restrictions, every client is required to undergo a “know your customer
        (KYC)” process. It will take a few minutes
      </Text>
      <IdentityVerificationCard
        className="mt-[24px]"
        title="Basic"
        subtitle="Full access to the application"
        steps={[
          { icon: <GreenBookIcon />, label: 'Photo of your ID' },
          { icon: <GreenCheckmarkIcon />, label: 'Liveness check' },
        ]}
        ctaLabel="Start"
        onPress={() => navigation.navigate('Profile' as never)}
      />
      <IdentityVerificationCard
        className="mt-[24px]"
        title="Advanced"
        subtitle="Increased limits"
        steps={[{ icon: <GreenPinIcon />, label: 'Proof of address' }]}
        ctaLabel="Start"
        onPress={() => {}}
        isActive={false}
      />

      <Button
        className="mt-auto h-[42px]"
        weight="semibold"
        labelClassName="text-[#FFFFFFF2] text-[15px]"
        onPress={() => navigation.navigate('Start' as never)}
        variant="dark"
        label="Log out"
      />
    </AuthLayout>
  );
};
