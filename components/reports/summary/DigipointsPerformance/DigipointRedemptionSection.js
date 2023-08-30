import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import HorizontalBar from "../../../charts/HorizontalBar";
import StackedHorizontalBarChart from "../../../charts/StackedHorizontalBarChart";

const DigipointRedemptionSection = ({
  dataDigStatus = [
    {
      name: "",
      value: "",
      color: "",
    },
  ],
  isDigipointStatus,
  digipointsRA,
  isDigipointRA,
}) => {
  return (
    <>
      <CardChart title={"DigiPoints by status"} paragraph="">
        {!isDigipointStatus && <div className="lds-dual-ring"></div>}
        {isDigipointStatus && (
          <HorizontalBar datas={dataDigStatus} symbol="$" />
        )}
      </CardChart>
      <CardChart title={"Redemptions by region and amound"} paragraph="">
        {!isDigipointRA && <div className="lds-dual-ring"></div>}
        {isDigipointRA && (
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
            yNames={digipointsRA.yNames}
          />
        )}
      </CardChart>
    </>
  );
};

export default DigipointRedemptionSection;
