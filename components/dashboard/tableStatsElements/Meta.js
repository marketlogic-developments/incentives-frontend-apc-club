import React from "react";

const Meta = ({ user, formatNumber, goal, percentageTotal, sales }) => {
  return (
    <div className="flex items-center w-full max-sm:w-full justify-center gap-10">
      {user.roleId !== 1 && (
        <div className="flex flex-col gap-5">
          <p className="font-semibold text-center">Meta</p>
          <p className="text-center font-bold text-2xl">{formatNumber(goal)}</p>
        </div>
      )}
      {user.roleId == 1 && (
        <div className="flex flex-col gap-5">
          <p className="font-semibold text-center">Meta</p>
          <p className="text-center font-bold text-2xl">{formatNumber(goal)}</p>
        </div>
      )}

      <div className="h-full w-min">
        <div
          className="radial-progress flex justify-center items-center text-primary"
          style={{
            "--value": percentageTotal,
            "--size": "9rem",
            "--thickness": "2px",
          }}
        >
          <div className="w-5/6 h-5/6 bg-primary text-center p-5 flex flex-col items-center justify-center rounded-full text-white">
            <p className="font-bold text-md">${formatNumber(sales)}</p>
            <p className="text-sm">{percentageTotal}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meta;
