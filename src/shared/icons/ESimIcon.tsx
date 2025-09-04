import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface ESimIconProps {
  color?: string;
  size?: number;
}

function ESimIcon({ color = '#fff', size = 32 }: ESimIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* SIM Card outline */}
      <Path
        d="M8 6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6l-2-2H8z"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      {/* Signal waves */}
      <Circle cx="16" cy="16" r="2" fill={color} />
      <Circle cx="16" cy="16" r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <Circle cx="16" cy="16" r="8" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3" />
    </Svg>
  );
}

export default ESimIcon;
