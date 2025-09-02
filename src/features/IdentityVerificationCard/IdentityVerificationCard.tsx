// components/IdentityVerificationCard.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '~/shared/ui';
import { useResponsive } from '~/shared/hooks/useResponsive';

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
  const { s } = useResponsive();
  const inactiveCls = !isActive ? 'opacity-50' : '';

  const cardStyle = {
    borderRadius: s(16),
    padding: s(24),
  };

  const titleStyle = {
    fontSize: s(20),
  };

  const subtitleStyle = {
    marginTop: s(6),
    fontSize: s(12),
  };

  const stepsContainerStyle = {
    marginTop: s(16.5),
    gap: s(8),
  };

  const stepIconStyle = {
    marginRight: s(12),
  };

  const stepTextStyle = {
    fontSize: s(13),
    letterSpacing: 1,
  };

  const buttonStyle = {
    marginTop: s(16),
    height: s(36),
    borderRadius: s(20),
  };

  const buttonTextStyle = {
    fontSize: s(15),
    letterSpacing: -0.23,
  };

  return (
    <View className={`w-full bg-[#0F0F0F] ${inactiveCls} ${className}`} style={cardStyle}>
      {/* Header */}
      <Text
        weight="semibold"
        className={isActive ? 'text-white' : 'text-[#9CA3AF]'}
        style={titleStyle}>
        {title}
      </Text>

      {!!subtitle && (
        <Text
          weight="regular"
          className={isActive ? 'text-[#FFFFFF80]' : 'text-[#6B7280]'}
          style={subtitleStyle}>
          {subtitle}
        </Text>
      )}

      {/* Steps */}
      <View style={stepsContainerStyle}>
        {steps.map((s, i) => (
          <View key={`${s.label}-${i}`} className="flex-row items-center">
            <View style={stepIconStyle}>
              {s.icon ?? (
                <View className="h-full w-full rounded-full border border-emerald-500 bg-emerald-500/15" />
              )}
            </View>
            <Text
              weight="regular"
              className={isActive ? 'text-white' : 'text-[#9CA3AF]'}
              style={stepTextStyle}>
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
          className="items-center justify-center bg-[#FFFFFF14]"
          style={buttonStyle}>
          <Text weight="semibold" className="text-[#FFFFFFF2]" style={buttonTextStyle}>
            {ctaLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
