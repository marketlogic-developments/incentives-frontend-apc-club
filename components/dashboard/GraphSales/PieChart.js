import { Tooltip } from "@mantine/core";
import React from "react";

const PieChart = ({ percentageTotal, sales, color, type }) => {
  function formatNumber(number) {
    const formattedNumber =
      number >= 1000000
        ? (number / 1000000).toFixed(2) + "M"
        : number >= 1000
        ? (number / 1000).toFixed(2) + "K"
        : number.toLocaleString("en-US");
    return formattedNumber;
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div
          className={`radial-progress flex justify-center items-center`}
          style={{
            "--value": percentageTotal,
            color: `${color}`,
          }}
        >
          <div className="w-[80%] h-[80%] bg-white text-center p-5 flex flex-col items-center justify-center rounded-full text-white">
            <div>
              <p className="font-bold lg:!text-[0.65rem] xl:!text-sm text-black">
                ${formatNumber(sales)}
              </p>
              <p className="lg:!text-[0.65rem] xl:!text-xs text-black">
                {Number(percentageTotal).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Tooltip label={`${Number(percentageTotal).toFixed(2)} %`}>
            <p className="text-center text-sm">{type}</p>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default PieChart;
