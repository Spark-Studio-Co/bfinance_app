import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { MainLayout } from '~/app/layouts/MainLayout';
import PlusIcon from '~/shared/icons/CurrenciesIcons/PlusIcon';
import TopRightIcon from '~/shared/icons/CurrenciesIcons/TopRightIcon';

import { CurrencyOperationCard } from '~/features/Currencies/CurrenciesCard';
import DollarIcon from '~/shared/icons/CurrenciesIcons/DollarIcon';

interface CurrencyDetailsPageProps {
  route?: {
    params?: {
      code?: string; // 'USD', 'BTC'
      name?: string; // 'US Dollars'
      amount?: number; // 100
      secondary?: string; // '238,98$'
      iconChar?: string; // '$'
    };
  };
}

export const CurrencyDetailsPage: React.FC<CurrencyDetailsPageProps> = ({ route }) => {
  // Заглушки если нет params
  const {
    code = 'USD',
    name = 'US Dollars',
    amount = 100,
    secondary = '238,98$',
    iconChar = '$',
  } = route?.params || {};

  const formatAmount = (v: number) =>
    v
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      .concat(` ${code}`);

  const operations = useMemo(
    () => [
      {
        id: '1',
        title: 'Account topup',
        time: '19:20',
        amount: 200,
        currency: code,
        direction: 'in' as const,
      },
      {
        id: '2',
        title: 'Withdrawal',
        time: '18:09',
        amount: -100,
        currency: code,
        direction: 'out' as const,
      },
    ],
    [code]
  );

  return (
    <MainLayout
      isTitle
      isBack
      isIcon
      iconPosition="before"
      title={name}
      icon={<DollarIcon />}
      isScroll>
      {/* Amount */}
      <View className="mt-[32px]">
        <Text className="mb-2 text-[32px] font-bold text-white">{formatAmount(amount)}</Text>
        <Text className="text-[16px] text-[#7A7A7A]">{secondary}</Text>
      </View>

      {/* Actions */}
      <View className="mb-[32px] mt-[32px] flex flex-row justify-center gap-[128px]">
        <TouchableOpacity className="flex flex-col items-center gap-[12px]">
          <PlusIcon />
          <Text className="text-[14px] font-semibold text-white">Topup</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-col items-center gap-[12px]">
          <TopRightIcon />
          <Text className="text-[14px] font-semibold text-white">Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* TODAY label */}
      <Text className="mb-4 text-[13px] font-normal text-[#AAAAAA]">TODAY</Text>

      {/* Operations list */}
      <View className="pb-12">
        {operations.map((op) => (
          <CurrencyOperationCard key={op.id} op={op} />
        ))}
      </View>
    </MainLayout>
  );
};
