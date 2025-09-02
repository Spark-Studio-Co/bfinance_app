import React from 'react';
import { TextInput } from 'react-native';

type Variant = 'dark' | 'outline' | 'ghost';

export interface InputProps extends Omit<React.ComponentProps<typeof TextInput>, 'style'> {
  variant?: Variant;
  className?: string;
}

export const INPUT_VARIANTS: Record<Variant, string> = {
  dark: 'bg-[#0F0F0F] text-[17px] font-[400] text-white',
  outline: 'bg-transparent border border-zinc-300',
  ghost: 'bg-transparent border-0',
};

export const Input: React.FC<InputProps> = ({ variant = 'dark', className = '', ...props }) => {
  return (
    <TextInput
      {...props}
      className={`w-full rounded-[12px] px-4 placeholder:text-[#78797E] ${INPUT_VARIANTS[variant]} ${className}`}
    />
  );
};
