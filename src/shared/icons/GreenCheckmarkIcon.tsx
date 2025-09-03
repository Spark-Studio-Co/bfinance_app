import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const GreenCheckmarkIcon = (props: any) => (
  <Svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    
    {...props}>
    <Path
      d="M9.6 5.562a.638.638 0 0 1 .9.901L7.243 9.721a.637.637 0 0 1-.901 0L4.499 7.88a.637.637 0 1 1 .902-.902L6.79 8.37z"
      fill="#00E675"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5.487a7.013 7.013 0 1 1 0 14.026A7.013 7.013 0 0 1 7.5.487m0 1.275a5.737 5.737 0 1 0 0 11.475 5.737 5.737 0 1 0 0-11.475"
      fill="#00E675"
    />
  </Svg>
);
export default GreenCheckmarkIcon;
