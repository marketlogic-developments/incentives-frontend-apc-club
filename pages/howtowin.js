import React, { useEffect, useState } from "react";
import ContainerContent from "../components/containerContent";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const howtowin = () => {
  const user = useSelector((state) => state.user.user);
  const [t, i18n] = useTranslation("global");
  const [copy, setCopy] = useState({ text: "", tablePath: "" });

  useEffect(() => {
    if (user.companyId === null) {
      setCopy({
        text: t("htw.copyDist"),
        tablePath: t("htw.pathTableDist"),
      });
    } else {
      setCopy({
        text: t("htw.copyCanal"),
        tablePath: t("htw.pathTableCanal"),
      });
    }
  }, []);

  return (
    <ContainerContent pageTitle={t("dashboard.htw")}>
      <div className="m-6 flex flex-col gap-6">
        <div>
          <figure>
            <img
              src={t("htw.pathBanner")}
              alt="htw_Adobe"
              className="w-full"
            ></img>
          </figure>
        </div>
        <div>
          <p
            dangerouslySetInnerHTML={{ __html: copy.text }}
            className="text-xl"
          ></p>
        </div>
        <div className="grid place-items-center w-full">
          <figure className="flex w-[85%]">
            <img
              src={copy.tablePath}
              alt="table_htw_Adobe"
              className="w-full block"
            ></img>
          </figure>
        </div>
        <div className="w-full text-center">
          <p className="text-4xl font-bold">{t("htw.copyTextFooter")}</p>
        </div>
      </div>
    </ContainerContent>
  );
};

export default howtowin;
