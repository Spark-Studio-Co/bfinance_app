import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MenuCard } from '~/features/Profile/ui/ProfileCard';
import { menuSections } from '~/features/Profile/model/mock';
import LogoIcon from '~/shared/icons/LogoIcon';
import LogoutIcon from '~/shared/ui/LogoutIcon';

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    // Logout logic
  };

  const handleMenuPress = (itemId: string) => {
    console.log(`Pressed: ${itemId}`);

    switch (itemId) {
      case 'identity':
        (navigation as any).navigate('IdentityVerification');
        break;
      case 'support':
        (navigation as any).navigate('Support');
        break;
      case 'privacy':
        // Добавить навигацию на политику конфиденциальности
        break;
      case 'terms':
        // Добавить навигацию на условия использования
        break;
      case 'aml':
        // Добавить навигацию на AML политику
        break;
      default:
        console.log(`No navigation defined for: ${itemId}`);
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="bg-[#0f0f0f] px-6 pb-6 pt-16">
        {/* Header Controls */}
        <View className="mb-6 flex-row items-center justify-between">
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <LogoutIcon />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View className="items-center">
          <View className="mb-4 h-[85px] w-[85px] overflow-hidden rounded-full">
            <Image source={require('../../../assets/avatar.png')} className="h-full w-full" />
          </View>

          <Text className="mb-1 text-[20px] font-bold text-white">Timur</Text>
          <Text className="mb-4 text-[14px] text-[rgba(255,255,255,0.5)]">user@example.com</Text>

          <View className="rounded-[10px] bg-[#00E675] px-4 py-1">
            <Text className="text-[13px] font-medium text-black">Verified</Text>
          </View>
        </View>
      </View>

      {/* Menu Content */}
      <ScrollView className="flex-1 px-6 py-3">
        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={section.title} className="mb-4">
            <Text className="mb-2 text-[13px] uppercase tracking-wider text-[#AAAAAA]">
              {section.title}
            </Text>
            {section.items.map((item) => (
              <MenuCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                onPress={() => handleMenuPress(item.id)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
