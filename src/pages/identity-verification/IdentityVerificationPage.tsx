import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const IdentityVerificationPage = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="bg-[#0f0f0f] px-6 pb-6 pt-16">
        <TouchableOpacity onPress={handleBack} className="mb-4">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-[24px] font-bold text-white">Identity Verification</Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 py-6">
        <Text className="text-[16px] text-white">Identity verification content will be here.</Text>
      </View>
    </View>
  );
};
