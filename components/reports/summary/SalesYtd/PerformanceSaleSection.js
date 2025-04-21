import { Tooltip } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";

const PerformanceSaleSection = ({ data }) => {
  const [t, i18n] = useTranslation("global");
  const formatNumber = (number) => {
    const formattedNumber =
      number >= 1000000
        ? Math.floor((number / 1000000) * 100) / 100 + "M"
        : number >= 1000
          ? Math.floor((number / 1000) * 100) / 100 + "K"
          : number.toLocaleString("en-US");
    return formattedNumber;
  };
  const totalSalesRenewal =
    Number(data.sales_cc_renewal) + Number(data.sales_dc_renewal);
  const totalExpectedRenewal =
    Number(data.expected_cc_renew) + Number(data.expected_dc_renew);
  const renewalPercentage = Math.round((totalSalesRenewal / totalExpectedRenewal) * 100 * 100) / 100;

  const totalSalesNewBusiness =
    Number(data.sales_dc_newbusiness) + Number(data.sales_cc_newbusiness);
  const totalExpectedNewBusiness =
    Number(data.expected_dc_newbusiness) + Number(data.expected_cc_newbusiness);
  const newBusinessPercentage = Math.round((totalSalesNewBusiness / totalExpectedNewBusiness) * 100 * 100) / 100;

  const totalSalesRenewalAndNewBusiness =
    Number(data.sales_cc_renewal) + Number(data.sales_cc_newbusiness);
  const creativeCloud = Math.round((totalSalesRenewalAndNewBusiness / data.expectedCloud) * 100 * 100) / 100;

  const totalDocumentSalesRenewalAndNewBusiness =
    Number(data.sales_dc_renewal) + Number(data.sales_dc_newbusiness);
  const documentCloud = Math.round((totalDocumentSalesRenewalAndNewBusiness / data.expectedDoc) * 100 * 100) / 100;
  return (
    <div className="flex flex-col w-full p-4 gap-4 targetDashboard">
      <div className="flex justify-between">
        <h3 className="font-bold xl:!text-xl lg:!text-sm">Performance</h3>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="lg:!text-xs xl:!text-sm font-bold">
              {"Auto Renewal"}
            </p>
            <p className="!text-sm">
              $
              {formatNumber(
                Number(data.sales_cc_renewal) + Number(data.sales_dc_renewal)
              )}
              / $
              {formatNumber(
                Number(data.expected_cc_renew) + Number(data.expected_dc_renew)
              )}
            </p>
          </div>
          <Tooltip label={`${renewalPercentage}%`}>
            <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
              <span
                className="bg-[#232B2F] h-full rounded-full"
                style={{
                  width: `${renewalPercentage}%`,
                }}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="lg:!text-xs xl:!text-sm font-bold">
              {t("New Business")}
            </p>
            <p className="!text-sm">
              $
              {formatNumber(
                Number(data.sales_dc_newbusiness) +
                Number(data.sales_cc_newbusiness)
              )}
              / $
              {formatNumber(
                Number(data.expected_dc_newbusiness) +
                Number(data.expected_cc_newbusiness)
              )}
            </p>
          </div>
          <Tooltip label={`${newBusinessPercentage}%`}>
            <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
              <span
                className="bg-[#21A5A2] h-full rounded-full"
                style={{
                  width: `${newBusinessPercentage}%`,
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
              $
              {formatNumber(
                Number(data.sales_cc_renewal) +
                Number(data.sales_cc_newbusiness)
              )}
              / ${formatNumber(Number(data.expectedCloud))}
            </p>
          </div>
          <Tooltip label={`${creativeCloud}%`}>
            <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
              <span
                className="bg-[#1473E6] h-full rounded-full"
                style={{
                  width: `${creativeCloud}%`,
                }}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between">
            <p className="lg:!text-xs xl:!text-sm font-bold">Document Cloud</p>
            <p className="!text-sm">
              $
              {formatNumber(
                Number(data.sales_dc_renewal) +
                Number(data.sales_dc_newbusiness)
              )}
              / ${formatNumber(Number(data.expectedDoc))}
            </p>
          </div>
          <Tooltip label={`${documentCloud}%`}>
            <div className="w-full bg-base-200 h-[13px] flex rounded-full overflow-hidden">
              <span
                className={`bg-primary h-full rounded-full`}
                style={{
                  width: `${documentCloud}%`,
                }}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSaleSection;
