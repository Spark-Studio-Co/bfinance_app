import { AuthLayout } from '~/app/layouts/AuthLayout';
import { Text } from '~/shared/ui';
import { Button } from '~/shared/ui/Button';
import { Input } from '~/shared/ui/Input';

import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '~/shared/hooks/useResponsive';

export const EmailConfirmationPage = () => {
  const navigation = useNavigation();
  const { s } = useResponsive();

  return (
    <AuthLayout isBack title="Email Confirmation">
      <Text
        weight="regular"
        style={{
          marginTop: s(24),
          maxWidth: s(343),
          fontSize: 14,
          color: 'white',
        }}>
        We have just sent a confirmation code to <Text weight="semibold">john@example.com</Text>.
        Enter it in the field below.
      </Text>
      <Input placeholder="Enter confirmation code" style={{ marginTop: s(24), height: s(48) }} />
      <Button
        onPress={() => navigation.navigate('SignUp' as never)}
        label="Confirm"
        style={{ marginTop: s(12), height: 42 }}
        weight="semibold"
        labelClassName="text-[#000000]"
        variant="light"
      />
    </AuthLayout>
  );
};
