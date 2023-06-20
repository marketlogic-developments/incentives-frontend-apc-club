import React from "react";

const AlertCircule = ({ width = 11, height = 11 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 5.5C10 3.01562 7.98438 1 5.5 1C3.01562 1 1 3.01562 1 5.5C1 7.98438 3.01562 10 5.5 10C7.98438 10 10 7.98438 10 5.5Z"
        stroke="#2C2C2C"
        stroke-width="0.75"
        stroke-miterlimit="10"
      />
    </svg>
  );
};

export default AlertCircule;
