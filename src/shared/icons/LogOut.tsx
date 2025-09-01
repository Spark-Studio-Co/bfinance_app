import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function LogOut(props: any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.492.835C3.326.39 4.146.251 5.868.251h3.16a.975.975 0 110 1.95h-3.16c-1.632 0-2.056.14-2.456.354a2.04 2.04 0 00-.854.854c-.214.4-.355.823-.355 2.454v8.276c0 1.63.14 2.054.355 2.454.198.37.483.655.854.854.4.213.824.354 2.456.354h3.16a.975.975 0 110 1.95h-3.16c-1.722 0-2.542-.14-3.376-.585a3.99 3.99 0 01-1.655-1.653c-.445-.834-.584-1.653-.584-3.375V5.864c0-1.721.139-2.54.584-3.374A3.99 3.99 0 012.492.835z"
        fill="#EC594E"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.725 5.949a.976.976 0 011.379 0l3.363 3.362a.974.974 0 010 1.378l-3.363 3.362a.976.976 0 01-1.38-1.379l1.698-1.697h-7.61a.975.975 0 110-1.95h7.61l-1.697-1.697a.975.975 0 010-1.379z"
        fill="#EC594E"
      />
    </Svg>
  );
}

export default LogOut;
