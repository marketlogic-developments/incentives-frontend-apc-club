import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import SalesYTDCharts from "../../../charts/SalesYTDCharts";

const RegionGoalSection = ({ dataLoaded, regionVsGoals }) => {
  return (
    <div className="grid">
      <CardChart title={"Region vs Goals"} paragraph="">
        {!dataLoaded && <div className="lds-dual-ring"></div>}
        {dataLoaded && (
          <SalesYTDCharts
          totalDatas={regionVsGoals}
          yNames={["NOLA", "SOLA", "México", "Brazil"]}
        />
        )}
      </CardChart>
    </div>
  );
};

export default RegionGoalSection;
