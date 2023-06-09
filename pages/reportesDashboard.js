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
  UserPerformance,
} from "../components/icons";
import { useTranslation } from "react-i18next";

const reportesDashboard = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="mt-8">
      <InputReporte image={<SearchIcon />} placeHolder={"Buscar"} />
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-5">
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard={t('Reportes.sales_performance')}
        >
          <RocketIcon width={70} height={70} />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard={t('Reportes.digiPoints_performance')}
        >
          <DigitalPoints />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard={t('Reportes.user_performance')}
        >
          <UserPerformance />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard={t('Reportes.incentive_points_allocation')}
        >
          <IncentivePoints />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard={t('Reportes.digiPoints_redemption_request')}
        >
          <Request />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard={t('Reportes.custom_care')}
        >
          <CustomIcon />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard={t('Reportes.registration_performance')}
        >
          <RegistrationPerformance />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard={t('Reportes.follow_up')}
        >
          <TermsConditions />
        </CardReportes>
      </div>
    </div>
  );
};

export default reportesDashboard;
