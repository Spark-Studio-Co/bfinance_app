import Svg, { Path } from 'react-native-svg';

const ChevronLeft = (props: any) => (
  <Svg width={10} height={16} viewBox="0 0 10 16" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.649 15.649a1.2 1.2 0 0 0 0-1.697L3.697 8l5.952-5.951A1.2 1.2 0 0 0 7.95.35l-6.8 6.8a1.2 1.2 0 0 0 0 1.698l6.8 6.8a1.2 1.2 0 0 0 1.698 0"
      fill="#fff"
    />
  </Svg>
);
export default ChevronLeft;
