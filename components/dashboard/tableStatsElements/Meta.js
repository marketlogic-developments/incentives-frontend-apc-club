import React from "react";
import { useTranslation } from "react-i18next";

const Meta = ({ user, formatNumber, goal, percentageTotal, sales }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="flex flex-col w-full p-6 gap-6 targetDashboard">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold 2xl:text-xl">Partners Goal</h2>
        </div>
        <div className="min-h-[45px] flex items-top">
          {goal !== 0 && (
            <p className="2xl:!text-3xl lg:!text-xl font-bold text-[#1473E6]">
              ${formatNumber(goal)}
            </p>
          )}
        </div>
      </div>
      <div className="h-full w-full flex justify-center ">
        <div
          className="radial-progress text-[#1473E6] flex justify-center items-center radialMeta"
          style={{
            "--value": percentageTotal,
          }}
        >
          <div className="w-[80%] h-[80%] bg-white text-center p-5 flex flex-col items-center justify-center rounded-full text-white">
            <p className="font-bold lg:!text-xs xl:!text-xl text-black">
              ${formatNumber(sales)}
            </p>
            <p className="lg:!text-xs xl:!text-base text-black">
              {percentageTotal}%
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center metaLi gap-3">
        <li
          className="customLi lg:!text-xs xl:!text-base"
          style={{ "--colorBg": "#2799F6" }}
        >
          {/* {t("dashboard.Alcanzado")} */}
          Achieved
        </li>
        <li
          className="customLi lg:!text-xs xl:!text-base"
          style={{ "--colorBg": "#F2F2F2" }}
        >
          {/* {t("dashboard.faltante")} */}
          Target Balance
        </li>
      </div>
    </div>
  );
};

export default Meta;
