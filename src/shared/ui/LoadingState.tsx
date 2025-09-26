import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from './Text';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  className = '',
}) => {
  return (
    <View className={`flex-1 items-center justify-center ${className}`}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text className="mt-4 text-center text-[#AAAAAA]">{message}</Text>
    </View>
  );
};
