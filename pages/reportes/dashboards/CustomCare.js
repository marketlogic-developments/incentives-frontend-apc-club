import React from "react";
import { useTranslation } from "react-i18next";
import { Maintenance, TitleWithIcon } from "../../../components";
import { CodeRocket, CustomIcon } from "../../../components/icons";
import dynamic from "next/dynamic";

const CustomCare = () => {
  const [t, i18n] = useTranslation("global");

  const Zoho = dynamic(() =>
    import("../../../components/embedreports/zoho").then((zoho) => zoho.default)
  );

  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<CustomIcon />}
          title={t("Reportes.custom_care")}
        />
      </div>
      <div className="m-6 flex flex-col gap-16">
        <Zoho />
      </div>
    </div>
  );
};

export default CustomCare;
