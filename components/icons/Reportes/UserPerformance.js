import React from "react";

const UserPerformance = ({ width = 70, height = 70 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="35" cy="35" r="35" fill="#FFEEED" />
      <path
        d="M46.9766 26.7813C46.7362 30.1175 44.2613 32.6875 41.5625 32.6875C38.8637 32.6875 36.3847 30.1183 36.1484 26.7813C35.9023 23.3105 38.3116 20.875 41.5625 20.875C44.8134 20.875 47.2227 23.3737 46.9766 26.7813Z"
        fill="#EB1000"
        stroke="#EB1000"
        stroke-width="2.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M41.5625 37.9375C36.2165 37.9375 31.0756 40.5929 29.7877 45.7641C29.6171 46.4482 30.0461 47.125 30.7491 47.125H52.3767C53.0797 47.125 53.5062 46.4482 53.3381 45.7641C52.0502 40.51 46.9093 37.9375 41.5625 37.9375Z"
        fill="#EB1000"
        stroke="#EB1000"
        stroke-width="2.75"
        stroke-miterlimit="10"
      />
      <path
        d="M30.4063 28.2529C30.2143 30.9173 28.2144 33.0156 26.0586 33.0156C23.9028 33.0156 21.8996 30.9181 21.7109 28.2529C21.5149 25.4811 23.4615 23.5 26.0586 23.5C28.6557 23.5 30.6023 25.5319 30.4063 28.2529Z"
        fill="#FFC8C5"
        stroke="#FFC8C5"
        stroke-width="2.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30.8984 38.1016C29.4178 37.4232 27.787 37.1623 26.0586 37.1623C21.793 37.1623 17.6832 39.2828 16.6537 43.4131C16.5184 43.9594 16.8613 44.5 17.4224 44.5H26.6328"
        fill="#FFC8C5"
      />
      <path
        d="M30.8984 38.1016C29.4178 37.4232 27.787 37.1623 26.0586 37.1623C21.793 37.1623 17.6832 39.2828 16.6537 43.4131C16.5184 43.9594 16.8613 44.5 17.4224 44.5H26.6328"
        stroke="#FFC8C5"
        stroke-width="2.75"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default UserPerformance;
