import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function AlertIcon() {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.78 3.26c-.89.396-1.572 1.577-2.937 3.94L3.435 18.3c-1.364 2.363-2.046 3.544-1.945 4.514a3 3 0 001.22 2.113c.79.573 2.153.573 4.882.573h12.817c2.728 0 4.092 0 4.88-.573a3 3 0 001.221-2.113c.102-.97-.58-2.151-1.944-4.514L18.157 7.2c-1.364-2.363-2.046-3.544-2.937-3.94a3 3 0 00-2.44 0zm2.301 7.34l-.114 6.45a.967.967 0 01-1.933 0l-.114-6.45a1.08 1.08 0 112.161 0zm.17 9.9a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default AlertIcon;
