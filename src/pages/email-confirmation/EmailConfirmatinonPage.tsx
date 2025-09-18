import { AuthLayout } from '~/app/layouts/AuthLayout';
import { Text } from '~/shared/ui';
import { Button } from '~/shared/ui/Button';
import { Input } from '~/shared/ui/Input';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '~/shared/hooks/useResponsive';
import { useErrorHandler } from '~/shared/hooks/useErrorHandler';

export const EmailConfirmationPage = () => {
  const navigation = useNavigation();
  const { s } = useResponsive();
  const { showError } = useErrorHandler();
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleConfirm = () => {
    if (!confirmationCode.trim()) {
      showError('Please enter confirmation code');
      return;
    }

    if (confirmationCode.trim().length < 4) {
      showError('Confirmation code must be at least 4 characters');
      return;
    }

    // Here you would normally validate the code with the server
    // For now, we'll just navigate to the next screen
    navigation.navigate('SignUp' as never);
  };

  return (
    <AuthLayout isBack title="Email Confirmation">
      <Text
        weight="regular"
        style={{
          marginTop: 24,
          maxWidth: 343,
          fontSize: 14,
          color: 'white',
        }}>
        We have just sent a confirmation code to <Text weight="semibold">john@example.com</Text>.
        Enter it in the field below.
      </Text>
      <Input
        placeholder="Enter confirmation code"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
        keyboardType="numeric"
        maxLength={6}
        style={{ marginTop: 24, height: 48 }}
      />
      <Button
        onPress={handleConfirm}
        label="Confirm"
        style={{ marginTop: 12, height: 48 }}
        weight="semibold"
        labelClassName="text-[#000000]"
        variant="light"
      />
    </AuthLayout>
  );
};
