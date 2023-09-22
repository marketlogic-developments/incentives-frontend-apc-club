import React from "react";
import { Check, Circle } from "../../../icons";

const SalesGoalsSection = ({ dataLoaded, totalSaleGoal }) => {
  return (
    <>
      <div className="p-3">
        <h1 className="text-black font-bold">Total Sales vs Goals</h1>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1 divide-x">
        {!dataLoaded && <div className="lds-dual-ring"></div>}
        <div className="flex justify-center gap-3">
          <Circle />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Expected</h3>
            <h1 className="text-black font-bold">$ {totalSaleGoal.expected}</h1>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Check />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Reached</h3>
            <h1 className="text-black font-bold">$ {totalSaleGoal.reached}</h1>
          </div>
        </div>
        <div className="flex justify-center gap-3">
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
