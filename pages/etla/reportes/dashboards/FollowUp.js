import React from "react";
import { useTranslation } from "react-i18next";
import { Maintenance, TitleWithIcon } from "../../../../components";
import { TermsConditions } from "../../../../components/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";

const FollowUp = () => {
  const PowerBiReport = dynamic(() =>
    import("../../../../components/embedreports/PowerBiReport").then(
      (powerBi) => powerBi.default
    )
  );
  const [t, i18n] = useTranslation("global");
  const router = useRouter();
  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<TermsConditions />}
          title={t("Reportes.follow_up")}
        />
      </div>
      <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
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
          {t("Reportes.follow_up")}
        </span>
      </div>
      <div className="m-6 flex flex-col gap-16">
        <PowerBiReport />
      </div>
    </div>
  );
};

export default FollowUp;
