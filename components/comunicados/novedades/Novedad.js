import React from "react";
import Maintenance from "../../maintenance/Maintenance";
import { CodeRocket } from "../../icons";
import { useTranslation } from "react-i18next";
const Novedad = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div>
      <Maintenance icon={<CodeRocket />} title={t("comunicado.novedad")} />
    </div>
  );
};

export default Novedad;
