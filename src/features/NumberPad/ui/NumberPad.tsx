import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { usePinCodeStore } from '~/pages/pin-code/model/use-pin-code-store';
import DeleteIcon from '~/shared/icons/DeleteIcon';
import { Text } from '~/shared/ui';

export const NumberPad = () => {
  const { addDigit, removeDigit } = usePinCodeStore();

  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'delete'],
  ];

  const renderButton = (value: string, index: number) => {
    if (value === '') {
      return <View key={index} className="h-20 w-20" />;
    }

    if (value === 'delete') {
      return (
        <TouchableOpacity
          key={index}
          className="h-20 w-20 items-center justify-center rounded-full"
          onPress={removeDigit}
          activeOpacity={0.7}>
          <DeleteIcon width={24} height={20} color="#00E675" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        className="h-[76px] w-[76px] items-center justify-center rounded-full bg-[#0F0F0F]"
        onPress={() => addDigit(value)}
        activeOpacity={0.7}>
        <Text className="text-[34px] font-light text-white">{value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="pb-10">
      {numbers.map((row, rowIndex) => (
        <View key={rowIndex} className="mb-5 flex-row items-center justify-center gap-[24px]">
          {row.map((number, index) => renderButton(number, rowIndex * 3 + index))}
        </View>
      ))}
    </View>
  );
};
