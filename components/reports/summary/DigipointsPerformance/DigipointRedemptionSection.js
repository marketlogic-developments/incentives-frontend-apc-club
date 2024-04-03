import React, { Suspense } from "react";
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
  console.log(digipointsRA);
  return (
    <>
      <CardChart title={"DigiPoints by status"} paragraph="">
        {!isDataReady && <div className="lds-dual-ring"></div>}
        {isDataReady && <HorizontalBar datas={dataDigStatus} symbol="" />}
      </CardChart>
      <CardChart title={"Redemptions by region and amound"} paragraph="">
        <Suspense fallback={<div className="lds-dual-ring"></div>}>
          <DigipointsRa
            datas={digipointsRA.datas}
            yNames={digipointsRA.yNames}
            ySymbol="$"
          />
        </Suspense>
      </CardChart>
    </>
  );
};

export default DigipointRedemptionSection;
