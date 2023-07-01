import React from "react";
import { CardReportes, InputReporte } from "../components";
import {
  CustomIcon,
  DigitalPoints,
  IncentivePoints,
  RegistrationPerformance,
  Request,
  RocketIcon,
  SearchIcon,
  TermsConditions,
  Thunderbolt,
  UserPerformance,
} from "../components/icons";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const reportesDashboard = () => {
  const router = useRouter();
  const [t, i18n] = useTranslation("global");
  return (
    <div className="mt-8">
      {/* <InputReporte
        image={<SearchIcon />}
        placeHolder={"Buscar"}
        stylesContainer={"mb-8"}
        stylesInput={
          "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
        }
      /> */}
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-5">
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.sales_performance")}
          onClick={() => {
            router.push("/reportes/dashboards/SalesPerformance");
          }}
        >
          <RocketIcon width={70} height={70} />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.user_performance")}
          onClick={() => {
            router.push("/reportes/dashboards/UserPerformance");
          }}
        >
          <UserPerformance />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.invoice_report")}
          onClick={() => {
            router.push("/reportes/dashboards/InvoiceReport");
          }}
        >
          <IncentivePoints />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.digiPoints_redemption_request")}
          onClick={() => {
            router.push("/reportes/dashboards/DigiPointsRedemption");
          }}
        >
          <Request />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.google_analytic")}
          onClick={() => {
            router.push("/reportes/dashboards/GoogleAnalytic");
          }}
        >
          <IncentivePoints />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.custom_care")}
          onClick={() => {
            router.push("/reportes/dashboards/CustomCare");
          }}
        >
          <CustomIcon />
        </CardReportes>
        {/* <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.so_import")}
          onClick={() => {
            router.push("/reportes/dashboards/SoImportReport");
          }}
        >
          <RegistrationPerformance />
        </CardReportes> */}
        {/* <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.registration_performance")}
          onClick={() => {
            router.push("/reportes/dashboards/RegistrationPerformance");
          }}
        >
          <Thunderbolt />
        </CardReportes> */}
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.follow_up")}
          onClick={() => {
            router.push("/reportes/dashboards/FollowUp");
          }}
        >
          <TermsConditions />
        </CardReportes>
      </div>
    </div>
  );
};

export default reportesDashboard;
