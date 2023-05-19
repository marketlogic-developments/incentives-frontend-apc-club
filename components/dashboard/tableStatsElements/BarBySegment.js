import React from "react";

const BarBySegment = ({ percentageCC, percentageDC }) => {
  return (
    <div className="w-full max-sm:mx-auto flex flex-col gap-5 progressiveBar justify-center shadow-md rounded-md p-6">
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
                    ? "tooltip-primary bg-primary"
                    : data.typeCC === "Enterprise"
                    ? "tooltip-secondary bg-secondary"
                    : "tooltip-success bg-success"
                } h-full barSales`}
                data-tip={`$${new Intl.NumberFormat().format(
                  parseInt(data.sales)
                )}`}
                style={{ width: `${data.tablePercentage}%` }}
              />
            ))}
          </div>
          <div className="w-full flex justify-between">
            <p className="text-sm font-semibold">
              Teams <br /> 70k
            </p>
            <p className="text-sm font-semibold">
              Enterprise <br /> 70k
            </p>
            <p className="text-sm font-semibold">
              Education <br /> 70k
            </p>
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
                    ? "tooltip-primary bg-primary"
                    : data.typeDC === "Enterprise"
                    ? "tooltip-secondary bg-secondary"
                    : "tooltip-success bg-success"
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
            <p className="text-sm font-semibold">Acrobat Pro</p>
            <p className="text-sm font-semibold">Enterprise</p>
            <p className="text-sm font-semibold">Education</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarBySegment;
