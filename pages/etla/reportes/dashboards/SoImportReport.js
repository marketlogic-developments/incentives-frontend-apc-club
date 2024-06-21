import React from "react";
import { useTranslation } from "react-i18next";
import { Maintenance, TitleWithIcon } from "../../../../components";
import { PageFix, RegistrationPerformance } from "../../../../components/icons";

const SoImportReport = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<RegistrationPerformance />}
          title={t("Reportes.so_import")}
        />
      </div>
      <Maintenance
        icon={<PageFix />}
        title="SO import report"
        text="SO import report goes here!"
      />
    </div>
  );
};

export default SoImportReport;
