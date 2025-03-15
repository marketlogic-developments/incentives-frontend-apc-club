import { IconCurrentDigiPoints } from "public/assets/Icons/Digipoints/DigipointsIcons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { AssingInvoice } from "services/Invoices/invoices.service";

interface Props {
  invoiceData: AssingInvoice;
}

const TargetInvoice: FC<Props> = ({ invoiceData }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="border rounded-2xl h-fit flex flex-col w-2/3 justify-self-center p-6 gap-6 min-w-[72.6%]">
      <div className="w-full flex text-[#333333] text-sm">
        <p className="font-bold !text-base">{t("digipoints.dFactura")}</p>
      </div>
      <div className="flex gap-6">
        <IconCurrentDigiPoints />
        <div className="flex flex-col justify-center gap-1">
          <p className="!text-2xl font-bold">{invoiceData.points}</p>
          <p className="!text-sm">DigiPoints</p>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full">
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.31923 0.998047H3.32693C3.06223 0.998047 2.80836 1.1032 2.62119 1.29038C2.43401 1.47755 2.32886 1.73141 2.32886 1.99612V9.64802L5.32308 6.98649L8.3173 9.64802V1.99612C8.3173 1.73141 8.21215 1.47755 8.02497 1.29038C7.83779 1.1032 7.58393 0.998047 7.31923 0.998047Z"
                stroke="#1473E6"
                strokeWidth="0.665382"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="!text-xs font-bold">{t("tabla.nfactura")}</p>
          </div>
          <div className="flex gap-4">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_253_632)">
                <path
                  d="M9.75 1.875H2.25C1.62868 1.875 1.125 2.37868 1.125 3V9.75C1.125 10.3713 1.62868 10.875 2.25 10.875H9.75C10.3713 10.875 10.875 10.3713 10.875 9.75V3C10.875 2.37868 10.3713 1.875 9.75 1.875Z"
                  stroke="#1473E6"
                  strokeWidth="0.75"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.9375 6C7.24816 6 7.5 5.74816 7.5 5.4375C7.5 5.12684 7.24816 4.875 6.9375 4.875C6.62684 4.875 6.375 5.12684 6.375 5.4375C6.375 5.74816 6.62684 6 6.9375 6Z"
                  fill="#1473E6"
                />
                <path
                  d="M8.8125 6C9.12316 6 9.375 5.74816 9.375 5.4375C9.375 5.12684 9.12316 4.875 8.8125 4.875C8.50184 4.875 8.25 5.12684 8.25 5.4375C8.25 5.74816 8.50184 6 8.8125 6Z"
                  fill="#1473E6"
                />
                <path
                  d="M6.9375 7.875C7.24816 7.875 7.5 7.62316 7.5 7.3125C7.5 7.00184 7.24816 6.75 6.9375 6.75C6.62684 6.75 6.375 7.00184 6.375 7.3125C6.375 7.62316 6.62684 7.875 6.9375 7.875Z"
                  fill="#1473E6"
                />
                <path
                  d="M8.8125 7.875C9.12316 7.875 9.375 7.62316 9.375 7.3125C9.375 7.00184 9.12316 6.75 8.8125 6.75C8.50184 6.75 8.25 7.00184 8.25 7.3125C8.25 7.62316 8.50184 7.875 8.8125 7.875Z"
                  fill="#1473E6"
                />
                <path
                  d="M3.1875 7.875C3.49816 7.875 3.75 7.62316 3.75 7.3125C3.75 7.00184 3.49816 6.75 3.1875 6.75C2.87684 6.75 2.625 7.00184 2.625 7.3125C2.625 7.62316 2.87684 7.875 3.1875 7.875Z"
                  fill="#1473E6"
                />
                <path
                  d="M5.0625 7.875C5.37316 7.875 5.625 7.62316 5.625 7.3125C5.625 7.00184 5.37316 6.75 5.0625 6.75C4.75184 6.75 4.5 7.00184 4.5 7.3125C4.5 7.62316 4.75184 7.875 5.0625 7.875Z"
                  fill="#1473E6"
                />
                <path
                  d="M3.1875 9.75C3.49816 9.75 3.75 9.49816 3.75 9.1875C3.75 8.87684 3.49816 8.625 3.1875 8.625C2.87684 8.625 2.625 8.87684 2.625 9.1875C2.625 9.49816 2.87684 9.75 3.1875 9.75Z"
                  fill="#1473E6"
                />
                <path
                  d="M5.0625 9.75C5.37316 9.75 5.625 9.49816 5.625 9.1875C5.625 8.87684 5.37316 8.625 5.0625 8.625C4.75184 8.625 4.5 8.87684 4.5 9.1875C4.5 9.49816 4.75184 9.75 5.0625 9.75Z"
                  fill="#1473E6"
                />
                <path
                  d="M6.9375 9.75C7.24816 9.75 7.5 9.49816 7.5 9.1875C7.5 8.87684 7.24816 8.625 6.9375 8.625C6.62684 8.625 6.375 8.87684 6.375 9.1875C6.375 9.49816 6.62684 9.75 6.9375 9.75Z"
                  fill="#1473E6"
                />
                <path
                  d="M3 1.125V1.875M9 1.125V1.875"
                  stroke="#1473E6"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.875 3.75H1.125"
                  stroke="#1473E6"
                  strokeWidth="0.75"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_253_632">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="!text-xs font-bold">{t("tabla.fecha")}</p>
          </div>
          <div className="flex gap-4">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.07934 1.31254C3.88066 1.26934 1.26934 3.88067 1.31254 7.07934C1.3552 10.147 3.85305 12.6449 6.92074 12.6875C10.12 12.7313 12.7307 10.12 12.687 6.92129C12.6449 3.85305 10.147 1.3552 7.07934 1.31254ZM10.5361 10.2608C10.5252 10.2726 10.5119 10.2818 10.497 10.2878C10.4822 10.2939 10.4662 10.2966 10.4501 10.2958C10.4341 10.2949 10.4185 10.2906 10.4043 10.283C10.3902 10.2755 10.3779 10.2649 10.3682 10.252C10.1237 9.93204 9.82415 9.65808 9.48367 9.44293C8.7875 8.99613 7.90539 8.75004 7.00004 8.75004C6.09469 8.75004 5.21258 8.99613 4.51641 9.44293C4.17594 9.65798 3.87642 9.93185 3.63184 10.2518C3.62223 10.2646 3.60991 10.2752 3.59576 10.2827C3.5816 10.2903 3.56596 10.2946 3.54994 10.2955C3.53392 10.2963 3.51791 10.2936 3.50305 10.2876C3.48819 10.2815 3.47484 10.2723 3.46395 10.2605C2.66159 9.39436 2.20709 8.26258 2.18754 7.08207C2.14297 4.42125 4.32637 2.1941 6.98828 2.18754C9.6502 2.18098 11.8125 4.3425 11.8125 7.00004C11.8135 8.20902 11.3575 9.3737 10.5361 10.2608Z"
                fill="#1473E6"
              />
              <path
                d="M6.99994 3.9375C6.46072 3.9375 5.97318 4.13957 5.62673 4.5068C5.28029 4.87402 5.1072 5.3818 5.1463 5.92676C5.2256 7 6.05712 7.875 6.99994 7.875C7.94275 7.875 8.77263 7 8.85357 5.92703C8.89404 5.38727 8.72232 4.88414 8.37013 4.51008C8.02232 4.14094 7.5356 3.9375 6.99994 3.9375Z"
                fill="#1473E6"
              />
            </svg>

            <p className="!text-xs font-bold">Cliente</p>
          </div>
          <div className="flex gap-4">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_253_648)">
                <path
                  d="M9.53906 3H4.33594C3.59812 3 3 3.59812 3 4.33594V9.53906C3 10.2769 3.59812 10.875 4.33594 10.875H9.53906C10.2769 10.875 10.875 10.2769 10.875 9.53906V4.33594C10.875 3.59812 10.2769 3 9.53906 3Z"
                  stroke="#1473E6"
                  strokeWidth="0.75"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.98828 3L9 2.4375C8.99901 2.08971 8.86041 1.75644 8.61448 1.51052C8.36856 1.26459 8.03529 1.12599 7.6875 1.125H2.625C2.22754 1.12617 1.84669 1.28459 1.56564 1.56564C1.28459 1.84669 1.12617 2.22754 1.125 2.625V7.6875C1.12599 8.03529 1.26459 8.36856 1.51052 8.61448C1.75644 8.86041 2.08971 8.99901 2.4375 9H3"
                  stroke="#1473E6"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_253_648">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <p className="!text-xs font-bold">{t("tabla.sillas")}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="!text-xs">{invoiceData.invoices.sale.sales_order}</p>
          <p className="!text-xs">{invoiceData.invoices.sale.billing_date}</p>
          <p className="!text-xs">{invoiceData.invoices.sale.end_user_name1}</p>
          <p className="!text-xs">{invoiceData.invoices.sale.total_sales_us}</p>
        </div>
      </div>
    </div>
  );
};

export default TargetInvoice;
