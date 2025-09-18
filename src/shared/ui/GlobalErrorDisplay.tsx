import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ErrorTab } from './ErrorTab';
import { useErrorStore } from '../stores/errorStore';
import { CloseIcon } from './CloseIcon';

export const GlobalErrorDisplay: React.FC = () => {
  const { errors, removeError } = useErrorStore();

  if (errors.length === 0) {
    return null;
  }

  return (
    <View
      className="absolute bottom-0 left-0 right-0"
      style={{
        paddingBottom: 100,
        zIndex: 9999,
        elevation: 9999, // for Android
      }}>
      {errors.map((error) => (
        <View key={error.id} className="mx-4 mb-2 h-[48px]">
          <View className="relative h-[48px]">
            <ErrorTab message={error.message} />
          </View>
        </View>
      ))}
    </View>
  );
};
