import React from "react";

const Circle = ({width = 74, height = 74}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 74 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="37" cy="37" r="37" fill="#FFEEED" />
    </svg>
  );
};

export default Circle;
