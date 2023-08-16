import React from "react";
import { useTranslation } from "react-i18next";

const BarCircleChart = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="flex flex-col w-full p-4 gap-4 targetDashboard">
      <div className="flex justify-between">
        <h3 className="font-bold xl:!text-xl lg:!text-sm">Performance</h3>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="lg:!text-xs xl:!text-sm font-bold">{t("Gold")}</p>
            <p className="!text-sm">25%</p>
          </div>
          <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
            <span
              className="bg-[#232B2F] h-full rounded-full"
              style={{
                width: `${0.25 * 100}%`,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="lg:!text-xs xl:!text-sm font-bold">{t("Platinum")}</p>
            <p className="!text-sm">50%</p>
          </div>
          <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
            <span
              className="bg-[#1473E6] h-full rounded-full"
              style={{
                width: `${0.5 * 100}%`,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="lg:!text-xs xl:!text-sm font-bold">{t("Platinum")}</p>
            <p className="!text-sm">75%</p>
          </div>
          <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
            <span
              className="bg-[#21A5A2] h-full rounded-full"
              style={{
                width: `${0.75 * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarCircleChart;
