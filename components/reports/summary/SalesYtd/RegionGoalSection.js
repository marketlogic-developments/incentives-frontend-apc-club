import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import HorizontalBar from "../../../charts/HorizontalBar";

const RegionGoalSection = ({ dataLoaded, regionVsGoals }) => {
  return (
    <div className="grid">
      <CardChart title={"Region vs Goals"} paragraph="">
        {!dataLoaded && <div className="lds-dual-ring"></div>}
        {dataLoaded && (
          <HorizontalBar datas={regionVsGoals} />
        )}
      </CardChart>
    </div>
  );
};

export default RegionGoalSection;
