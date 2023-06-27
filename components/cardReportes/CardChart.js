import React from "react";

const CardChart = ({ title = "", paragraph = "", children }) => {
  return (
    <div className="card w-full bg-base-100 shadow-md">
      <div className="card-body font-bold">
        <div>
          <p className="font-medium">{paragraph}</p>
        </div>
        <div className="flex justify-center mb-5">
         <div className="w-full">
         <h1>{title}</h1>
          {children}
         </div>
        </div>
      </div>
    </div>
  );
};

export default CardChart;
