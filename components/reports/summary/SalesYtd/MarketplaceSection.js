import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import BarChar from "../../../cardReportes/BarChar";
import BarCircleChart from "../../../charts/BarCircleChart";

const MarketplaceSection = ({
  dataLoaded,
  barCircleChart,
  xValuesLine,
  marketplaceVip,
}) => {
  return (
    <div className="flex flex-col">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        {!dataLoaded && <div className="lds-dual-ring"></div>}
        {barCircleChart && <BarCircleChart datas={barCircleChart} />}
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
              />
              <div className="flex flex-col justify-between">
                Marketplace:{" "}
                {`$ ${marketplaceVip.totalVmp}, ${marketplaceVip.percentageVmp}%`}
                VIP:{" "}
                {`$ ${marketplaceVip.totalVip}, ${marketplaceVip.percentageVip}%`}
              </div>
            </>
          )}
        </CardChart>
      </div>
    </div>
  );
};

export default MarketplaceSection;
