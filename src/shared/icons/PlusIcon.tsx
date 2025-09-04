import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PlusIconProps {
  size?: number;
}

function PlusIcon({ size = 24 }: PlusIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 7a.9.9 0 01.9.9v3.2h3.2a.9.9 0 110 1.8h-3.2v3.2a.9.9 0 11-1.8 0v-3.2H7.9a.9.9 0 110-1.8h3.2V7.9A.9.9 0 0112 7z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.9a8.1 8.1 0 100 16.2 8.1 8.1 0 000-16.2zM2.1 12c0-5.468 4.432-9.9 9.9-9.9s9.9 4.432 9.9 9.9-4.432 9.9-9.9 9.9-9.9-4.432-9.9-9.9z"
        fill="#fff"
      />
    </Svg>
  );
}

export default PlusIcon;
