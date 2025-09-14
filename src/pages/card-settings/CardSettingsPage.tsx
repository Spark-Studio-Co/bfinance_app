import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MainLayout } from '~/app/layouts/MainLayout';

interface MenuItemProps {
  title: string;
  icon: any;
  onPress: () => void;
  showBadge?: boolean;
  badgeText?: string;
  isCloseBadge?: boolean;
}

const MenuItem = ({
  title,
  icon,
  onPress,
  showBadge = false,
  badgeText,
  isCloseBadge = false,
}: MenuItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="relative mb-2 h-[68px] flex-row items-center rounded-2xl bg-[#0f0f0f] px-4"
    activeOpacity={0.7}>
    <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-[rgba(41,144,255,0.15)]">
      {icon}
    </View>
    {isCloseBadge && (
      <View className="flex w-[220px] flex-row items-center gap-[7px] ">
        <Text className="flex-1 text-[17px] font-medium text-white">{title}</Text>
        <View className="rounded-full bg-[#00E675] px-2.5 py-1">
          <Text className="text-[12px] font-semibold text-black">{badgeText}</Text>
        </View>
      </View>
    )}
    {!isCloseBadge && <Text className="flex-1 text-[17px] font-medium text-white">{title}</Text>}
    {showBadge && !isCloseBadge && (
      <View className="absolute right-4 rounded-full bg-[#00E675] px-2.5 py-1">
        <Text className="text-[12px] font-semibold text-black">{badgeText}</Text>
      </View>
    )}
  </TouchableOpacity>
);

export const CardSettingsPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cardNumber } = route.params as { cardNumber: string };

  const handleMenuPress = (itemId: string) => {
    console.log(`Pressed: ${itemId}`);

    switch (itemId) {
      case 'pin':
        (navigation as any).navigate('PinCode', { fromSettings: true });
        break;
      case 'email':
        // Navigate to change email
        break;
      case 'phone':
        // Navigate to change phone
        break;
      case 'label':
        // Navigate to change label
        break;
      case 'limits':
        // Navigate to limits (coming soon)
        break;
      default:
        console.log(`No navigation defined for: ${itemId}`);
    }
  };

  return (
    <MainLayout isTitle isBack title={`Card *${cardNumber}`} isScroll>
      {/* Security Section */}
      <View className="mb-6">
        <Text className="mb-3 text-[13px] uppercase tracking-wider text-[#AAAAAA]">SECURITY</Text>
        <MenuItem
          title="Change PIN code"
          icon={
            <Image className="h-[40px] w-[40px]" source={require('../../../assets/security.png')} />
          }
          onPress={() => handleMenuPress('pin')}
        />
      </View>

      {/* Contacts Section */}
      <View className="mb-6">
        <Text className="mb-3 text-[13px] uppercase tracking-wider text-[#AAAAAA]">CONTACTS</Text>
        <MenuItem
          title="Change email"
          icon={
            <Image className="h-[40px] w-[40px]" source={require('../../../assets/email.png')} />
          }
          onPress={() => handleMenuPress('email')}
        />
        <MenuItem
          title="Change phone"
          icon={
            <Image className="h-[40px] w-[40px]" source={require('../../../assets/phone.png')} />
          }
          onPress={() => handleMenuPress('phone')}
        />
      </View>

      {/* Info Section */}
      <View className="mb-6">
        <Text className="mb-3 text-[13px] uppercase tracking-wider text-[#AAAAAA]">INFO</Text>
        <MenuItem
          title="Change Label"
          icon={
            <Image className="h-[40px] w-[40px]" source={require('../../../assets/edit.png')} />
          }
          onPress={() => handleMenuPress('label')}
        />
        <MenuItem
          title="Limits & Restrictions"
          icon={
            <Image className="h-[40px] w-[40px]" source={require('../../../assets/params.png')} />
          }
          onPress={() => handleMenuPress('limits')}
          showBadge={true}
          badgeText="soon"
        />
      </View>
    </MainLayout>
  );
};
