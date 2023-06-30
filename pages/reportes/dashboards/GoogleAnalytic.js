import React from "react";
import { Maintenance, TitleWithIcon } from "../../../components";
import { IncentivePoints } from "../../../components/icons";
import { useTranslation } from "react-i18next";

const GoogleAnalytic = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<IncentivePoints />}
          title={t("Reportes.google_analytic")}
        />
      </div>
      <Maintenance title="Google Analytics" text="Google Analytic goes here!" />
    </div>
  );
};

export default GoogleAnalytic;
