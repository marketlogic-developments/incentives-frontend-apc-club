import React from "react";

const ButtonBgOut = ({ title = "", styles = "", onClick = () => {} }) => {
  return (
    <button
      className={`py-2 px-4 rounded-lg !text-gray-400 !text-xs font-bold ${styles}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ButtonBgOut;
