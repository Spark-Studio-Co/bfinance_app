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
  const checkboxStyle = {
    height: 20,
    width: 20,
    borderRadius: 4,
  };

  return (
    <Pressable
      onPress={() => !disabled && onChange(!checked)}
      className={className}
      disabled={disabled}>
      <View
        className={`items-center justify-center
        ${checked ? 'bg-[#00E675]' : 'bg-white'} 
        ${disabled ? 'opacity-50' : ''}`}
        style={checkboxStyle}>
        {checked && <CheckIcon />}
      </View>
    </Pressable>
  );
};
