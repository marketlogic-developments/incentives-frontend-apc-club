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
  function formatValue(number) {
    let formattedNumber;
    if (number >= 1000000) {
        formattedNumber = Math.floor((number / 1000000) * 100) / 100 + "M";
    } else if (number >= 1000) {
        formattedNumber = Math.floor((number / 1000) * 100) / 100 + "K";
    } else {
        formattedNumber = number.toLocaleString("en-US");
    }
    return formattedNumber;
}
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
                    <p className="flex justify-start !text-sm">
                      Marketplace:{" "}
                      {`$ ${formatValue(marketplaceVip.totalVmp)}, ${marketplaceVip.percentageVmp
                        }%`}
                    </p>
                    <p className="flex justify-end !text-sm">
                      VIP:{" "}
                      {`$ ${formatValue(marketplaceVip.totalVip)}, ${marketplaceVip.percentageVip
                        }%`}
                    </p>
                  </>
                ) : legend.includes("VIP") ? (
                  <p className="flex justify-end !text-sm">
                    VIP:{" "}
                    {`$ ${formatValue(marketplaceVip.totalVip)}, ${marketplaceVip.percentageVip
                      }%`}
                  </p>
                ) : legend.includes("Marketplace") ? (
                  <p className="flex justify-start !text-sm">
                    Marketplace:{" "}
                    {`$ ${formatValue(marketplaceVip.totalVmp)}, ${marketplaceVip.percentageVmp
                      }%`}
                  </p>
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
              <p className="!text-sm">
                *VIP: Applies only to Government and Education
              </p>
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
