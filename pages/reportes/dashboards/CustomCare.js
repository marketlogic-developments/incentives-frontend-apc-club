import React from 'react'
import { useTranslation } from "react-i18next";
import { Maintenance, TitleWithIcon } from '../../../components';
import { CodeRocket, CustomIcon } from '../../../components/icons';

const CustomCare = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<CustomIcon />}
          title={t("Reportes.custom_care")}
        />
      </div>
      <Maintenance icon={<CodeRocket />} title="Custom Care" text="Custom Care goes here!" />
    </div>
  )
}

export default CustomCare