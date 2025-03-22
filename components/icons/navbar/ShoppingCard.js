import React from "react";

const ShoppingCard = ({ width = 35, height = 35 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0938 25.2301C10.6005 25.2301 11.0114 24.8193 11.0114 24.3125C11.0114 23.8057 10.6005 23.3949 10.0938 23.3949C9.58698 23.3949 9.17615 23.8057 9.17615 24.3125C9.17615 24.8193 9.58698 25.2301 10.0938 25.2301Z"
        stroke="black"
        strokeWidth="1.83523"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.9403 25.2301C23.4471 25.2301 23.858 24.8193 23.858 24.3125C23.858 23.8057 23.4471 23.3949 22.9403 23.3949C22.4336 23.3949 22.0227 23.8057 22.0227 24.3125C22.0227 24.8193 22.4336 25.2301 22.9403 25.2301Z"
        stroke="black"
        strokeWidth="1.83523"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75284 5.0426H6.42329L9.17613 20.642H23.858"
        stroke="black"
        strokeWidth="1.83523"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.17614 16.9716H23.4817C23.5878 16.9717 23.6907 16.9349 23.7728 16.8677C23.8549 16.8005 23.9111 16.7069 23.9319 16.6028L25.5836 8.34429C25.597 8.2777 25.5953 8.20897 25.5789 8.14308C25.5624 8.07719 25.5316 8.01578 25.4885 7.96327C25.4454 7.91076 25.3912 7.86847 25.3298 7.83945C25.2684 7.81042 25.2014 7.79539 25.1334 7.79544H7.34091"
        stroke="black"
        strokeWidth="1.83523"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShoppingCard;
