import React from "react";

const Menu = ({ width = 23, height = 23, switchUser, onClick = () => {} }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className="cursor-pointer"
    >
      <path
        d="M3.95312 6.82812H19.0469M3.95312 11.5H19.0469M3.95312 16.1719H19.0469"
        stroke={switchUser ? "white" : "#232B2F"}
        stroke-width="2.15625"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M3.95312 6.82812H19.0469M3.95312 11.5H19.0469M3.95312 16.1719H19.0469"
        stroke={switchUser ? "white" : "#232B2F"}
        stroke-opacity="0.2"
        stroke-width="2.15625"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default Menu;
