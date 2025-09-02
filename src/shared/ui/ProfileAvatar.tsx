import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useResponsive } from '../hooks';
import Text from './Text';
import ClockIcon from '../icons/ClockIcon';

interface ProfileAvatarProps {
  name: string;
  imageSrc: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, imageSrc }) => {
  const { s } = useResponsive();

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
    <View className="flex w-full items-center justify-between">
      <View className="flex flex-row items-center" style={containerStyle}>
        <Image source={{ uri: imageSrc }} style={imageStyle} className="rounded-full" />
        <Text style={textStyle} className="font-[590] text-white">
          {name}
        </Text>
      </View>
      <TouchableOpacity style={buttonStyle}>
        <ClockIcon />
      </TouchableOpacity>
    </View>
  );
};
