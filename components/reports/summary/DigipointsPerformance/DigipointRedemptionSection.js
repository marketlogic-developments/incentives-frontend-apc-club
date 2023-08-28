import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import HorizontalBar from "../../../charts/HorizontalBar";
import BasicBarChart from "../../../charts/BasicBarChart";

const DigipointRedemptionSection = ({redempion, xValuesLine}) => {
  return (
    <>
      <CardChart title={"DigiPoints by status"} paragraph="">
        <HorizontalBar
          yNames={["Redeemed", "Assigned", "Expected", "Uploaded"]}
          datas={[
            { value: 250, color: "#2799F6" },
            { value: 230, color: "#1473E6" },
            { value: 200, color: "#1C2226" },
            { value: 180, color: "#21A5A2" },
          ]}
        />
      </CardChart>
      <CardChart title={"Redemptions by region and amound"} paragraph="">
        <BasicBarChart
          color={"#1C2226"}
          datas={redempion}
          xValues={xValuesLine}
        />
      </CardChart>
    </>
  );
};

export default DigipointRedemptionSection;
