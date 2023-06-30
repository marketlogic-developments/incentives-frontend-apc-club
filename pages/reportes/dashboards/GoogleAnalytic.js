import React from "react";
import { Maintenance, TitleWithIcon } from "../../../components";
import { IncentivePoints } from "../../../components/icons";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

const GoogleAnalytic = () => {
  const GA4 = dynamic(() =>
    import("../../../components/embedreports/ga4").then((powerBi) => powerBi.default)
  );
  const [t, i18n] = useTranslation("global");
  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<IncentivePoints />}
          title={t("Reportes.google_analytic")}
        />
      </div>
      <div className="m-6 flex flex-col gap-16">
        <GA4 />
      </div>
    </div>
  );
};

export default GoogleAnalytic;
