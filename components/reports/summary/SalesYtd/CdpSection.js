import React from "react";
import TargetSales from "../../../dashboard/GraphSales/TargetSales";
import PerformaceSales from "../../../dashboard/GraphSales/PerformaceSales";
import PieChart from "../../../dashboard/GraphSales/PieChart";
import { useTranslation } from "react-i18next";
import PerformanceSaleSection from "./PerformanceSaleSection";

const CdpSection = ({ data }) => {
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
        <div className="flex flex-col mb-4 mt-4 w-full gap-6">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                <div className="flex flex-col w-full p-3 gap-6 targetDashboard relative">
                    <div className="flex justify-between">
                        <h3 className="font-bold xl:!text-xl lg:!text-sm">
                            {"Creative Cloud"}
                        </h3>
                        <p className="xl:!text-2xl lg:!text-xl font-semibold">
                            $ {formatNumber(data.expectedCloud)}
                        </p>
                    </div>
                    <div className="flex justify-around my-auto">
                        <PieChart
                            sales={data.sales_cc_renewal}
                            percentageTotal={
                                Math.trunc((data.sales_cc_renewal * 10000) / data.expectedCloud) / 100
                            }
                            color={"#232B2F"}
                            type={t("Auto Renewal")}
                        />
                        <PieChart
                            sales={data.sales_cc_newbusiness}
                            percentageTotal={
                                Math.trunc((data.sales_cc_newbusiness * 10000) / data.expectedCloud) / 100
                            }                              
                            color={"#21A5A2"}
                            type={t("New Business")}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full p-3 gap-6 targetDashboard relative">
                    <div className="flex justify-between">
                        <h3 className="font-bold xl:!text-xl lg:!text-sm">
                            {"Document Cloud"}
                        </h3>
                        <p className="xl:!text-2xl lg:!text-xl font-semibold">
                            $ {formatNumber(data.expectedDoc)}
                        </p>
                    </div>
                    <div className="flex justify-around my-auto">
                        <PieChart
                            sales={data.sales_dc_renewal}
                            percentageTotal={
                                Math.trunc((data.sales_dc_renewal * 10000) / data.expectedDoc) / 100
                            }                              
                            color={"#232B2F"}
                            type={t("Auto Renewal")}
                        />
                        <PieChart
                            sales={data.sales_dc_newbusiness}
                            percentageTotal={
                                Math.trunc((data.sales_dc_newbusiness * 10000) / data.expectedDoc) / 100
                            }  
                            color={"#21A5A2"}
                            type={t("New Business")}
                        />
                    </div>
                </div>
                <PerformanceSaleSection data={data} />
            </div>
        </div>
    );
};

export default CdpSection;
