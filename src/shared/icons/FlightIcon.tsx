import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface FlightIconProps {
  color?: string;
  size?: number;
}

function FlightIcon({ color = '#fff', size = 32 }: FlightIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M3 16l6-2 4-8 3 1-2 9 6-2 2-3 2 1-1 4 5-1.5c1.1-.3 2.3.4 2.6 1.5s-.4 2.3-1.5 2.6L24 18l1 4-2 1-2-3-6 2 2 9-3 1-4-8-6 2z"
        fill={color}
      />
    </Svg>
  );
}

export default FlightIcon;
