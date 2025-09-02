import React from 'react';
import { Pressable, View } from 'react-native';
import CheckIcon from '../icons/CheckIcon';
import { useResponsive } from '../hooks/useResponsive';

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
  const { s } = useResponsive();

  const checkboxStyle = {
    height: s(20),
    width: s(20),
    borderRadius: s(4),
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
