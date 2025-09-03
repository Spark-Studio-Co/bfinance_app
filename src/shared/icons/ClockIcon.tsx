import * as React from 'react';
import { Svg, Path } from 'react-native-svg';

interface ClockIconProps {
  color?: string;
  size?: number;
}

const ClockIcon: React.FC<ClockIconProps> = ({ color = '#00E675', size = 24 }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M12.467 7.333a1.05 1.05 0 0 0-2.1 0v5.25c0 .438.271.83.681.983l4.667 1.75a1.05 1.05 0 0 0 .737-1.966l-3.985-1.494z"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M12 .45C5.621.45.45 5.621.45 12S5.621 23.55 12 23.55 23.55 18.379 23.55 12 18.379.45 12 .45M2.55 12a9.45 9.45 0 1 1 18.9 0 9.45 9.45 0 0 1-18.9 0"
      clipRule="evenodd"
    />
  </Svg>
);

export default ClockIcon;
