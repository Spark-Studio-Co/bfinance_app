import React from 'react';
import { TextInput } from 'react-native';
import { useResponsive } from '../hooks/useResponsive';

type Variant = 'dark' | 'outline' | 'ghost';

export interface InputProps extends Omit<React.ComponentProps<typeof TextInput>, 'style'> {
  variant?: Variant;
  className?: string;
  style?: object;
}

export const INPUT_VARIANTS: Record<Variant, string> = {
  dark: 'bg-[#0F0F0F] font-[400] text-white',
  outline: 'bg-transparent border border-zinc-300',
  ghost: 'bg-transparent border-0',
};

export const Input: React.FC<InputProps> = ({
  variant = 'dark',
  className = '',
  style,
  ...props
}) => {
  const { s } = useResponsive();

  const combinedStyle = {
    paddingHorizontal: s(16),
    paddingVertical: s(12),
    fontSize: s(17),
    borderRadius: s(12),
    height: s(48),
    ...style,
  };

  return (
    <TextInput
      {...props}
      style={combinedStyle}
      autoCapitalize="none"
      className={`w-full placeholder:text-[#78797E] ${INPUT_VARIANTS[variant]} ${className}`}
    />
  );
};
