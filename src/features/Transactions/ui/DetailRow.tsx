import React from 'react';
import { View } from 'react-native';
import { Typography } from '~/shared/ui/Typography';

interface DetailRowProps {
  label: string;
  value: string;
  variant?: 'normal' | 'error';
}

export const DetailRow: React.FC<DetailRowProps> = ({ label, value, variant = 'normal' }) => {
  return (
    <View className="mb-3 flex-row items-center justify-between rounded-xl bg-gray-900 p-4">
      <Typography
        variant="body"
        className={variant === 'error' ? 'font-semibold text-white' : 'text-white'}>
        {label}
      </Typography>
      <Typography
        variant="body"
        className={`${variant === 'error' ? 'text-gray-400' : 'text-gray-400'}`}>
        {value}
      </Typography>
    </View>
  );
};
