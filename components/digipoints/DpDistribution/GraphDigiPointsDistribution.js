import React from "react";
import Upload from "../../icons/Reportes/upload";
import Check from "../../icons/Reportes/Check";

const GraphDigiPointsDistribution = ({ data }) => {
  const uploadDigiPoints = data
    .map(({ digipoints }) => parseInt(digipoints))
    .reduce((a, b) => a + b);
  const assignedDigiPoints = data
    .filter(({ status }) => status === true)
    .map(({ digipoints }) => parseInt(digipoints))
    .reduce((a, b) => a + b);
  const percentage = parseInt((assignedDigiPoints * 100) / uploadDigiPoints);

  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-4/6 flex justify-around">
        <div className="flex gap-3">
          <Upload />
          <div className="flex flex-col h-full justify-center gap-2">
            <p>DigiPoints Uploaded</p>
            <p className="font-bold text-xl">{uploadDigiPoints}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Check />
          <div className="flex flex-col h-full justify-center gap-2">
            <p> DigiPoints Assigned {percentage}%</p>
            <p className="font-bold text-xl">{assignedDigiPoints}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphDigiPointsDistribution;
