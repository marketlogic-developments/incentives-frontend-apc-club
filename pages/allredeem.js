import React, { useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContainerContent from "../components/containerContent";
import AllRedenciones from "../components/herramientas/AllRedenciones";

const allRedeem = () => {
  const [t, i18n] = useTranslation("global");
  const [content, setContent] = useState(0);

  return (
    <>
      <ContainerContent pageTitle={"Redenciones"}>
        <AllRedenciones />
      </ContainerContent>
    </>
  );
};

export default allRedeem;
