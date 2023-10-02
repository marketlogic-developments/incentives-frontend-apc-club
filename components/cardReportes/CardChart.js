import React from "react";

const CardChart = ({ title = "", paragraph = "", content, children }) => {
  return (
    <div className="card w-full bg-base-100 shadow-md">
      <div className="card-body font-bold w-full">
        <div>
          <p className="font-medium">{paragraph}</p>
        </div>
        <div className="flex justify-center mb-5">
          <div className="w-full">
            <div className="grid grid-cols-2">
              <h1>{title}</h1>
              {content}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardChart;
