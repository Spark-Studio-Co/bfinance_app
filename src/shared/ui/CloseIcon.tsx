import React from 'react';
import { View, TouchableOpacity } from 'react-native';

interface CloseIconProps {
  onPress: () => void;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
}

export const CloseIcon: React.FC<CloseIconProps> = ({
  onPress,
  size = 28,
  backgroundColor = '#333333',
  iconColor = '#ffffff',
}) => {
  const iconSize = size * 0.5;
  const lineWidth = 2;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      activeOpacity={0.7}>
      <View style={{ width: iconSize, height: iconSize }} className="items-center justify-center">
        <View
          style={{
            position: 'absolute',
            width: iconSize,
            height: lineWidth,
            backgroundColor: iconColor,
            transform: [{ rotate: '45deg' }],
            borderRadius: lineWidth / 2,
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: iconSize,
            height: lineWidth,
            backgroundColor: iconColor,
            transform: [{ rotate: '-45deg' }],
            borderRadius: lineWidth / 2,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
