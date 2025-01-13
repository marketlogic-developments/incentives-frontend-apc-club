import React, { useState } from "react";
import { SearchInput, SelectInput } from "../../inputs";
import TitleWithIcon from "../../titles/TitleWithIcon";
import { SearchIcon, Star } from "../../icons";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import TargetPromociones from "./TargetPromociones";
import { Select } from "@mantine/core";
import ButtonBgOut from "../../buttons/ButtonBgOut";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const Promociones = ({ selectData = [], datas = [], dataContentful }) => {
  const [t, i18n] = useTranslation("global");
  const [filter, setFilter] = useState("");
  const [content, setContent] = useState("Todos");
  const { user } = useSelector((state: RootState) => state.currentUser);

  const filters = (item) => {
    if (item?.exceptions) {
      const org =
        user.companyId !== null ? user.company : user.distributionChannel;

      if (
        item?.exceptions?.countrys.includes(org.country) ||
        item?.exceptions?.region.includes(org.region)
      ) {
        return item;
      } else return false;
    }

    return item;
  };

  const data = dataContentful.filter((data) => {
    if (data.role === "PA" && user?.roles[0].name !== "sales_rep") {
      return data.role === "PA";
    }
    if (data.role === "SR" && user?.roles[0].name === "sales_rep") {
      return data.role === "SR";
    }

    return data;
  });

  const categorys = () => {
    const arraysCategorys = dataContentful.map(({ category }) =>
      category.split(",")
    );

    const categorysEsp = arraysCategorys.map((data) => data[0]);
    const categorysPor = arraysCategorys.map((data) => data[1]);
    const categorysEn = arraysCategorys.map((data) => data[2]);

    if (i18n.language === "por") {
      return [...new Set(categorysPor)];
    }
    if (i18n.language === "es") {
      return [...new Set(categorysEsp)];
    }
    if (i18n.language === "en") {
      return [...new Set(categorysEn)];
    }
  };

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
      <div className="flex gap-6 justify-center mt-6">
        {["Todos", ...categorys()].map((data) => (
          <ButtonBgOut
            title={data}
            styles={`hover:bg-red-100 hover:!text-red-500 hover:!text-sm ${
              data === content && "bg-red-100 !text-red-500"
            }`}
            onClick={() => setContent(data)}
          />
        ))}
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
          {data
            .filter((data) => {
              if (content === "Todos") {
                return data;
              }

              filters(data);

              return data.category.includes(content);
            })
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
