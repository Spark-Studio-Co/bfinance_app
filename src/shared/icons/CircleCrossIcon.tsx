import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

const CircleCrossIcon = (props: any) => (
  <Svg
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)" fill="#fff">
      <Path
        d="M14 28c7.659 0 14-6.355 14-14 0-7.659-6.355-14-14.014-14C6.341 0 0 6.341 0 14c0 7.645 6.355 14 14 14"
        fillOpacity={0.08}
      />
      <Path
        opacity={0.5}
        d="M9.173 20C8.515 20 8 19.47 8 18.811c0-.315.114-.615.343-.83L12.305 14l-3.962-3.967A1.15 1.15 0 0 1 8 9.203c0-.673.515-1.174 1.173-1.174.329 0 .586.114.815.329l3.99 3.98 4.02-3.994c.243-.244.5-.344.815-.344C19.47 8 20 8.516 20 9.174c0 .33-.1.587-.358.845L15.666 14l3.962 3.967c.243.214.358.515.358.845 0 .658-.53 1.188-1.202 1.188-.329 0-.63-.114-.844-.344l-3.962-3.98-3.947 3.98c-.229.23-.53.344-.858.344"
        fillOpacity={0.95}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h28v28H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CircleCrossIcon;
