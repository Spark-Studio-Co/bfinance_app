import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowDown from '~/shared/icons/ArrowDown';
import ArrowUp from '~/shared/icons/ArrowUp';
import { Button, Text } from '~/shared/ui';
import { useTotalBalance } from './hooks/useTotalBalance';

export const TotalBalanceTab = () => {
  const navigation = useNavigation();

  const { balance, currency, isLoading, error, formattedBalance, currencySymbol } =
    useTotalBalance();

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

  return (
    <View className="mt-[16px]  flex w-full flex-col">
      <Text weight="regular" style={totalBalanceStyle} className=" text-[#484848]">
        Total balance
      </Text>

      {/* Balance Display */}
      <View className=" flex flex-row items-center font-bold">
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : error ? (
          <Text weight="bold" className="font-bold text-red-400" style={balanceStyle}>
            Error loading balance
          </Text>
        ) : (
          <>
            <Text weight="bold" className="font-bold text-white/50" style={balanceStyle}>
              {currencySymbol}
            </Text>
            <Text weight="bold" className="font-bold text-white" style={balanceStyle}>
              {formattedBalance}
            </Text>
          </>
        )}
      </View>

      {/* Action Buttons */}
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
