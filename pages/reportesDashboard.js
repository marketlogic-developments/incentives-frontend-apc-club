import React from "react";
import { CardReportes } from "../components";
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

const reportesDashboard = () => {
  return (
    <div className="mt-8">
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-3">
          <div className="flex items-center h-full">
            <SearchIcon width={14} height={14} />
          </div>
        </div>
        <input
          type="text"
          placeholder="Buscar"
          class="input bg-base-200 border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
        />
      </div>
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-5">
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard="Sales Performance"
        >
          <RocketIcon width={70} height={70} />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard="DigiPoints performance"
        >
          <DigitalPoints />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard="User performance"
        >
          <UserPerformance />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard="Incentive points allocation"
        >
          <IncentivePoints />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard="DigiPoints redemption request"
        >
          <Request />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard="Custom care"
        >
          <CustomIcon />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard="Registration performance"
        >
          <RegistrationPerformance />
        </CardReportes>
        <CardReportes
          styles="hover:bg-red-500 hover:text-white"
          titleCard="Follow up"
        >
          <TermsConditions />
        </CardReportes>
      </div>
    </div>
  );
};

export default reportesDashboard;
