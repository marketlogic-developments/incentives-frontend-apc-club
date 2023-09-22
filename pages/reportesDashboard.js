import React, { useEffect, useState } from "react";
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
  Medal,
} from "../components/icons";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import Promotion from "../components/icons/Reportes/Promotion";

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

  const SharePoint = dynamic(() =>
    import("../components/embedreports/sharePoint").then(
      (powerBi) => powerBi.default
    )
  );
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
          <RocketIcon
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.user_performance")}
          onClick={() => {
            router.push("/reportes/dashboards/UserPerformance");
          }}
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
            router.push("/reportes/dashboards/DigiPointsPerformance");
          }}
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
            router.push("/reportes/dashboards/InvoiceReport");
          }}
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
            router.push("/reportes/dashboards/DigiPointsRedemption");
          }}
        >
          <Request
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={"Promo Report"}
          onClick={() => {
            router.push("/reportes/dashboards/DigiPointsPromotions");
          }}
        >
          <Promotion
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={"Behavior Report"}
          onClick={() => {
            router.push("/reportes/dashboards/DigiPointsBehavior");
          }}
        >
          <Promotion
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.google_analytic")}
          onClick={() => {
            router.push("/reportes/dashboards/GoogleAnalytic");
          }}
        >
          <IncentivePoints
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.custom_care")}
          onClick={() => {
            router.push("/reportes/dashboards/CustomCare");
          }}
        >
          <CustomIcon
            width={screen < 639 ? 45 : 70}
            height={screen < 639 ? 45 : 70}
          />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.summary")}
          onClick={() => {
            router.push("/reportes/dashboards/Summary");
          }}
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
            router.push("/reportes/dashboards/SoImportReport");
          }}
        >
          <RegistrationPerformance />
        </CardReportes>
        {/* <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.registration_performance")}
          onClick={() => {
            router.push("/reportes/dashboards/RegistrationPerformance");
          }}
        >
          <Thunderbolt />
        </CardReportes> */}
        {/* <CardReportes
          styles="hover:bg-red-600 hover:text-white"
          titleCard={t("Reportes.follow_up")}
          onClick={() => {
            router.push("/reportes/dashboards/FollowUp");
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
