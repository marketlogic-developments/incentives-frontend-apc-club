import React from "react";

const Check = ({ width = 76, height = 76}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="38" cy="38" r="38" fill="#FFEEED" />
      <path
        d="M25.1754 35.3312C23.4093 33.5651 20.5448 33.5651 18.7769 35.3312C17.009 37.0973 17.0108 39.9617 18.7769 41.7296L27.1821 50.1349C29.8041 52.7569 34.0529 52.7569 36.6749 50.1349L38.327 48.4828L25.1754 35.3312Z"
        fill="#EB1000"
      />
      <path
        d="M55.9375 24.474C54.1714 22.7079 51.3069 22.7079 49.539 24.474L31.9287 42.0843L38.3272 48.4827L55.9375 30.8725C57.7036 29.1046 57.7036 26.2401 55.9375 24.474Z"
        fill="#FFC8C5"
      />
    </svg>
  );
};

export default Check;
