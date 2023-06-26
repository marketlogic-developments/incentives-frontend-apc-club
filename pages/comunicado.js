import React, { useState } from "react";
import ButtonBgOut from "../components/buttons/ButtonBgOut";
import {
  Evento,
  MarkertPlace,
  Novedad,
  Promociones,
} from "../components/comunicados";
import { exampleDataPromociones as data } from "../components/example/dataComunicado";
import { useTranslation } from "react-i18next";
import client from "../contentful";
import { useEffect } from "react";
import { useMemo } from "react";

export async function getStaticProps() {
  const entries = await client.getEntries({
    content_type: "comunicados",
  });

  return {
    props: {
      entries: entries.items.map(({ fields }) => fields),
    },
  };
}

const comunicado = ({ entries }) => {
  const [content, setContent] = useState("Promociones");
  const [contentFul, setContentFul] = useState([]);

  useEffect(() => {
    setContentFul(entries);
  }, [entries]);

  const exampleDataPromociones = data;

  const dataSelectOne = [
    { image: "", value: "promo1", label: "Promoción 1" },
    { image: "", value: "promo2", label: "Promoción 2" },
    { image: "", value: "promo3", label: "Promoción 3" },
  ];

  const [t, i18n] = useTranslation("global");

  const contentPage = useMemo(() => {
    if (content === t("comunicado.promocion")) {
      return (
        <Promociones
          selectData={dataSelectOne}
          datas={exampleDataPromociones}
          dataContentful={contentFul}
        />
      );
    }
    if (content === t("comunicado.marketPlace")) {
      return <MarkertPlace dataContentful={contentFul} />;
    }
    if (content === t("comunicado.novedad")) {
      return <Novedad dataContentful={contentFul} />;
    }
    if (content === t("comunicado.evento")) {
      return <Evento contentFul={contentFul} />;
    }
  }, [entries, contentFul, content]);

  return (
    <div className="grid w-full">
      <div className="gap-2 my-3 flex justify-start">
        <ButtonBgOut
          title={t("comunicado.promocion")}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={() => setContent(t("comunicado.promocion"))}
        />
        <ButtonBgOut
          title={t("comunicado.marketPlace")}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={() => setContent(t("comunicado.marketPlace"))}
        />
        <ButtonBgOut
          title={t("comunicado.novedad")}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={() => setContent(t("comunicado.novedad"))}
        />
        <ButtonBgOut
          title={t("comunicado.evento")}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={() => setContent(t("comunicado.evento"))}
        />
      </div>
      {contentPage}
    </div>
  );
};

export default comunicado;
