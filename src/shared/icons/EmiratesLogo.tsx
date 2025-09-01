import Svg, { Rect, Defs, Pattern, Use, Image } from 'react-native-svg';

function EmiratesLogo(props: any) {
  return (
    <Svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Rect x={0.5} y={0.5} width={63} height={63} rx={31.5} fill="url(#pattern0_0_1953)" />
      <Rect x={0.5} y={0.5} width={63} height={63} rx={31.5} stroke="#484848" />
      <Defs>
        <Pattern id="pattern0_0_1953" patternContentUnits="objectBoundingBox" width={1} height={1}>
          <Use xlinkHref="#image0_0_1953" transform="matrix(.00459 0 0 .00459 0 -.03)" />
        </Pattern>
        <Image
          id="image0_0_1953"
          width={218}
          height={231}
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default EmiratesLogo;
