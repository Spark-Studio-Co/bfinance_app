import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text } from '~/shared/ui';
import { useResponsive } from '~/shared/hooks/useResponsive';
import * as Clipboard from 'expo-clipboard';

interface QRDepositPageProps {
  route?: {
    params?: {
      currency?: string;
      network?: string;
      address?: string;
      minAmount?: string;
    };
  };
}

// eslint-disable-next-line react/no-unused-prop-types
export const QRDepositPage: React.FC<QRDepositPageProps> = ({ route }) => {
  const { s } = useResponsive();

  // Параметры из навигации или значения по умолчанию
  const currency = route?.params?.currency || 'USDT';
  const network = route?.params?.network || 'The Open Network';
  const address = route?.params?.address || 'UQCj5nBQIRMMfgUuHtuep7AZ5Id64RJShCs0LLYw1vDPALYW';
  const minAmount = route?.params?.minAmount || '0.1 TON';

  // QR код URL (можно заменить на реальный API для генерации QR)

  const handleCopyAddress = async () => {
    try {
      await Clipboard.setStringAsync(address);
      Alert.alert('Успешно', 'Адрес скопирован в буфер обмена');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось скопировать адрес');
    }
  };

  return (
    <MainLayout isTitle isBack title={`${currency} (${network})`}>
      <View className="flex-1 items-center" style={{ padding: s(24) }}>
        {/* QR Code Container */}
        <View
          className="rounded-[12px] bg-[#0F0F0F]"
          style={{
            padding: s(24),
            marginBottom: s(24),
            width: s(340),
          }}>
          {/* QR Code */}
          <View
            className="items-center justify-center overflow-hidden rounded-[20px] bg-white"
            style={{
              height: s(292),
              marginBottom: s(24),
            }}>
            <Image
              source={require('../../../assets/qr.png')}
              style={{
                width: s(293),
                height: s(293),
              }}
              resizeMode="cover"
            />
          </View>

          {/* Address Section */}
          <View style={{ gap: s(12) }}>
            <Text
              weight="medium"
              className="text-center text-white"
              style={{
                fontSize: s(16),
                lineHeight: s(22),
                letterSpacing: 0.06,
              }}>
              {address}
            </Text>

            <TouchableOpacity
              onPress={handleCopyAddress}
              className="items-center justify-center "
              style={{
                height: s(36),
                paddingHorizontal: s(12),
                paddingVertical: s(8),
              }}>
              <Text
                weight="semibold"
                className="text-[#2990FF]"
                style={{
                  fontSize: s(15),
                  lineHeight: s(20),
                  letterSpacing: -0.23,
                }}>
                Copy address
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Warning Text */}
        <View
          className="items-center"
          style={{
            paddingHorizontal: s(40),
            marginTop: s(22),
          }}>
          <Text
            weight="regular"
            className="text-center text-white/70"
            style={{
              fontSize: s(14),
              lineHeight: s(20),
              letterSpacing: 0.06,
              width: s(310),
            }}>
            Send only{' '}
            <Text weight="bold" className="text-white/70">
              {currency}
            </Text>{' '}
            on{' '}
            <Text weight="semibold" className="text-white/70">
              {network},
            </Text>{' '}
            otherwise you risk losing your funds.
            {'\n\n'}
            Minimum deposit amount - {minAmount}
          </Text>
        </View>
      </View>
    </MainLayout>
  );
};
