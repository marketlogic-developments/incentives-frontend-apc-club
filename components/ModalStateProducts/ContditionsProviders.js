import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CardConditions from "./CardConditions";

const ContditionsProviders = ({ data }) => {
  const [t, i18n] = useTranslation("global");
  const [target, setTarget] = useState(0);
  const [dataProvider, setDataProvider] = useState(data[0]);

  const colorbg = (name) => {
    return name.split(" ")[0] === "Visa"
      ? "bgVisa"
      : name.split(" ")[0] === "MasterCard"
      ? "bgMaster"
      : name.split(" ")[0] === "Cencosud"
      ? "bg-info"
      : name.split(" ")[0] === "Rappi"
      ? "bgRappi"
      : name.split(" ")[0] === "Falabella" && "bgFalabella";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex lg:flex-row flex-col justify-between items-center">
        <p className="font-bold !text-base py-5">
          {t("estadoProducto.condiciones")}
        </p>
        <div className="containerBgCardsStatus flex gap-6">
          {data.map((data, index) => (
            <div
              className={` p-3 border-2 rounded-md cursor-pointer ${
                index === target && colorbg(data.name)
              }`}
              onClick={() => {
                setTarget(index);
                setDataProvider(data);
              }}
            >
              <img
                src={data.imagePath}
                className={`w-12 ${index !== target && "brightness-50"}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-[#F5F5F5] rounded-md">
        <CardConditions
          description={
            i18n.resolvedLanguage === "por"
              ? dataProvider.cardInfoPT
              : dataProvider.cardInfoES
          }
        />
      </div>
    </div>
  );
};

export default ContditionsProviders;
