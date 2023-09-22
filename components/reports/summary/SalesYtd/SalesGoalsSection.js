import React from "react";
import { Check, Circle } from "../../../icons";

const SalesGoalsSection = ({ dataLoaded, totalSaleGoal }) => {
  return (
    <>
      <div className="p-3">
        <h1 className="text-black font-bold">Total Sales vs Goals</h1>
      </div>
      <div className="grid sm:grid-cols-3 grid-rows-1 sm:divide-x gap-2">
        {!dataLoaded && <div className="lds-dual-ring"></div>}
        <div className="flex sm:justify-center justify-start gap-3">
          <Circle />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Expected</h3>
            <h1 className="text-black font-bold">$ {totalSaleGoal.expected}</h1>
          </div>
        </div>
        <div className="flex sm:justify-center justify-start gap-3">
          <Check />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Reached</h3>
            <h1 className="text-black font-bold">$ {totalSaleGoal.reached}</h1>
          </div>
        </div>
        <div className="flex sm:justify-center justify-start gap-3">
          <Circle />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Progress</h3>
            <h1 className="text-black font-bold">{totalSaleGoal.progress}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesGoalsSection;
