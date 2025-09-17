import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import AlertIcon from '../icons/AlertIcon';

interface ErrorTabProps {
  message: string;
  className?: string;
}

export const ErrorTab: React.FC<ErrorTabProps> = ({ message, className = '' }) => {
  return (
    <View
      className={`flex-row items-center rounded-[12px] px-4 py-3 ${className}`}
      style={{
        backgroundColor: '#EC594E30', // #EC594E with 30% opacity
      }}>
      <View className="mr-3">
        <AlertIcon size={20} color="#FFFFFF" />
      </View>
      <Text
        weight="medium"
        className="flex-1 text-white"
        style={{
          fontSize: 14,
        }}>
        {message}
      </Text>
    </View>
  );
};
