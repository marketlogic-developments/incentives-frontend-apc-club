import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import HorizontalBar from "../../../charts/HorizontalBar";

const RegionGoalSection = ({ regionVsGoals }) => {
  return (
    <div className="grid">
      <CardChart title={"Region vs Goals"} paragraph="">
        {regionVsGoals.length && <HorizontalBar datas={regionVsGoals} />}
      </CardChart>
    </div>
  );
};

export default RegionGoalSection;
