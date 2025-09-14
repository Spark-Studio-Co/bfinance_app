import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '../hooks';
import Text from './Text';
import ClockIcon from '../icons/ClockIcon';

interface ProfileAvatarProps {
  name?: string;
  imageSrc?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, imageSrc }) => {
  const { s } = useResponsive();
  const navigation = useNavigation();

  const handleHistoryPress = () => {
    navigation.navigate('History' as never);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  const imageStyle = {
    width: s(40),
    height: s(40),
  };

  const textStyle = {
    fontSize: s(15),
    lineHeight: s(22),
  };

  const buttonStyle = {
    width: s(28),
    height: s(28),
  };

  const containerStyle = {
    gap: s(6),
  };

  return (
    <View className="flex w-full flex-row items-center justify-between">
      <TouchableOpacity
        className="flex flex-row items-center"
        style={containerStyle}
        onPress={handleProfilePress}
        activeOpacity={0.7}>
        <Image
          source={require('../../../assets/avatar.png')}
          style={imageStyle}
          className="rounded-full"
        />
        <Text style={textStyle} weight="semibold" className=" text-white">
          Timur
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={buttonStyle} onPress={handleHistoryPress}>
        <ClockIcon />
      </TouchableOpacity>
    </View>
  );
};
