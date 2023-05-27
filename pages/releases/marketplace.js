import React from "react";
import ContainerContent from "../../components/containerContent";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const marketplace = () => {
  const route = useRouter();
  const [t, i18n] = useTranslation("global");

  return (
    <>
      <ContainerContent pageTitle={"MarketPlace"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="w-full flex justify-center flex-col">
            <figure className="w-full">
              {i18n.resolvedLanguage === "por" ? (
                <img
                  src="/assets/releases/marketplacePor.webp"
                  className="bannersImg"
                />
              ) : (
                <img
                  src="/assets/releases/marketplace.webp"
                  className="bannersImg"
                />
              )}
            </figure>
            <div className="w-full bg-[#2c2c2c]">
              <p className="text-2xl text-white font-bold p-2 text-center">
                {t("releases.vip")}
              </p>
            </div>
            <figure className="w-full">
              {i18n.resolvedLanguage === "por" ? (
                <img
                  src="/assets/releases/bodyMarketplacePor.webp"
                  className="bannersImg"
                />
              ) : (
                <img
                  src="/assets/releases/bodyMarketplace.webp"
                  className="bannersImg"
                />
              )}
            </figure>
            <div className="w-full justify-center flex">
              <button
                className="btn !btn-outline my-5 w-1/2"
                onClick={() => route.push("/howtowin")}
              >
                {t("releases.htw")}
              </button>
            </div>
          </div>
        </div>
      </ContainerContent>
    </>
  );
};

export default marketplace;
