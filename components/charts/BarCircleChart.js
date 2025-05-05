import { Tooltip } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

const BarCircleChart = ({ datas }) => {
  const [t, i18n] = useTranslation("global");
  const formatValue = (value) => {
    const truncateToTwoDecimals = (num) => Math.trunc(num * 100) / 100;
  
    return value >= 1000000
      ? truncateToTwoDecimals(value / 1000000) + "M"
      : value >= 1000
      ? truncateToTwoDecimals(value / 1000) + "K"
      : truncateToTwoDecimals(value);
  };
  

  return (
    <div className="flex flex-col w-full p-4 gap-4 targetDashboard">
      <div className="flex justify-between">
        <h3 className="font-bold xl:!text-xl lg:!text-sm">
          {t("Reportes.level_goal")}
        </h3>
      </div>
      <div className="grid grid-flow-row h-full gap-3">
        {datas.map((data, index) =>
          !["CERTIFIED", "DISTRIBUTOR"].includes(data.level) ? (
            <div className="flex flex-col gap-2" key={index}>
              <div className="flex w-full justify-between">
                <p className="lg:!text-xs xl:!text-sm font-bold">
                  {data.level}
                </p>
                <p className="!text-sm">
                  {`$ ${formatValue(data.total_revenue)} / $ ${formatValue(
                    data.total_expected_revenue
                  )}`}
                </p>
              </div>
              <Tooltip
                label={`${Math.trunc(
                  ((data.total_revenue * 100) /
                    (data.total_expected_revenue === "0.00"
                      ? 1
                      : data.total_expected_revenue)) * 100
                ) / 100}%`}
              >
                <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
                  <span
                    className={`bg-[${data?.color}] h-full rounded-full`}
                    style={{
                      width: `${Math.trunc(
                        (data.total_revenue * 100) /
                          (data.total_expected_revenue === "0.00"
                            ? 1
                            : data.total_expected_revenue)
                      )}%`,
                    }}
                  />
                </div>
              </Tooltip>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default BarCircleChart;
