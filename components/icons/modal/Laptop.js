import React from "react";

const Laptop = ({ width = 11, height = 11 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.27824 2.0625H1.72176C1.3404 2.0625 1.03125 2.37165 1.03125 2.75301V7.90324C1.03125 8.2846 1.3404 8.59375 1.72176 8.59375H9.27824C9.6596 8.59375 9.96875 8.2846 9.96875 7.90324V2.75301C9.96875 2.37165 9.6596 2.0625 9.27824 2.0625Z"
        stroke="black"
        stroke-width="0.6875"
        stroke-linejoin="round"
      />
      <path d="M0.34375 8.9375H10.6562H0.34375Z" fill="black" />
      <path
        d="M0.34375 8.9375H10.6562"
        stroke="black"
        stroke-width="0.6875"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default Laptop;
