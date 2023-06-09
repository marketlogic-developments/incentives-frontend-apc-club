import React from "react";

const CardChart = ({ title = "Title", paragraph = "", children }) => {
  return (
    <div class="card w-full bg-base-100 shadow-md">
      <div class="card-body">
        <h1>{title}</h1>
      <div className="flex justify-center mb-5">{children}</div>
      </div>
    </div>
  );
};

export default CardChart;
