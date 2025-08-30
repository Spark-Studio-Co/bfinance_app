import Svg, { Path } from 'react-native-svg';

const CheckIcon = (props: any) => (
  <Svg
    width={12}
    height={10}
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.707 2.457a1 1 0 0 0-1.414-1.414L4 7.336 1.707 5.043A1 1 0 0 0 .293 6.457l3 3a1 1 0 0 0 1.414 0z"
      fill="#000"
    />
  </Svg>
);
export default CheckIcon;
