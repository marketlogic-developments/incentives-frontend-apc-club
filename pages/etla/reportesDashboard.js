import React, { useEffect, useState } from "react";
import { CardReportes, InputReporte } from "../../components";
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
  Medal,
  ArrowRight,
} from "../../components/icons";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import Promotion from "../../components/icons/Reportes/Promotion";

const reportesDashboard = () => {
  const router = useRouter();
  const [screen, setScreen] = useState();
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    setScreen(window.innerWidth);
    const handleWindowResize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

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
            router.push("/etla/reportes/dashboards/SalesPerformance");
          }}
          extra={<ArrowRight />}
        >
          <RocketIcon
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.user_performance")}
          onClick={() => {
            router.push("/etla/reportes/dashboards/UserPerformance");
          }}
          extra={<ArrowRight />}
        >
          <UserPerformance
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={"Partner T&C"}
          onClick={() => {
            router.push("/etla/reportes/dashboards/PartnerTyc");
          }}
          extra={<ArrowRight />}
        >
          <UserPerformance
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={"DigiPoints Performance"}
          onClick={() => {
            router.push("/etla/reportes/dashboards/DigiPointsPerformance");
          }}
          extra={<ArrowRight />}
        >
          <Medal
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.invoice_report")}
          onClick={() => {
            router.push("/etla/reportes/dashboards/InvoiceReport");
          }}
          extra={<ArrowRight />}
        >
          <IncentivePoints
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.digiPoints_redemption_request")}
          onClick={() => {
            router.push("/etla/reportes/dashboards/DigiPointsRedemption");
          }}
          extra={<ArrowRight />}
        >
          <Request
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.google_analytic")}
          onClick={() => {
            router.push("/etla/reportes/dashboards/GoogleAnalytic");
          }}
          extra={<ArrowRight />}
        >
          <IncentivePoints
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.summary")}
          onClick={() => {
            router.push("/etla/reportes/dashboards/Summary");
          }}
          extra={<ArrowRight />}
        >
          <RocketIcon
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        {/* <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.so_import")}
          onClick={() => {
            router.push("/etla/reportes/dashboards/SoImportReport");
          }}
        >
          <RegistrationPerformance />
        </CardReportes>
        {/* <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.registration_performance")}
          onClick={() => {
            router.push("/etla/reportes/dashboards/RegistrationPerformance");
          }}
        >
          <Thunderbolt />
        </CardReportes> */}
        {/* <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.follow_up")}
          onClick={() => {
            router.push("/etla/reportes/dashboards/FollowUp");
          }}
        >
          <TermsConditions />
        </CardReportes> */}
      </div>
      {/* <SharePoint /> */}
    </div>
  );
};

export default reportesDashboard;
