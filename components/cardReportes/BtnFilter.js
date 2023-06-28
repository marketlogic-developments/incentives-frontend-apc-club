import React from "react";

const BtnFilter = ({ text = "Button", styles = "", onClick = () => {} }) => {
  return (
    <div className="w-full">
      <button className={`btn w-full ${styles}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default BtnFilter;
