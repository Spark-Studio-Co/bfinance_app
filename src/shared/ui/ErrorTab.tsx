import React from 'react';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Text } from './Text';
import AlertIcon from '../icons/AlertIcon';

interface ErrorTabProps {
  message: string;
  className?: string;
}

export const ErrorTab: React.FC<ErrorTabProps> = ({ message, className = '' }) => {
  return (
    <View className={`h-[48px] overflow-hidden rounded-[12px] ${className}`}>
      <BlurView
        intensity={80}
        tint="dark"
        className="flex-1 flex-row items-center px-4"
        style={{
          backgroundColor: '#EC594E40',
          height: 48,
        }}>
        <View className="mr-3">
          <AlertIcon color="#FFFFFF" />
        </View>
        <Text
          className="flex-1 text-white"
          style={{
            fontSize: 14,
          }}>
          {message}
        </Text>
      </BlurView>
    </View>
  );
};
