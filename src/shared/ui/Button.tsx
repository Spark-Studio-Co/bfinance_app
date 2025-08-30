import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '.';

type Variant = 'light' | 'dark' | 'ghost';

export type FontWeight =
  | 'ultralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'black';

export interface ButtonProps {
  label: string;
  onPress?: (event: import('react-native').GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode; // Иконка слева
  className?: string; // Кастомные размеры/отступы
  labelClassName?: string; // Кастомный текст
  variant?: Variant; // filled | outline | ghost
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
  theme,
  weight,
}) => {
  const base = 'inline-flex flex-row w-full items-center justify-center gap-2 rounded-[12px]';

  const variantCls =
    variant === 'light'
      ? `bg-white`
      : variant === 'dark'
        ? `bg-[#000000] border-[1px] border-[#454545]`
        : `bg-transparent text-zinc-900 border-0 hover:bg-zinc-50`;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      className={`${base} ${variantCls} ${className}`}>
      {icon && <>{icon}</>}
      <Text weight={weight} className={`${labelClassName}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
