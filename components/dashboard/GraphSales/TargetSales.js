import { useTranslation } from "react-i18next";
import PieChart from "./PieChart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const TargetSales = ({ data, goal, goalNew, goalRenew, saleNew, saleRenew }) => {
    const [t, i18n] = useTranslation("global");

    function formatNumber(number) {
        let formattedNumber;
        if (number >= 1000000) {
            formattedNumber = Math.floor((number / 1000000) * 100) / 100 + "M";
        } else if (number >= 1000) {
            formattedNumber = Math.floor((number / 1000) * 100) / 100 + "K";
        } else {
            formattedNumber = number.toLocaleString("en-US");
        }
        return formattedNumber;
    }

    return (
        <div className="flex flex-col w-full p-3 gap-6 targetDashboard relative">
            <div className="flex justify-between">
                <h3 className="font-bold xl:!text-xl lg:!text-sm">
                    {data[0]?.business_unit}
                </h3>
                <p className="xl:!text-2xl lg:!text-xl font-semibold">
                    $
                    {formatNumber(
                        // Math.round(
                        //   goal
                        //     .map(({ meta }) => Number(meta))
                        //     .reduce((currently, preValue) => currently + preValue, 0)
                        // )
                        goal
                    )}
                </p>
            </div>
            <div className="flex justify-around my-auto">
                <PieChart
                    sales={saleRenew}
                    goal={goalRenew}
                    percentageTotal={(saleRenew / goal) * 100}
                    color={"#232B2F"}
                    // type={t("dashboard.renovaciones")}
                    type={'Auto Renewal'}
                />
                <PieChart
                    sales={saleNew}
                    goal={goalNew}
                    percentageTotal={(saleNew / goal) * 100}
                    color={"#21A5A2"}
                    // type={t("dashboard.nbusiness")}
                    type={'New Business'}
                />
            </div>
        </div>
    );
};

export default TargetSales;
