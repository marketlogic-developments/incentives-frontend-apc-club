import React from "react";
import { useTranslation } from "react-i18next";
import { Maintenance, TitleWithIcon } from "../../../components";
import { TermsConditions } from "../../../components/icons";

const FollowUp = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<TermsConditions />}
          title={t("Reportes.follow_up")}
        />
      </div>
      <Maintenance
        title="Follow up"
        text="Follow up goes here!"
      />
    </div>
  );
};

export default FollowUp;
