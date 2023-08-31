import React, { useMemo, useState } from "react";
import { Organization, SalesYoy, TitleWithIcon } from "../../../components";
import { useTranslation } from "react-i18next";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/router";
import ButtonBgOut from "../../../components/buttons/ButtonBgOut";
import { SalesYtd, DigipoinstPerformance } from "../../../components/reports";

const Summary = () => {
  /* Variables and conts */
  const router = useRouter();
  const [content, setContent] = useState("SalesYtd");
  const [t, i18n] = useTranslation("global");

  return (
    <div className="mt-4">
      <div className="pt-2 grid items-center grid-rows-1 gap-3">
        <TitleWithIcon icon={""} title={t("Reportes.summary")} />
      </div>
      <div className="flex w-full items-center gap-4 mt-4 pb-2 pl-0">
        <AiOutlineHome
          className="cursor-pointer"
          onClick={() => {
            router.push("/dashboard");
          }}
        />
        <span>
          <AiOutlineRight />
        </span>
        <span
          className="cursor-pointer"
          onClick={() => {
            router.push("/reportesDashboard");
          }}
        >
          My Reports
        </span>
        <span>
          <AiOutlineRight />
        </span>
        <span className="font-bold text-[#1473E6]">
          {t("Reportes.summary")}
        </span>
      </div>
      <div className="gap-2 my-3 flex justify-start">
        <ButtonBgOut
          title={t("Reportes.sales_ytd")}
          styles={`${
            content === "SalesYtd"
              ? "bg-red-100"
              : "hover:bg-red-100 hover:!text-red-500 hover:!text-sm"
          }`}
          onClick={() => setContent(t("SalesYtd"))}
        />
        {/* <ButtonBgOut
          title={t("Reportes.grow_sales_yt")}
          styles={`${
            content === "SalesYoy"
              ? "bg-red-100"
              : "hover:bg-red-100 hover:!text-red-500 hover:!text-sm"
          }`}
          onClick={() => setContent(t("SalesYoy"))}
        /> */}
        <ButtonBgOut
          title={t("Reportes.digipoints_performance")}
          styles={`${
            content === "DigipoinstPerformance"
              ? "bg-red-100"
              : "hover:bg-red-100 hover:!text-red-500 hover:!text-sm"
          }`}
          onClick={() => setContent(t("DigipoinstPerformance"))}
        />
        {/* <ButtonBgOut
          title={t("Reportes.organization")}
          styles={`${
            content === "Organization"
              ? "bg-red-100"
              : "hover:bg-red-100 hover:!text-red-500 hover:!text-sm"
          }`}
          onClick={() => setContent(t("Organization"))}
        /> */}
      </div>
      <div className={`${content === "SalesYtd" ? "block" : 'hidden'}`}>
        <SalesYtd />
      </div>
      <div className={`${content === "DigipoinstPerformance" ? "block" : 'hidden'}`}>
        <DigipoinstPerformance />
      </div>
      {/* <div className={`${content === "Organization" ? "block" : 'hidden'}`}>
        <Organization />
      </div> */}
    </div>
  );
};

export default Summary;
