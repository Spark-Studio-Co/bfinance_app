// components/IdentityVerificationCard.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '~/shared/ui';

type Step = {
  label: string;
  icon?: React.ReactNode;
};

type Props = {
  title: string;
  subtitle?: string;
  steps: Step[];
  ctaLabel: string;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  isActive?: boolean; // активная или приглушённая карточка
};

export const IdentityVerificationCard: React.FC<Props> = ({
  title,
  subtitle,
  steps,
  ctaLabel,
  onPress,
  disabled,
  className = '',
  isActive = true,
}) => {
  const inactiveCls = !isActive ? 'opacity-50' : '';

  return (
    <View className={`w-full rounded-[16px] bg-[#0F0F0F] p-[24px] ${inactiveCls} ${className}`}>
      {/* Header */}
      <Text
        weight="semibold"
        className={`text-[20px] ${isActive ? 'text-white' : 'text-[#9CA3AF]'}`}>
        {title}
      </Text>

      {!!subtitle && (
        <Text
          weight="regular"
          className={`mt-[6px] text-[12px] ${isActive ? 'text-[#FFFFFF80]' : 'text-[#6B7280]'}`}>
          {subtitle}
        </Text>
      )}

      {/* Steps */}
      <View className="mt-[16.5px] gap-y-[8px]">
        {steps.map((s, i) => (
          <View key={`${s.label}-${i}`} className="flex-row items-center">
            <View className="mr-3">
              {s.icon ?? (
                <View className="h-[20px] w-[20px] rounded-full border border-emerald-500 bg-emerald-500/15" />
              )}
            </View>
            <Text
              weight="regular"
              className={`text-[13px] ${isActive ? 'text-white' : 'text-[#9CA3AF]'}`}
              style={{ letterSpacing: 1 }}>
              {s.label}
            </Text>
          </View>
        ))}
      </View>

      {isActive && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
          disabled={disabled}
          className="mt-[16px] h-[36px] items-center justify-center rounded-[20px] bg-[#FFFFFF14]">
          <Text weight="semibold" className="text-[15px] tracking-[-0.23px] text-[#FFFFFFF2]">
            {ctaLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
