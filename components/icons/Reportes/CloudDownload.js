import React from "react";

const CloudDownload = ({ width = 16, height = 14 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 9.5H12.375C14.0938 9.5 15.5 8.83719 15.5 7.1375C15.5 5.43781 13.8438 4.84156 12.5 4.775C12.2222 2.11688 10.2812 0.5 8 0.5C5.84375 0.5 4.455 1.93094 4 3.35C2.125 3.52812 0.5 4.47125 0.5 6.425C0.5 8.37875 2.1875 9.5 4.25 9.5H6M6 11.5031L8 13.5L10 11.5031M8 6V13.0009"
        stroke="#1473E6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CloudDownload;
