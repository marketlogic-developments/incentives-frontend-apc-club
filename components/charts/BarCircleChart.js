import React from "react";
import { useTranslation } from "react-i18next";

const BarCircleChart = ({
  datas = [
    {
      data: 0,
      color: "#232B2F",
    },
  ],
}) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="flex flex-col w-full p-4 gap-4 targetDashboard">
      <div className="flex justify-between">
        <h3 className="font-bold xl:!text-xl lg:!text-sm">Performance</h3>
      </div>
      <div className="grid grid-flow-row h-full gap-3">
        {datas.map((data, index) => (
          <div className="flex flex-col gap-2" key={index}>
            <div className="flex w-full justify-between">
              <p className="lg:!text-xs xl:!text-sm font-bold">{t("Gold")}</p>
              <p className="!text-sm">{Number(data.data * 100).toFixed(0)}%</p>
            </div>
            <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
              <span
                className={`bg-[${data?.color}] h-full rounded-full`}
                style={{
                  width: `${Number(data.data) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarCircleChart;
