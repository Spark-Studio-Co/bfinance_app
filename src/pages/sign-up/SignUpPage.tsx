import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View } from 'react-native';
import { Text } from '~/shared/ui';
import { Linking } from 'react-native';
import { AuthLayout } from '~/app/layouts/AuthLayout';
import { Button } from '~/shared/ui/Button';
import { Checkbox } from '~/shared/ui/Checkbox';
import { Input } from '~/shared/ui/Input';
import { useResponsive } from '~/shared/hooks/useResponsive';

export const SignUpPage = () => {
  const navigation = useNavigation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { s } = useResponsive();

  return (
    <AuthLayout isBack title="Sign Up">
      <Input placeholder="First name" style={{ marginTop: s(24), height: s(48) }} />
      <Input placeholder="Last name" style={{ marginTop: s(12), height: s(48) }} />

      <View
        style={{
          marginTop: s(24),
          flexDirection: 'row',
          alignItems: 'center',
          gap: s(12),
          maxWidth: s(290),
        }}>
        <Checkbox checked={termsAccepted} onChange={setTermsAccepted} />
        <Text
          weight="regular"
          style={{
            fontSize: s(14),
            lineHeight: s(20),
            letterSpacing: -0.23,
            color: 'white',
          }}>
          I agree to the{' '}
          <Text
            style={{ color: '#00E675' }}
            onPress={() => Linking.openURL('https://cdn.bfinance.app/terms-of-use.pdf')}>
            Terms of Use
          </Text>
          ,
          <Text
            style={{ color: '#00E675' }}
            onPress={() => Linking.openURL('https://cdn.bfinance.app/privacy-policy.pdf')}>
            {' '}
            Privacy Policy
          </Text>
          ,
          <Text
            style={{ color: '#00E675' }}
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
        style={{ marginTop: s(24), height: s(42) }}
        weight="semibold"
        labelClassName="text-[#000000]"
        variant="light"
      />
    </AuthLayout>
  );
};
