import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '.';
import { useResponsive } from '../hooks/useResponsive';

type Variant = 'light' | 'dark' | 'ghost' | 'neon' | 'outline';

export type FontWeight =
  | 'ultralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'black';

export interface ButtonProps {
  style?: object;
  label: string;
  onPress?: (event: import('react-native').GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  variant?: Variant;
  theme?: {
    bg?: string;
    text?: string;
    border?: string;
    hover?: string;
  };
  weight?: FontWeight;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled,
  loading,
  icon,
  className = '',
  labelClassName = '',
  variant = 'light',
  weight = 'semibold',
  style,
}) => {
  const { s } = useResponsive();

  const base = 'inline-flex flex-row w-full items-center justify-center';

  const variantCls =
    variant === 'light'
      ? `bg-white`
      : variant === 'dark'
        ? `bg-[#000000] border-[1px] border-[#454545]`
        : variant === 'neon'
          ? `bg-transparent` // add more neon-specific classes here if needed
          : variant === 'outline'
            ? `bg-transparent border-[1px] border-[#484848]`
            : `bg-transparent text-zinc-900 border-0 hover:bg-zinc-50`;

  const combinedStyle = {
    borderRadius: variant === 'neon' ? s(10) : s(12),
    gap: s(8),
    ...style,
  };

  const labelStyle = {
    fontSize: s(15),
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      className={`${base} ${variantCls} ${className}`}
      style={combinedStyle}>
      {icon && <>{icon}</>}
      <Text weight={weight} className={labelClassName} style={labelStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
