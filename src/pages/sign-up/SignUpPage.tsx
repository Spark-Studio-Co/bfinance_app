import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View } from 'react-native';
import { Text } from '~/shared/ui';
import { Linking } from 'react-native';
import { AuthLayout } from '~/app/layouts/AuthLayout';
import { Button } from '~/shared/ui/Button';
import { Checkbox } from '~/shared/ui/Checkbox';
import { Input } from '~/shared/ui/Input';

export const SignUpPage = () => {
  const navigation = useNavigation();
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <AuthLayout isBack title="Sign Up">
      <Input placeholder="First name" className="mt-[24px] h-[48px]" />
      <Input placeholder="Last name" className="mt-[12px] h-[48px]" />

      <View className="mt-[24px] flex max-w-[290px] flex-row items-center gap-x-3">
        <Checkbox checked={termsAccepted} onChange={setTermsAccepted} />
        <Text
          weight="regular"
          className="align-middle text-[14px] leading-[20px] tracking-[-0.23px] text-white">
          I agree to the{' '}
          <Text
            className="text-[#00E675]"
            onPress={() => Linking.openURL('https://cdn.bfinance.app/terms-of-use.pdf')}>
            Terms of Use
          </Text>
          ,
          <Text
            className="text-[#00E675]"
            onPress={() => Linking.openURL('https://cdn.bfinance.app/privacy-policy.pdf')}>
            {' '}
            Privacy Policy
          </Text>
          ,
          <Text
            className="text-[#00E675]"
            onPress={() => Linking.openURL('https://cdn.bfinance.app/aml-policy.pdf')}>
            {' '}
            AML Policy
          </Text>
          , and the collection and processing of my personal data.
        </Text>
      </View>

      <Button
        onPress={() => navigation.navigate('IdentityVerification' as never)}
        label="Continue"
        className="mt-[24px] h-[42px]"
        weight="semibold"
        labelClassName="text-[#000000] text-[15px]"
        variant="light"
      />
    </AuthLayout>
  );
};
