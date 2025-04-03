import { Tooltip } from "@mantine/core";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const PerformaceSales = ({
    CC,
    DC,
    goals,
    VIP_NEW_BUSINESS_CC,
    VIP_NEW_BUSINESS_DC,
    VMP_AUTO_RENEWAL_CC,
    VMP_AUTO_RENEWAL_DC,
    VMP_NEW_BUSINESS_CC,
    VMP_NEW_BUSINESS_DC,
    VIP_NEW_BUSINESS_CC_SALES,
    VIP_NEW_BUSINESS_DC_SALES,
    VMP_AUTO_RENEWAL_CC_SALES,
    VMP_AUTO_RENEWAL_DC_SALES,
    VMP_NEW_BUSINESS_CC_SALES,
    VMP_NEW_BUSINESS_DC_SALES,
}) => {
    const data = [...CC, ...DC];
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
        <div className="flex flex-col w-full p-4 gap-4 targetDashboard">
            <div className="flex justify-between">
                <h3 className="font-bold xl:!text-xl lg:!text-sm">Performance</h3>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <div className="flex w-full justify-between">
                        <p className="lg:!text-xs xl:!text-sm font-bold">
                            {/* {t("dashboard.renovaciones")} */}
                            Auto Renewal
                        </p>
                        <p className="!text-sm">
                            ${formatNumber(Number(VMP_AUTO_RENEWAL_CC_SALES + VMP_AUTO_RENEWAL_DC_SALES))}/ ${formatNumber(VMP_AUTO_RENEWAL_CC + VMP_AUTO_RENEWAL_DC)}
                        </p>
                    </div>
                    <Tooltip
                        label={`${Number(
                            ((VMP_AUTO_RENEWAL_CC_SALES + VMP_AUTO_RENEWAL_DC_SALES) / (VMP_AUTO_RENEWAL_CC + VMP_AUTO_RENEWAL_DC)) * 100
                        ).toFixed(2)}%`}
                    >
                        <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
                            <span
                                className="bg-[#232B2F] h-full rounded-full"
                                style={{
                                    width: `${((VMP_AUTO_RENEWAL_CC_SALES + VMP_AUTO_RENEWAL_DC_SALES) / (VMP_AUTO_RENEWAL_CC + VMP_AUTO_RENEWAL_DC)) * 100
                                        }%`,
                                }}
                            />
                        </div>
                    </Tooltip>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex w-full justify-between">
                        <p className="lg:!text-xs xl:!text-sm font-bold">
                            {/* {t("dashboard.nbusiness")} */}
                            New Business
                        </p>
                        <p className="!text-sm">
                            ${formatNumber(Number(VIP_NEW_BUSINESS_CC_SALES + VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_DC_SALES))}/ $
                            {formatNumber(VIP_NEW_BUSINESS_CC + VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_DC)}
                        </p>
                    </div>
                    <Tooltip
                        label={`${Number(
                            (
                                (VIP_NEW_BUSINESS_CC_SALES + VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_DC_SALES) / 
                                (VIP_NEW_BUSINESS_CC + VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_DC)) * 100).toFixed(2)}%`}
                    >
                        <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
                            <span
                                className="bg-[#21A5A2] h-full rounded-full"
                                style={{
                                    width: `${(
                                        (VIP_NEW_BUSINESS_CC_SALES + VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_DC_SALES) / 
                                        (VIP_NEW_BUSINESS_CC + VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_DC)) * 100}%`,
                                }}
                            />
                        </div>
                    </Tooltip>
                </div>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <div className="flex w-full justify-between">
                        <p className="lg:!text-xs xl:!text-sm font-bold">Creative Cloud</p>
                        <p className="!text-sm">
                            ${formatNumber(Number(VIP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_CC_SALES + VMP_AUTO_RENEWAL_CC_SALES))}/ $
                            {formatNumber(VIP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_CC + VMP_AUTO_RENEWAL_CC)}
                        </p>
                    </div>
                    <Tooltip label={`${Number(
                        (
                            (VIP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_CC_SALES + VMP_AUTO_RENEWAL_CC_SALES) / 
                            (VIP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_CC + VMP_AUTO_RENEWAL_CC)) * 100).toFixed(2)}%`}>
                        <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
                            <span
                                className="bg-[#1473E6] h-full rounded-full"
                                style={{
                                    width: `${(
                                        (VIP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_CC_SALES + VMP_AUTO_RENEWAL_CC_SALES) / 
                                        (VIP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_CC + VMP_AUTO_RENEWAL_CC)) * 100}%`
                                }}
                            />
                        </div>
                    </Tooltip>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex w-full justify-between">
                        <p className="lg:!text-xs xl:!text-sm font-bold">Document Cloud</p>
                        <p className="!text-sm">
                            ${formatNumber(Number(VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_DC_SALES + VMP_AUTO_RENEWAL_DC_SALES))}/ $
                            {formatNumber(VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_DC + VMP_AUTO_RENEWAL_DC)}
                        </p>
                    </div>
                    <Tooltip label={`${Number(
                        (
                            (VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_DC_SALES + VMP_AUTO_RENEWAL_DC_SALES) / 
                            (VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_DC + VMP_AUTO_RENEWAL_DC)) * 100).toFixed(2)}%`}>
                        <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
                            <span
                                className={`bg-primary h-full rounded-full`}
                                style={{
                                    width: `${(
                                        (VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_DC_SALES + VMP_AUTO_RENEWAL_DC_SALES) / 
                                        (VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_DC + VMP_AUTO_RENEWAL_DC)) * 100}%`
                                }}
                            />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default PerformaceSales;
