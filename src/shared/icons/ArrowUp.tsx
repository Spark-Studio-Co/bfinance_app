import * as React from 'react';
import { Svg, Path } from 'react-native-svg';

interface ArrowUpProps {
  color?: string;
  size?: number;
}

const ArrowUp: React.FC<ArrowUpProps> = ({ color = '#fff', size = 13 }) => (
  <Svg width={size} height={(size * 14) / 13} fill="none" viewBox="0 0 13 14">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M6.684.714C3.332.714.614 3.528.614 7s2.718 6.286 6.07 6.286S12.753 10.47 12.753 7c0-3.472-2.717-6.286-6.07-6.286m1.895 6.038a.43.43 0 0 0 .624 0 .47.47 0 0 0 0-.647L6.996 3.82a.43.43 0 0 0-.624 0L4.165 6.105a.47.47 0 0 0 0 .647.43.43 0 0 0 .624 0l1.454-1.506v4.325a.45.45 0 0 0 .44.457.45.45 0 0 0 .442-.457V5.246z"
      clipRule="evenodd"
    />
  </Svg>
);

export default ArrowUp;
