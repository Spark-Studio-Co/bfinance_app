import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { MainLayout } from '~/app/layouts/MainLayout';
// import Clipboard from '@react-native-clipboard/clipboard';
import { CopyCard } from '~/features/TopUp/TopUpDetailCopyCard';

type BankDetailItem = {
  id: string;
  value: string;
  caption: string;
};

interface TopUpDetailPageProps {
  route?: {
    params?: {
      title?: string;
      details?: Partial<
        Record<
          | 'currency'
          | 'name'
          | 'accountNumber'
          | 'accountType'
          | 'swift'
          | 'bankAddress'
          | 'reference',
          string
        >
      >;
    };
  };
}

export const TopUpDetailPage: React.FC<TopUpDetailPageProps> = ({ route }) => {
  const title = route?.params?.title ?? 'Dollars';

  const defaults = {
    currency: 'USD',
    name: 'BFinance Technologies LTD',
    accountNumber: '8314031210',
    accountType: 'Checking',
    swift: 'CMFGUS33',
    bankAddress: 'Community Federal Savings Bank',
    reference: '#IS938BS7K3',
  };

  const details = { ...defaults, ...(route?.params?.details ?? {}) };

  const items: BankDetailItem[] = useMemo(
    () => [
      { id: 'currency', value: details.currency, caption: 'Currency' },
      { id: 'name', value: details.name, caption: 'Name' },
      { id: 'accountNumber', value: details.accountNumber, caption: 'Account number' },
      { id: 'accountType', value: details.accountType, caption: 'Account type' },
      { id: 'swift', value: details.swift, caption: 'SWIFT/BIC' },
      { id: 'bankAddress', value: details.bankAddress, caption: 'Bank address' },
      { id: 'reference', value: details.reference, caption: 'Reference' },
    ],
    [details]
  );

  const handleCopy = (text: string) => {
    try {
    } catch (e) {
      console.warn('Clipboard is not available', e);
    }
  };

  return (
    <MainLayout isTitle isBack title={title} isScroll>
      <View className="mt-8">
        {items.map((it) => (
          <CopyCard
            key={it.id}
            value={it.value}
            caption={it.caption}
            onPress={() => handleCopy(it.value)}
          />
        ))}
      </View>

      <View className="mt-6 items-center">
        <Text className="text-[14px] text-[#B2B2B2]">Click on item to copy</Text>
      </View>
    </MainLayout>
  );
};

export default TopUpDetailPage;
