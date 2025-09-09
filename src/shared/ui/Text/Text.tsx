import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

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

// соответствие веса → названия шрифта SF Pro Display
const sfProDisplayMap: Record<FontWeight, string> = {
  ultralight: 'SF-Pro-Display-Ultralight',
  light: 'SF-Pro-Display-Light',
  regular: 'SF-Pro-Display-Regular',
  medium: 'SF-Pro-Display-Medium',
  semibold: 'SF-Pro-Display-Semibold',
  bold: 'SF-Pro-Display-Bold',
  black: 'SF-Pro-Display-Black',
};

export const Text: React.FC<CustomTextProps> = ({
  style,
  weight = 'regular',
  className,
  ...props
}) => {
  const fontFamily = sfProDisplayMap[weight] || sfProDisplayMap.regular;

  return <RNText style={[{ fontFamily }, style]} {...props} className={className} />;
};

Text.displayName = 'Text';

export default Text;
