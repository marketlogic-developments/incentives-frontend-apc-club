import React from "react";

const Meta = ({ user, formatNumber, goal, percentageTotal, sales }) => {
  return (
    <div className="flex flex-col w-full p-6 gap-6 targetDashboard">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold 2xl:text-xl">Meta partners</h2>
        </div>
        <div className="min-h-[45px] flex items-end">
          <p className="2xl:!text-3xl lg:!text-xl font-bold text-[#1473E6]">
            {formatNumber(goal)}
          </p>
        </div>
      </div>
      <div className="h-full w-full flex justify-center ">
        <div
          className="radial-progress text-[#1473E6] flex justify-center items-center text-primary radialMeta"
          style={{
            "--value": percentageTotal,
          }}
        >
          <div className="w-[80%] h-[80%] bg-white text-center p-5 flex flex-col items-center justify-center rounded-full text-white">
            <p className="font-bold lg:!text-xs xl:!text-xl text-black">
              ${formatNumber(sales)}
            </p>
            <p className="lg:!text-xs xl:!text-base text-black">
              {percentageTotal}%
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Meta;
