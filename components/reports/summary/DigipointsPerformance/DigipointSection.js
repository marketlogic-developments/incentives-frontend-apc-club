import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import StackedHorizontalBarChart from "../../../charts/StackedHorizontalBarChart";
import PieChart from "../../../charts/PieChart";

const DigipointSection = ({
  isDigipointsUploaded,
  isDigipointSR,
  dataUploaded = [],
  dataSR = { datas: {}, yNames: [] },
}) => {
  return (
    <>
      <CardChart title={"DigiPoints uploaded YTD"} paragraph="">
        {!isDigipointsUploaded && <div className="lds-dual-ring"></div>}
        {isDigipointsUploaded && (
          <PieChart
            datas={dataUploaded}
            colors={["#21A5A2", "#009C3B", "#1473E6"]}
            formatter="$ "
          />
        )}
      </CardChart>
      <CardChart title={"DigiPoints by Status and Region"} paragraph="">
        {!isDigipointSR && <div className="lds-dual-ring"></div>}
        {isDigipointSR && (
          <StackedHorizontalBarChart
            datas={[
              {
                name: "Brazil",
                color: "#21A5A2",
                data: [859000, 869000, 879000],
              },
              {
                name: "México",
                color: "#1C2226",
                data: [80000, 90000, 100000],
              },
              {
                name: "SOLA",
                color: "#1473E6",
                data: [130000, 140000, 150000],
              },
              {
                name: "NOLA",
                color: "#2799F6",
                data: [180000, 190000, 200000],
              },
            ]}
            yNames={dataSR.yNames}
          />
        )}
      </CardChart>
    </>
  );
};

export default DigipointSection;
