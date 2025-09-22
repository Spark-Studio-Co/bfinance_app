import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowDown from '~/shared/icons/ArrowDown';
import ArrowUp from '~/shared/icons/ArrowUp';
import { Button, Text } from '~/shared/ui';

export const TotalBalanceTab = () => {
  const navigation = useNavigation();

  const balanceStyle = {
    fontSize: 40,
  };

  const totalBalanceStyle = {
    fontSize: 16,
    lineHeight: 22,
  };

  const buttonStyle = {
    height: 42,
    fontSize: 18,
    flex: 1,
  };

  const formatNumber = (num: number | string) => {
    if (typeof num !== 'number') num = Number(num);
    return num.toLocaleString('en-US');
  };

  const balance = 1348;

  return (
    <View className="mt-[16px]  flex w-full flex-col">
      <Text weight="regular" style={totalBalanceStyle} className=" text-[#484848]">
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
          weight="medium"
          style={buttonStyle}
          className="text-black"
          icon={<ArrowDown color="black" size={13} />}
          onPress={() => navigation.navigate('TopUp' as never)}
        />
        <Button
          variant="outline"
          weight="medium"
          label="Withdraw"
          labelClassName="text-white"
          style={buttonStyle}
          icon={<ArrowUp color="white" size={13} />}
          onPress={() => navigation.navigate('WithdrawalCryptoSelection' as never)}
        />
      </View>
    </View>
  );
};
