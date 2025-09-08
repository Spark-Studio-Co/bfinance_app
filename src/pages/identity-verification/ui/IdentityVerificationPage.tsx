import { AuthLayout } from '~/app/layouts/AuthLayout';
import { IdentityVerificationCard } from '~/features/IdentityVerificationCard/IdentityVerificationCard';
import { Text } from '~/shared/ui';
import { Button } from '~/shared/ui/Button';
import GreenBookIcon from '~/shared/icons/GreenBookIcon';
import GreenCheckmarkIcon from '~/shared/icons/GreenCheckmarkIcon';
import GreenPinIcon from '~/shared/icons/GreenPinIcon';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '~/shared/hooks/useResponsive';
import { useVerificationStore } from '../model/use-verification-store';

export const IdentityVerificationPage = () => {
  const navigation = useNavigation();
  const { s } = useResponsive();
  const {
    isBasicVerificationSuccess,
    isAdvancedVerificationSuccess,
    basicVerificationStep,
    advancedVerificationStep,
    startBasicVerification,
    startAdvancedVerification,
  } = useVerificationStore();

  return (
    <AuthLayout isBack title="Identity Verification">
      <Text
        weight="regular"
        style={{
          marginTop: s(12),
          maxWidth: s(290),
          fontSize: s(14),
          lineHeight: s(22),
          letterSpacing: -0.43,
          color: '#FFFFFFCC',
        }}>
        Due to regulatory restrictions, every client is required to undergo a "know your customer
        (KYC)" process. It will take a few minutes
      </Text>
      <IdentityVerificationCard
        className="mt-6"
        title="Basic"
        subtitle="Full access to the application"
        steps={[
          { icon: <GreenBookIcon />, label: 'Photo of your ID' },
          { icon: <GreenCheckmarkIcon />, label: 'Liveness check' },
        ]}
        ctaLabel={'Start'}
        onPress={() => {
          if (!isBasicVerificationSuccess && basicVerificationStep !== 'in-progress') {
            startBasicVerification();
            navigation.navigate('IdentityVerificationInner' as never);
          }
        }}
        isActive={!isBasicVerificationSuccess}
      />
      <IdentityVerificationCard
        className="mt-6"
        title="Advanced"
        subtitle="Increased limits"
        steps={[{ icon: <GreenPinIcon />, label: 'Proof of address' }]}
        ctaLabel={'Start'}
        onPress={() => {
          if (
            isBasicVerificationSuccess &&
            !isAdvancedVerificationSuccess &&
            advancedVerificationStep !== 'in-progress'
          ) {
            startAdvancedVerification();
            navigation.navigate('IdentityVerificationInner' as never);
          }
        }}
        isActive={isBasicVerificationSuccess && !isAdvancedVerificationSuccess}
      />

      <Button
        style={{ marginTop: 'auto', height: s(42) }}
        weight="semibold"
        labelClassName="text-[#FFFFFFF2]"
        onPress={() => navigation.navigate('PinCode' as never)}
        variant="dark"
        label="PIN CODE"
      />

      {/* <Button
        style={{ marginTop: 'auto', height: s(42) }}
        weight="semibold"
        labelClassName="text-[#FFFFFFF2]"
        onPress={() => navigation.navigate('Start' as never)}
        variant="dark"
        label="Log out"
      /> */}
    </AuthLayout>
  );
};
