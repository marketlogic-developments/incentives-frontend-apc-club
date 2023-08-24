import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import BarChar from "../../../cardReportes/BarChar";
import BarCircleChart from "../../../charts/BarCircleChart";

const MarketplaceSection = ({
  barCircleChart,
  xValuesLine,
  marketplaceVip,
}) => {
  return (
    <div className="flex flex-col">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        {barCircleChart && <BarCircleChart datas={barCircleChart} />}
        <CardChart title={"Marketplace & VIP"} paragraph="">
          {marketplaceVip && (
            <BarChar
              title={""}
              colorBarOne={"black"}
              colorBarTwo={"#2799F6"}
              dataLeyend={["VIP", "Marketplace"]}
              dataOne={marketplaceVip.vip}
              dataTwo={marketplaceVip.vmp}
              xValues={xValuesLine}
            />
          )}
        </CardChart>
      </div>
    </div>
  );
};

export default MarketplaceSection;
