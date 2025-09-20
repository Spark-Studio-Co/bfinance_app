import React from 'react';
import { Text as RNText, TextProps as RNTextProps, Platform } from 'react-native';

export type FontWeight =
  | 'ultralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'black';

export interface CustomTextProps extends RNTextProps {
  weight?: FontWeight;
}

// соответствие веса → названия шрифта SF Pro Display (iOS)
const sfProDisplayMap: Record<FontWeight, string> = {
  ultralight: 'SF-Pro-Display-Ultralight',
  light: 'SF-Pro-Display-Light',
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
  black: 'SF-Pro-Display-Black',
};

// соответствие веса → названия шрифта Inter (Android)
const interMap: Record<FontWeight, string> = {
  ultralight: 'Inter-ExtraLight',
  light: 'Inter-Light',
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  black: 'Inter-Black',
};

export const Text: React.FC<CustomTextProps> = ({
  style,
  weight = 'regular',
  className,
  ...props
}) => {
  // Выбираем шрифт в зависимости от платформы
  const fontMap = Platform.OS === 'ios' ? sfProDisplayMap : interMap;
  const fontFamily = fontMap[weight] || fontMap.regular;

  return <RNText style={[{ fontFamily }, style]} {...props} className={className} />;
};

Text.displayName = 'Text';

export default Text;
