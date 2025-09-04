import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface AirportLoungeIconProps {
  color?: string;
  size?: number;
}

function AirportLoungeIcon({ color = '#fff', size = 32 }: AirportLoungeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Crown/Lounge symbol */}
      <Path d="M6 12l3 8h14l3-8-4 2-4-6-4 6-4-2z" fill={color} />
      {/* Base */}
      <Path d="M4 22h24v2H4v-2z" fill={color} />
      {/* Decorative elements */}
      <Path d="M8 8v2M16 6v3M24 8v2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export default AirportLoungeIcon;
