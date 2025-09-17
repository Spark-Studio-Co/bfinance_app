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
    <View className="absolute left-0 right-0 top-0 z-50" style={{ paddingTop: 60 }}>
      {errors.map((error) => (
        <View key={error.id} className="mx-4 mb-2">
          <View className="relative">
            <ErrorTab message={error.message} />
            <View className="absolute right-2 top-2">
              <CloseIcon
                onPress={() => removeError(error.id)}
                size={16}
                backgroundColor="transparent"
                iconColor="#FFFFFF"
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};
