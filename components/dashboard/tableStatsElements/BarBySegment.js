import React from "react";

const BarBySegment = ({ percentageCC, percentageDC, formatNumber }) => {
  return (
    <div className="w-full max-sm:mx-auto flex flex-col gap-5 progressiveBar p-6 targetDashboard gap-6">
      <div>
        <h2 className="font-bold text-2xl">Licencias</h2>
        {/* <p></p> */}
      </div>
      <div className="w-full h-16 flex items-center gap-6 gapBar">
        <div className="flex items-center h-full cct text-center">
          <img
            src="/assets/dashboard/cc.webp"
            width={100}
            className="w-1/2 max-w-[58px]"
          ></img>
        </div>
        <div className="w-10/12 flex flex-col items-center justify-around h-full">
          <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
            {percentageCC.map((data) => (
              <div
                className={`tooltip ${
                  data.typeCC === "Teams"
                    ? "tooltip-primary bg-[#232B2F]"
                    : data.typeCC === "Enterprise"
                    ? "tooltip-secondary bg-[#1473E6]"
                    : "tooltip-success bg-[#009C3B]"
                } h-full barSales`}
                data-tip={`$${new Intl.NumberFormat().format(
                  parseInt(data.sales)
                )}`}
                style={{ width: `${data.tablePercentage}%` }}
              />
            ))}
          </div>
          <div className="w-full flex justify-between">
            {percentageCC.map((data) => (
              <p className="text-sm">
                {data.typeCC} <br />
                <p
                  className={`${
                    data.typeCC === "Teams"
                      ? "text-[#232B2F]"
                      : data.typeCC === "Enterprise"
                      ? "text-[#1473E6]"
                      : "text-[#009C3B]"
                  } font-bold`}
                >
                  {formatNumber(data.sales)}
                </p>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-16 flex items-center gap-6 gapBar">
        <div className="flex items-center h-full cci text-center">
          <img
            src="/assets/dashboard/DC.webp"
            className="w-1/2 max-w-[58px]"
          ></img>
        </div>
        <div className="w-10/12 flex flex-col items-center justify-around h-full">
          <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
            {percentageDC.map((data) => (
              <div
                className={`tooltip ${
                  data.typeDC === "Teams"
                    ? "tooltip-primary bg-[#EB1000]"
                    : data.typeDC === "Enterprise"
                    ? "tooltip-secondary bg-[#E9740A]"
                    : "tooltip-success bg-[#FFCE2E]"
                } h-full barSales`}
                data-tip={`$${new Intl.NumberFormat().format(
                  parseInt(data.sales)
                )}`}
                style={{
                  width: `${data.tablePercentage}%`,
                  color: "#ffffff",
                }}
              />
            ))}
          </div>
          <div className="w-full flex justify-between">
            {percentageDC.map((data) => (
              <p className="text-sm">
                {data.typeDC === "Teams" ? "Acrobat Pro" : data.typeDC} <br />{" "}
                <p
                  className={`${
                    data.typeDC === "Teams"
                      ? "text-[#EB1000]"
                      : data.typeDC === "Enterprise"
                      ? "text-[#E9740A]"
                      : "text-[#FFCE2E]"
                  } font-bold`}
                >
                  {formatNumber(data.sales)}
                </p>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarBySegment;
