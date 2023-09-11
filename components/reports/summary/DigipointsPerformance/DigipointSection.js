import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import StackedHorizontalBarChart from "../../../charts/StackedHorizontalBarChart";
import PieChart from "../../../charts/PieChart";

const DigipointSection = ({
  isDataReady,
  dataUploaded = [],
  dataSR = { datas: {}, yNames: [] },
}) => {
  return (
    <>
      <CardChart title={"DigiPoints uploaded YTD"} paragraph="">
        {!isDataReady && <div className="lds-dual-ring"></div>}
        {isDataReady && (
          <PieChart
            datas={dataUploaded}
            colors={["#21A5A2", "#009C3B", "#1473E6"]}
            formatter=""
          />
        )}
      </CardChart>
      <CardChart title={"DigiPoints by Status and Region"} paragraph="">
        {!isDataReady && <div className="lds-dual-ring"></div>}
        {isDataReady && (
          <StackedHorizontalBarChart
            datas={dataSR.datas}
            yNames={dataSR.yNames}
          />
        )}
      </CardChart>
    </>
  );
};

export default DigipointSection;
