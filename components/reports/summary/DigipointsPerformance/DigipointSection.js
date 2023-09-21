import React, { useEffect, useState } from "react";
import CardChart from "../../../cardReportes/CardChart";
import StackedHorizontalBarChart from "../../../charts/StackedHorizontalBarChart";
import PieChart from "../../../charts/PieChart";

const DigipointSection = ({
  isDataReady,
  dataUploaded = [],
  dataSR = { datas: {}, yNames: [] },
}) => {
  const [percentage, setPercentage] = useState([]);
  const calculatePercentage = (data) => {
    const resultado = data.map((item) => {
      const [total, asigned, redeem] = item.data;

      const asignedVsUpload = Number((asigned / total) * 100).toFixed(2);
      const redeemVsAsigned = Number((redeem / asigned) * 100).toFixed(2);

      return {
        asignedVsUpload: asignedVsUpload,
        redeemVsAsigned: redeemVsAsigned,
      };
    });
    return resultado;
  };

  useEffect(() => {
    if (dataSR?.datas.length && percentage.length === 0) {
      const res = calculatePercentage(dataSR?.datas);
      setPercentage(res);
    }
  }, [dataSR]);
  return (
    <>
      <CardChart title={"DigiPoints uploaded YTD"} paragraph="">
        {!isDataReady && <div className="lds-dual-ring"></div>}
        {isDataReady && (
          <PieChart
            datas={dataUploaded}
            colors={["#21A5A2", "#009C3B", "#1473E6"]}
            formatter="$ "
          />
        )}
      </CardChart>
      <CardChart title={"DigiPoints by Status and Region"} paragraph="">
        {!isDataReady && <div className="lds-dual-ring"></div>}
        {isDataReady && (
          <StackedHorizontalBarChart
            datas={dataSR.datas}
            yNames={dataSR.yNames}
            percentage={percentage}
          />
        )}
      </CardChart>
    </>
  );
};

export default DigipointSection;
