import React from "react";

const TargetMyDigiPoints = ({ icon, num, type, index }) => {
  return (
    <div
      className={`flex ${index !== 2 && "border-r-2"} w-full justify-center`}
    >
      <div className="flex w-auto gap-6">
        <div>{icon}</div>
        <div className="flex flex-col gap-3">
          <p className="text-xl text-[#828282]">{type}</p>
          <p className="text-2xl font-bold">{num}</p>
        </div>
      </div>
    </div>
  );
};

export default TargetMyDigiPoints;
