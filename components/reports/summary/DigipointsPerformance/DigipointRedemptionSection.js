import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import HorizontalBar from "../../../charts/HorizontalBar";
import DigipointsRa from "./DigipointsRa";

const DigipointRedemptionSection = ({
  dataDigStatus = [
    {
      name: "",
      value: "",
      color: "",
    },
  ],
  isDataReady,
  digipointsRA,
}) => {
  return (
    <>
      <CardChart title={"DigiPoints by status"} paragraph="">
        {!isDataReady && <div className="lds-dual-ring"></div>}
        {isDataReady && (
          <HorizontalBar datas={dataDigStatus} symbol="" />
        )}
      </CardChart>
      <CardChart title={"Redemptions by region and amound"} paragraph="">
        {!isDataReady && <div className="lds-dual-ring"></div>}
        {isDataReady && (
          <DigipointsRa
            datas={digipointsRA.datas}
            yNames={digipointsRA.yNames}
            ySymbol="$"
          />
        )}
      </CardChart>
    </>
  );
};

export default DigipointRedemptionSection;
