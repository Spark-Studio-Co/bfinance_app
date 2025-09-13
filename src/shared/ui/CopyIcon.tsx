import React from 'react';
import { View } from 'react-native';

interface CopyIconProps {
  size?: number;
  color?: string;
}

export const CopyIcon: React.FC<CopyIconProps> = ({ size = 20, color = '#00e675' }) => {
  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <View className="relative" style={{ width: size * 0.8, height: size * 0.8 }}>
        {/* Background rectangle */}
        <View
          className="absolute rounded-[2px] bg-transparent"
          style={{
            width: size * 0.6,
            height: size * 0.8,
            borderWidth: 1.5,
            borderColor: color,
          }}
        />
        {/* Foreground rectangle */}
        <View
          className="absolute rounded-[2px] bg-black"
          style={{
            width: size * 0.6,
            height: size * 0.8,
            left: size * 0.2,
            top: size * 0.1,
            borderWidth: 1.5,
            borderColor: color,
          }}
        />
      </View>
    </View>
  );
};
