import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import HorizontalBar from "../../../charts/HorizontalBar";
import BasicBarChart from "../../../charts/BasicBarChart";

const DigipointRedemptionSection = ({
  dataDigStatus = [
    {
      name: "",
      value: "",
      color: "",
    },
  ],
  isDigipointStatus,
  redempion,
  xValuesLine,
}) => {
  return (
    <>
      <CardChart title={"DigiPoints by status"} paragraph="">
        {!isDigipointStatus && <div className="lds-dual-ring"></div>}
        {isDigipointStatus && <HorizontalBar datas={dataDigStatus} symbol="$ " />}
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
