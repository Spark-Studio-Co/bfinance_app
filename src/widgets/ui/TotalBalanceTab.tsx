import { View } from 'react-native';
import { useResponsive } from '~/shared/hooks';
import { Text } from '~/shared/ui';

export const TotalBalanceTab = () => {
  const { s } = useResponsive();

  const balanceStyle = {
    fontSize: s(40),
    lineHeight: s(22),
    letterSpacing: s(-0.4),
  };

  const totalBalanceStyle = {
    fontSize: s(16),
    lineHeight: s(22),
    letterSpacing: s(-0.4),
  };

  // Helper to format numbers with commas
  const formatNumber = (num: number | string) => {
    if (typeof num !== 'number') num = Number(num);
    return num.toLocaleString('en-US');
  };

  const balance = 1348;

  return (
    <View className="flex w-full flex-col">
      <Text style={totalBalanceStyle} className="font-[510] text-[#484848]">
        Total balance
      </Text>
      <Text style={balanceStyle} className="mt-[13px] font-[700]">
        <Text className="text-white/50">$</Text>
        <Text className="text-white">{formatNumber(balance)}</Text>
      </Text>
      <View className="flex w-full items-center justify-between"></View>
    </View>
  );
};
