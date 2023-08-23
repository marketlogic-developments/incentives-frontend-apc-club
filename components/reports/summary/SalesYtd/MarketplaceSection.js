import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import BarChar from "../../../cardReportes/BarChar";
import BarCircleChart from "../../../charts/BarCircleChart";

const MarketplaceSection = ({ xValuesLine, marketplaceVip }) => {
  return (
    <div className="flex flex-col">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
        <BarCircleChart
          datas={[
            { data: 0.25, color: "#232B2F" },
            { data: 0.5, color: "#1473E6" },
            { data: 0.75, color: "#21A5A2" },
          ]}
        />
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
