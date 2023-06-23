import React from "react";
import Maintenance from "../../maintenance/Maintenance";
import { useTranslation } from "react-i18next";

const MarkertPlace = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div>
      <Maintenance title={t("comunicado.marketPlace")} />
    </div>
  );
};

export default MarkertPlace;
