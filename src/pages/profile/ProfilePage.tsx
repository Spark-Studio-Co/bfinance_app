import React from 'react';
import { View, Text, Image } from 'react-native';
import { Header } from '~/features/Header/ui/Header';
import { MenuCard } from '~/features/Profile/ui/ProfileCard';
import { useNavigation } from '@react-navigation/native';
import { menuSections } from '~/features/Profile/model/mock';

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleMenuPress = (itemId: string) => {
    console.log(`Pressed: ${itemId}`);

    switch (itemId) {
      case 'history':
        (navigation as any).navigate('History');
        break;
      case 'transaction-details':
        // Передаем существующий ID транзакции из мока
        (navigation as any).navigate('TransactionDetails', { transactionId: '1' });
        break;
      case 'identity':
        // Добавить навигацию на страницу верификации
        break;
      case 'support':
        // Добавить навигацию на страницу поддержки
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
      <Header title="" showLogout />
      <View className="flex-1 px-4">
        {/* Profile Header */}
        <View className="mb-8 items-center">
          <View className="mb-4 h-24 w-24 overflow-hidden rounded-full">
            <Image
              source={{
                uri: '../../../assets/Frame 628067.png',
              }}
              className="h-full w-full"
            />
          </View>

          <Text className="mb-2 text-[20px] font-semibold text-white">Timur</Text>

          <Text className="mb-4 text-[14px] text-[#878787]">user@example.com</Text>

          <View className="rounded-[10px] bg-[#00E675] px-5 py-3">
            <Text className="font-medium text-black">Verified</Text>
          </View>
        </View>

        {/* Menu Sections */}
        <View className="">
          {menuSections.map((section, sectionIndex) => (
            <View key={section.title} className="mb-3">
              <Text className="mb-3 text-[13px] uppercase tracking-wider text-[#AAAAAA]">
                {section.title}
              </Text>

              <View className="">
                {section.items.map((item) => (
                  <MenuCard
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    onPress={() => handleMenuPress(item.id)}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
