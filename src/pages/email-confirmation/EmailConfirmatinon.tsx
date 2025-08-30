import { View } from 'react-native';
import { AuthLayout } from '~/app/layouts/AuthLayout';
import LogoIcon from '~/shared/icons/LogoIcon';
import { Text } from '~/shared/ui';
import { Button } from '~/shared/ui/Button';
import GoogleIcon from '~/shared/icons/GoogleIcon';
import AppleIcon from '~/shared/icons/AppleIcon';
import { Input } from '~/shared/ui/Input';

export const EmailConfirmation = () => {
  return (
    <AuthLayout isBack title="Email Confirmation">
      <Text weight="regular" className="mt-[24px] max-w-[343px] text-[14px] text-white">
        We have just sent a confirmation code to <Text weight="semibold">john@example.com</Text>.
        Enter it in the field below.
      </Text>
      <Input placeholder="Enter confirmation code" className="mt-[24px] h-[48px]" />
      <Button
        label="Confirm"
        className="mt-[12px] h-[42px]"
        weight="semibold"
        labelClassName="text-[#000000] text-[15px]"
        variant="light"
      />
    </AuthLayout>
  );
};
