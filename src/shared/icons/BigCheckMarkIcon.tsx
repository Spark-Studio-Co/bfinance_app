import Svg, { Path } from 'react-native-svg';

const BigCheckMarkIcon = (props: any) => (
  <Svg
    width={82}
    height={82}
    viewBox="0 0 82 82"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M53.101 29.826a3.675 3.675 0 0 1 5.197 5.198L39.515 53.807a3.675 3.675 0 0 1-5.197 0L23.701 43.19a3.675 3.675 0 1 1 5.197-5.197l8.019 8.018z"
      fill="#00E675"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M41 .575c22.324 0 40.425 18.1 40.425 40.425S63.324 81.425 41 81.425.575 63.324.575 41 18.675.575 41 .575m0 7.35C22.73 7.925 7.925 22.73 7.925 41S22.73 74.075 41 74.075 74.075 59.269 74.075 41 59.269 7.925 41 7.925"
      fill="#00E675"
    />
  </Svg>
);
export default BigCheckMarkIcon;
