import React, { useState } from "react";
import CardChart from "../../../cardReportes/CardChart";
import BarChar from "../../../cardReportes/BarChar";
import BarCircleChart from "../../../charts/BarCircleChart";
import PieChart from "../../../charts/PieChart";

const MarketplaceSection = ({
  dataLoaded,
  barCircleChart,
  xValuesLine,
  marketplaceVip,
  sales,
}) => {
  const formatValue = (value) => {
    return value >= 1000000
      ? (value / 1000000).toFixed(2) + "M"
      : value >= 1000
      ? (value / 1000).toFixed(2) + "K"
      : value;
  };
  const [legend, setlegend] = useState(["VIP", "Marketplace"]);
  const handleLegendSelection = (selectedLegends) => {
    setlegend(selectedLegends);
  };

  const salesVMP = { name: "Marketplace", value: marketplaceVip?.totalVmp };
  const salesVIP = { name: "VIP", value: marketplaceVip?.totalVip };

  console.log(marketplaceVip);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-1 grid-cols-1 gap-6">
        {!dataLoaded && <div className="lds-dual-ring"></div>}
        {barCircleChart && <BarCircleChart datas={barCircleChart} />}
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        <CardChart title={"Marketplace & VIP"} paragraph="">
          {marketplaceVip && (
            <>
              <BarChar
                title={""}
                colorBarOne={"black"}
                colorBarTwo={"#2799F6"}
                dataLeyend={["VIP", "Marketplace"]}
                dataOne={marketplaceVip.vip}
                dataTwo={marketplaceVip.vmp}
                xValues={xValuesLine}
                onLegendSelect={handleLegendSelection}
              />
              <div className="grid grid-cols-2 justify-between">
                {legend.length === 2 ? (
                  <>
                    <div className="flex justify-start">
                      Marketplace:{" "}
                      {`$ ${formatValue(marketplaceVip.totalVmp)}, ${
                        marketplaceVip.percentageVmp
                      }%`}
                    </div>
                    <div className="flex justify-end">
                      VIP:{" "}
                      {`$ ${formatValue(marketplaceVip.totalVip)}, ${
                        marketplaceVip.percentageVip
                      }%`}
                    </div>
                  </>
                ) : legend.includes("VIP") ? (
                  <div className="flex justify-end">
                    VIP:{" "}
                    {`$ ${formatValue(marketplaceVip.totalVip)}, ${
                      marketplaceVip.percentageVip
                    }%`}
                  </div>
                ) : legend.includes("Marketplace") ? (
                  <div className="flex justify-start">
                    Marketplace:{" "}
                    {`$ ${formatValue(marketplaceVip.totalVmp)}, ${
                      marketplaceVip.percentageVmp
                    }%`}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </CardChart>
        <CardChart title={"Marketplace & VIP YTD"} paragraph="">
          {dataLoaded ? (
            <>
              <PieChart
                datas={[salesVIP, salesVMP]}
                colors={["#000000", "#1473E6"]}
                formatter=""
              />
              <p>*VIP: Applies only to Government and Education</p>
            </>
          ) : (
            <div className="lds-dual-ring"></div>
          )}
        </CardChart>
      </div>
    </div>
  );
};

export default MarketplaceSection;
