import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const TargetPromociones = ({ data }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const [t, i18n] = useTranslation("global");

  const date = {
    dd: data.thisDate.split("T")[0].split("-")[2],
    mm: data.thisDate.split("T")[0].split("-")[1],
    aa: data.thisDate.split("T")[0].split("-")[0],
  };

  const hour = data.thisDate.split("T")[1].split("-")[0];

  const months = {
    "01": t("meses.enero"),
    "02": t("meses.febrero"),
    "03": t("meses.marzo"),
    "04": t("meses.abril"),
    "05": t("meses.mayo"),
    "06": t("meses.junio"),
    "07": t("meses.julio"),
    "08": t("meses.agosto"),
    "09": t("meses.septiembre"),
    10: t("meses.octubre"),
    11: t("meses.noviembre"),
    12: t("meses.diciembre"),
  };

  const pdfs =
    data.resAndDist && user.distributionChannelId !== null
      ? data?.pdfdelete?.filter(({ fields }) => fields.description === "Dist")
      : data?.pdfdelete?.filter(({ fields }) => fields.description !== "Dist");

  const link = () => {
    if (pdfs) {
      return i18n.resolvedLanguage === "por"
        ? pdfs[1]?.fields.file.url
        : pdfs[0]?.fields.file.url;
    }

    return data.dynamicDirection;
  };

  return (
    <>
      <div className="sm:ml-14 col-span-1 object-contain flex justify-center items-center">
        <Image
          src={`https:${data.imageComunicate.fields.file.url}`}
          width={320}
          height={228}
          priority
          className="object-contain rounded-md"
        />
      </div>
      <div className="grid col-span-2 justify-items-start sm:pr-56 md:pr-3 pr-3">
        <p className="sm:text-sm text-xs">
          {i18n.resolvedLanguage === "por"
            ? `Publicado em ${date.dd} de ${months[date.mm]} del ${
                date.aa
              } às ${hour}`
            : `Publicado el ${date.dd} de ${months[date.mm]} del ${
                date.aa
              } a las ${hour}`}
        </p>
        <p className="font-bold sm:text-2xl text-sm">
          {i18n.resolvedLanguage === "por" ? data.titlePor : data.title}
        </p>
        <p>
          {i18n.resolvedLanguage === "por"
            ? data.descriptionPor
            : data.description.content[0].content[0].value}
        </p>
        <a
          className="text-blue-500 font-bold cursor-pointer hover:text-blue-400 sm:text-sm text-xs"
          href={link()}
          target="_blank"
          // onClick={() => {
          //   router.push({
          //     pathname: `/comunicados${data.dynamicDirection}`,
          //     query: {
          //       data: JSON.stringify(data),
          //     },
          //   });
          // }}
        >
          {t("comunicado.leer")}
        </a>
      </div>
    </>
  );
};

export default TargetPromociones;
