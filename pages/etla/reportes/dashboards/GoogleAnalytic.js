import React from "react";
import { Maintenance, TitleWithIcon } from "../../../components";
import { IncentivePoints } from "../../../components/icons";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";

const GoogleAnalytic = () => {
  const GA4 = dynamic(() =>
    import("../../../components/embedreports/ga4").then((powerBi) => powerBi.default)
  );
  const [t, i18n] = useTranslation("global");
  const router = useRouter();
  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<IncentivePoints />}
          title={t("Reportes.google_analytic")}
        />
      </div>
      <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
        <AiOutlineHome className="cursor-pointer"
          onClick={() => {
          router.push("/dashboard");
          }}/>
        <span><AiOutlineRight /></span>
        <span className="cursor-pointer"
          onClick={() => {
          router.push("/reportesDashboard");
          }}
        >
        My Reports
        </span>
        <span><AiOutlineRight /></span>
        <span className="font-bold text-[#1473E6]"
        >
        {t("Reportes.google_analytic")}
        </span>
      </div>
      <div className="m-6 flex flex-col gap-16">
        <GA4 />
      </div>
    </div>
  );
};

export default GoogleAnalytic;
