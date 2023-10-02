import React from "react";

const Menu = ({
  width = 23,
  height = 23,
  switchUser,
  onClick = () => {},
  styles = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={`cursor-pointer ${styles}`}
    >
      <path
        d="M3.95312 6.82812H19.0469M3.95312 11.5H19.0469M3.95312 16.1719H19.0469"
        stroke={switchUser ? "white" : "#232B2F"}
        strokeWidth="2.15625"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M3.95312 6.82812H19.0469M3.95312 11.5H19.0469M3.95312 16.1719H19.0469"
        stroke={switchUser ? "white" : "#232B2F"}
        strokeOpacity="0.2"
        strokeWidth="2.15625"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Menu;
