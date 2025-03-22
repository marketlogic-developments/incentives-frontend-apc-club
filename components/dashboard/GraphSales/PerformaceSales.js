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
        const formattedNumber =
            number >= 1000000
                ? (number / 1000000).toFixed(2) + "M"
                : number >= 1000
                    ? (number / 1000).toFixed(2) + "K"
                    : number.toLocaleString("en-US");
        return formattedNumber;
    }

    const dataSalesByType = useMemo(() => {
        if (data.length > 1) {
            return {
                renewal: data
                    .filter(({ business_type }) => business_type === "Renewal")
                    .map(({ total_sales_amount }) => Number(total_sales_amount))
                    .reduce((current, prev) => current + prev, 0),
                newBusiness: data
                    .filter(({ business_type }) => business_type === "New Business")
                    .map(({ total_sales_amount }) => Number(total_sales_amount))
                    .reduce((current, prev) => current + prev, 0),

                totalSalesNewBusiness: goals
                    .filter(({ business_type }) => business_type === "New Business")
                    .map(({ meta }) => Number(meta))
                    .reduce((current, prev) => current + prev, 0),
                totalSalesRenew: goals
                    .filter(({ business_type }) => business_type === "Renewal")
                    .map(({ meta }) => Number(meta))
                    .reduce((current, prev) => current + prev, 0),
                totalSalesCreativeCloud: goals
                    .filter(({ business_unit }) => business_unit === "Creative Cloud")
                    .map(({ meta }) => Number(meta))
                    .reduce((current, prev) => current + prev, 0),
                totalSalesDocument: goals
                    .filter(({ business_unit }) => business_unit === "Document Cloud")
                    .map(({ meta }) => Number(meta))
                    .reduce((current, prev) => current + prev, 0),

                totalSalesCC: CC.map(({ total_sales_amount }) =>
                    Number(total_sales_amount)
                ).reduce((current, prev) => current + prev, 0),
                totalSalesDC: DC.map(({ total_sales_amount }) =>
                    Number(total_sales_amount)
                ).reduce((current, prev) => current + prev, 0),
                withCC:
                    (CC.map(({ total_sales_amount }) =>
                        Number(total_sales_amount)
                    ).reduce((current, prev) => current + prev, 0) *
                        100) /
                    goals
                        .filter(({ business_unit }) => business_unit === "Creative Cloud")
                        .map(({ meta }) => Number(meta))
                        .reduce((current, prev) => current + prev, 0),
                withDC:
                    (DC.map(({ total_sales_amount }) =>
                        Number(total_sales_amount)
                    ).reduce((current, prev) => current + prev, 0) *
                        100) /
                    goals
                        .filter(({ business_unit }) => business_unit === "Document Cloud")
                        .map(({ meta }) => Number(meta))
                        .reduce((current, prev) => current + prev, 0),
            };
        }

        return {
            renewal: 0,
            totalSalesRenew: 0,
            newBusiness: 0,
            totalSalesNewBusiness: 0,
            totalSalesCC: 0,
            totalSalesCreativeCloud: 0,
            totalSalesDC: 0,
            totalSalesDocument: 0,
        };
    }, [data]);

    // console.log(dataSalesByType);

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
                            ${formatNumber(Number(VMP_AUTO_RENEWAL_CC_SALES + VMP_AUTO_RENEWAL_DC_SALES))}/ $
                            {formatNumber(VMP_AUTO_RENEWAL_CC + VMP_AUTO_RENEWAL_DC)}
                        </p>
                    </div>
                    <Tooltip
                        label={`${Number(
                            (VMP_AUTO_RENEWAL_CC_SALES + VMP_AUTO_RENEWAL_DC_SALES * 100) / (VMP_AUTO_RENEWAL_CC + VMP_AUTO_RENEWAL_DC)
                        ).toFixed(2)}%`}
                    >
                        <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
                            <span
                                className="bg-[#232B2F] h-full rounded-full"
                                style={{
                                    width: `${(VMP_AUTO_RENEWAL_CC_SALES + VMP_AUTO_RENEWAL_DC_SALES * 100) /
                                        (VMP_AUTO_RENEWAL_CC + VMP_AUTO_RENEWAL_DC)
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
                            (VIP_NEW_BUSINESS_CC_SALES + VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_DC_SALES * 100) /
                            (VIP_NEW_BUSINESS_CC + VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_DC)
                        ).toFixed(2)}%`}
                    >
                        <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
                            <span
                                className="bg-[#21A5A2] h-full rounded-full"
                                style={{
                                    width: `${(VIP_NEW_BUSINESS_CC_SALES + VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_DC_SALES * 100) /
                                        (VIP_NEW_BUSINESS_CC + VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_DC)
                                        }%`,
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
                        (VIP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_CC_SALES + VMP_AUTO_RENEWAL_CC_SALES * 100) /
                        (VIP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_CC + VMP_AUTO_RENEWAL_CC)
                    ).toFixed(2)}%`}>
                        <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
                            <span
                                className="bg-[#1473E6] h-full rounded-full"
                                style={{ width: `${
                                    (VIP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_CC_SALES + VMP_AUTO_RENEWAL_CC_SALES * 100) /
                                    (VIP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_CC + VMP_AUTO_RENEWAL_CC)
                                }%` }}
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
                        (VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_DC_SALES + VMP_AUTO_RENEWAL_DC_SALES * 100) /
                        (VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_DC + VMP_AUTO_RENEWAL_DC)
                    ).toFixed(2)}%`}>
                        <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
                            <span
                                className={`bg-primary h-full rounded-full`}
                                style={{ width: `${
                                    (VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_DC_SALES + VMP_AUTO_RENEWAL_DC_SALES * 100) /
                                    (VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_DC + VMP_AUTO_RENEWAL_DC)
                                }%` }}
                            />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default PerformaceSales;
