import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from './Text';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Please try again later',
  onRetry,
  retryText = 'Retry',
  className = '',
}) => {
  return (
    <View className={`flex-1 items-center justify-center px-6 ${className}`}>
      <Text className="mb-2 text-center text-lg font-semibold text-red-500">{title}</Text>
      <Text className="mb-6 text-center text-[#AAAAAA]">{message}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} className="rounded-[12px] bg-[#007AFF] px-6 py-3">
          <Text className="font-medium text-white">{retryText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
