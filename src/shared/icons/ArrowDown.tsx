import * as React from 'react';

const ArrowDown = ({ color = '#000', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="14"
    fill="none"
    viewBox="0 0 13 14"
    {...props}>
    <path
      fill={color}
      fillRule="evenodd"
      d="M6.816 13.286c3.352 0 6.07-2.814 6.07-6.286S10.167.714 6.815.714.747 3.53.747 7c0 3.472 2.717 6.286 6.07 6.286M4.921 7.248a.43.43 0 0 0-.624 0 .47.47 0 0 0 0 .647l2.207 2.286a.43.43 0 0 0 .624 0l2.207-2.286a.47.47 0 0 0 0-.647.43.43 0 0 0-.624 0L7.257 8.754V4.429a.45.45 0 0 0-.44-.458.45.45 0 0 0-.442.458v4.325z"
      clipRule="evenodd"></path>
  </svg>
);

export default ArrowDown;
