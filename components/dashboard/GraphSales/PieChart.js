import React from "react";

const PieChart = ({ percentageTotal, sales, color, type }) => {
  function formatNumber(number) {
    const formattedNumber =
      number >= 1000000
        ? (number / 1000000).toFixed(1) + "M"
        : number >= 1000
        ? (number / 1000).toFixed(1) + "K"
        : number.toLocaleString("en-US");
    return formattedNumber;
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`radial-progress flex justify-center items-center`}
        style={{
          "--value": percentageTotal,
          color: `${color}`,
        }}
      >
        <div className="w-[80%] h-[80%] bg-white text-center p-5 flex flex-col items-center justify-center rounded-full text-white">
          <p className="font-bold lg:!text-[0.65rem] xl:!text-sm text-black">
            ${formatNumber(sales)}
          </p>
          <p className="lg:!text-[0.65rem] xl:!text-xs text-black">
            {Math.round(percentageTotal)}%
          </p>
        </div>
      </div>
      <div className="w-full">
        <p className="text-center text-sm">{type}</p>
      </div>
    </div>
  );
};

export default PieChart;
