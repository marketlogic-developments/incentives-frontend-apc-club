import React from "react";

const BtnFilter = ({text = "Button", styles = ''}) => {
  return (
    <div className="w-full">
      <button className={`btn w-full ${styles}`}>
        {text}
      </button>
    </div>
  );
};

export default BtnFilter;
