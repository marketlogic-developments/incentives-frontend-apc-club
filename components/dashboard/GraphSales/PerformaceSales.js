import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const PerformaceSales = ({ CC, DC }) => {
  const data = [...CC, ...DC];
  const [t, i18n] = useTranslation("global");

  function formatNumber(number) {
    const formattedNumber =
      number >= 1000000
        ? (number / 1000000).toFixed(1) + "M"
        : number >= 1000
        ? (number / 1000).toFixed(1) + "K"
        : number.toLocaleString("en-US");
    return formattedNumber;
  }

  const dataSalesByType = useMemo(() => {
    if (data.length > 1) {
      return {
        renewal: data
          .filter(({ business_type }) => business_type === "Renewal")
          .map(({ total_sales_amount }) => Number(total_sales_amount))
          .reduce((current, prev) => current + prev),
        newBusiness: data
          .filter(({ business_type }) => business_type === "New Business")
          .map(({ total_sales_amount }) => Number(total_sales_amount))
          .reduce((current, prev) => current + prev),
        totalSales: data
          .map(({ total_sales_amount }) => Number(total_sales_amount))
          .reduce((current, prev) => current + prev),

        totalSalesCC: CC.map(({ total_sales_amount }) =>
          Number(total_sales_amount)
        ).reduce((current, prev) => current + prev),
        totalSalesDC: DC.map(({ total_sales_amount }) =>
          Number(total_sales_amount)
        ).reduce((current, prev) => current + prev),
        withCC:
          (CC.map(({ total_sales_amount }) =>
            Number(total_sales_amount)
          ).reduce((current, prev) => current + prev) *
            100) /
          data
            .map(({ total_sales_amount }) => Number(total_sales_amount))
            .reduce((current, prev) => current + prev),
        withDC:
          (DC.map(({ total_sales_amount }) =>
            Number(total_sales_amount)
          ).reduce((current, prev) => current + prev) *
            100) /
          data
            .map(({ total_sales_amount }) => Number(total_sales_amount))
            .reduce((current, prev) => current + prev),
      };
    }

    return 0;
  }, [data]);

  return (
    <div className="flex flex-col w-full p-4 gap-4 targetDashboard">
      <div className="flex justify-between">
        <h3 className="font-bold xl:!text-xl lg:!text-sm">Performance</h3>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="lg:!text-xs xl:!text-sm font-bold">
              {t("dashboard.renovaciones")}
            </p>
            <p className="!text-sm">
              {formatNumber(Number(dataSalesByType.renewal))}/
              {formatNumber(Number(dataSalesByType.totalSales))}
            </p>
          </div>
          <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
            <span
              className="bg-[#232B2F] h-full rounded-full"
              style={{
                width: `${
                  (dataSalesByType.newBusiness * 100) /
                  dataSalesByType.totalSales
                }%`,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="lg:!text-xs xl:!text-sm font-bold">
              {t("dashboard.nbusiness")}
            </p>
            <p className="!text-sm">
              {formatNumber(Number(dataSalesByType.newBusiness))}/
              {formatNumber(Number(dataSalesByType.totalSales))}
            </p>
          </div>
          <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
            <span
              className="bg-[#21A5A2] h-full rounded-full"
              style={{
                width: `${
                  (dataSalesByType.renewal * 100) / dataSalesByType.totalSales
                }%`,
              }}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="lg:!text-xs xl:!text-sm font-bold">Creative Cloud</p>
            <p className="!text-sm">
              {formatNumber(Number(dataSalesByType.totalSalesCC))}/
              {formatNumber(Number(dataSalesByType.totalSales))}
            </p>
          </div>
          <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
            <span
              className="bg-[#1473E6] h-full rounded-full"
              style={{ width: `${dataSalesByType.withCC}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="lg:!text-xs xl:!text-sm font-bold">Document Cloud</p>
            <p className="!text-sm">
              {formatNumber(Number(dataSalesByType.totalSalesDC))}/
              {formatNumber(Number(dataSalesByType.totalSales))}
            </p>
          </div>
          <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
            <span
              className={`bg-primary h-full rounded-full`}
              style={{ width: `${dataSalesByType.withDC}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformaceSales;
