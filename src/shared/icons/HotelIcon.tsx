import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HotelIconProps {
  color?: string;
  size?: number;
}

function HotelIcon({ color = '#fff', size = 32 }: HotelIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M4 26V8a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v18M4 26h24M4 26v-6h24v6M8 14h3v3H8v-3zM13 14h3v3h-3v-3zM18 14h3v3h-3v-3zM23 14h3v3h-3v-3zM8 10h16v2H8v-2z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HotelIcon;
