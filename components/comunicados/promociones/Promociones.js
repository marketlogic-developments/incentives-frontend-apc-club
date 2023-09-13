import React, { useState } from "react";
import { SearchInput, SelectInput } from "../../inputs";
import TitleWithIcon from "../../titles/TitleWithIcon";
import { SearchIcon, Star } from "../../icons";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import TargetPromociones from "./TargetPromociones";
import { Select } from "@mantine/core";

const Promociones = ({ selectData = [], datas = [], dataContentful }) => {
  const [t, i18n] = useTranslation("global");
  const [filter, setFilter] = useState("");

  return (
    <div>
      <div className="grid justify-items-center items-center pt-8 pb-8">
        {t("comunicado.bienvenida")}
      </div>
      <div className="grid justify-items-center">
        <div className="font-bold sm:text-4xl text-xl text-center">
          {t("comunicado.tituloPartUno")}
        </div>
        <div className="font-bold sm:text-4xl text-xl text-center">
          {t("comunicado.tituloPartDos")}
        </div>
        <div className="font-bold sm:text-4xl text-xl text-center text-red-600">
          {t("comunicado.tituloPartTres")}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 justify-items-center pt-8">
        <div className="grid grid-cols-2 gap-3">
          <TitleWithIcon
            icon={<Star width={40} height={40} />}
            title={t("comunicado.novedad")}
          />
          <div className="grid justify-items-end items-center">
            <Select
              placeholder={t("comunicado.mostrar")}
              size={"sm"}
              data={[
                { label: t("tabla.recienteA"), value: "des" },
                { label: t("tabla.antiguoR"), value: "asc" },
              ]}
              onChange={(data) => setFilter(data)}
            />
          </div>
        </div>
        <div className="grid items-center justify-items-center w-full">
          {/* <SearchInput
            image={<SearchIcon />}
            placeHolder={t("comunicado.buscar")}
            stylesContainer={""}
            stylesInput={
              "border-none pl-8 placeholder:text-sm rounded-full !w-full"
            }
          /> */}
        </div>
      </div>
      <div className="flex justify-center items-center pt-10 pb-10">
        <div className="grid grid-cols-3 gap-3 gap-y-6">
          {dataContentful
            .sort((a, b) => {
              const dateA = new Date(a.thisDate);
              const dateB = new Date(b.thisDate);

              return filter === "des" ? dateA - dateB : dateB - dateA;
            })
            .map((data, index) => (
              <TargetPromociones data={data} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Promociones;
