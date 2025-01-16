import React from "react";
import { useTranslation } from "react-i18next";

const ModalTCPa = () => {
  const [t,i18n]=useTranslation("global")
  return (
    <div className="w-full p-6 flex flex-col items-center gap-6 justify-center p-14">
      <h2 className="text-2xl font-bold text-center">
        {t("terminosycondiciones.warningpp.title")}
      </h2>
      <p className="text-center">
      {t("terminosycondiciones.warningpp.one")} <br/>
      {t("terminosycondiciones.warningpp.two")}
      </p>
      <p>
      {t("terminosycondiciones.warningpp.contactus")}{" "}
        <a href="mailto:info@adobepcclub.com" className="text-primary">
          info@adobepcclub.com
        </a>
      </p>
    </div>
  );
};

export default ModalTCPa;
