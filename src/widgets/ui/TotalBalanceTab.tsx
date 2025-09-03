import { View } from 'react-native';
import { useResponsive } from '~/shared/hooks';
import ArrowDown from '~/shared/icons/ArrowDown';
import ArrowUp from '~/shared/icons/ArrowUp';
import { Button, Text } from '~/shared/ui';

export const TotalBalanceTab = () => {
  const { s } = useResponsive();

  const balanceStyle = {
    fontSize: s(40),
    letterSpacing: s(-0.4),
  };

  const totalBalanceStyle = {
    fontSize: s(16),
    lineHeight: s(22),
    letterSpacing: s(-0.4),
  };

  const buttonStyle = {
    height: s(40),
    fontSize: s(15),
    flex: 1,
  };

  const formatNumber = (num: number | string) => {
    if (typeof num !== 'number') num = Number(num);
    return num.toLocaleString('en-US');
  };

  const balance = 1348;

  return (
    <View className="mt-[16px]  flex w-full flex-col">
      <Text weight="medium" style={totalBalanceStyle} className="font-[510] text-[#484848]">
        Total balance
      </Text>
      <View className=" flex flex-row font-bold">
        <Text weight="bold" className="font-bold text-white/50" style={balanceStyle}>
          $
        </Text>
        <Text weight="bold" className="font-bold text-white" style={balanceStyle}>
          {formatNumber(balance)}
        </Text>
      </View>
      <View className="mt-[12px] flex w-full flex-row items-center justify-between gap-[6px]">
        <Button
          variant="neon"
          label="Top-up"
          weight="bold"
          style={buttonStyle}
          className="text-black"
          icon={<ArrowDown color="black" size={s(13)} />}
        />
        <Button
          variant="outline"
          weight="bold"
          label="Withdraw"
          labelClassName="text-white"
          style={buttonStyle}
          icon={<ArrowUp color="white" size={s(13)} />}
        />
      </View>
    </View>
  );
};
