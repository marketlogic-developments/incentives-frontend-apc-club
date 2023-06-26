import React from "react";
import { PageFix } from "../../icons";
import Maintenance from "../../maintenance/Maintenance";
import { useTranslation } from "react-i18next";

const Eventos = ({ contentFul }) => {
  const [t, i18n] = useTranslation("global");
  console.log(contentFul);
  return (
    <div>
      <Maintenance icon={<PageFix />} title={t("comunicado.evento")} />
    </div>
  );
};

export default Eventos;
