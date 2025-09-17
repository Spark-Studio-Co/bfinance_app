import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

interface AlertIconProps extends SvgProps {
  size?: number;
  color?: string;
}

function AlertIcon({ size = 24, color = '#FFFFFF', ...props }: AlertIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        d="M12 2L1 21h22L12 2zm0 3.5L20.5 20h-17L12 5.5zM11 16v2h2v-2h-2zm0-6v4h2v-4h-2z"
        fill={color}
      />
    </Svg>
  );
}

export default AlertIcon;
