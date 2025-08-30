import React from 'react';
import { Pressable, View } from 'react-native';
import CheckIcon from '../icons/CheckIcon';

interface CheckboxProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  className,
}) => {
  return (
    <Pressable
      onPress={() => !disabled && onChange(!checked)}
      className={`${className}`}
      disabled={disabled}>
      <View
        className={`h-[20px] w-[20px] items-center justify-center rounded
        ${checked ? 'bg-[#00E675]' : 'bg-white'} 
        ${disabled ? 'opacity-50' : ''}`}>
        {checked && <CheckIcon />}
      </View>
    </Pressable>
  );
};
