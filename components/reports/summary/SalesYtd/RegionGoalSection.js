import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import SalesYTDCharts from "../../../charts/SalesYTDCharts";
import { useTranslation } from "react-i18next";

const RegionGoalSection = ({ dataLoaded, regionVsGoals }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="grid">
      <CardChart title={t("Reportes.region_goal")} paragraph="">
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
