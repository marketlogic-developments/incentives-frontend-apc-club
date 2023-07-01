import React from "react";
import { useTranslation } from "react-i18next";
import { Maintenance, TitleWithIcon } from "../../../components";
import { TermsConditions } from "../../../components/icons";
import dynamic from "next/dynamic";

const FollowUp = () => {

  const PowerBiReport = dynamic(() =>
    import("../../../components/embedreports/PowerBiReport").then((powerBi) => powerBi.default)
  );
  const [t, i18n] = useTranslation("global");
  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<TermsConditions />}
          title={t("Reportes.follow_up")}
        />
      </div>
      <div className="m-6 flex flex-col gap-16">
        <PowerBiReport />
      </div>
    </div>
  );
};

export default FollowUp;
