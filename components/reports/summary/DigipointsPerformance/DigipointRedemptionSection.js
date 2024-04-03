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
  const yAxis = [
    ...new Set(
      digipointsRA?.datas
        .map(({ label }) => label)
        .reduce((a, b) => a.concat(b), [])
    ),
  ];

  console.log(digipointsRA, yAxis);
  return (
    <>
      <CardChart title={"DigiPoints by status"} paragraph="">
        {!isDataReady && <div className="lds-dual-ring"></div>}
        {isDataReady && <HorizontalBar datas={dataDigStatus} symbol="" />}
      </CardChart>
      <Suspense fallback={<div className="lds-dual-ring"></div>}>
        <CardChart title={"Redemptions by region and amound"} paragraph="">
          <DigipointsRa datas={digipointsRA.datas} yNames={yAxis} ySymbol="$" />
        </CardChart>
      </Suspense>
    </>
  );
};

export default DigipointRedemptionSection;
