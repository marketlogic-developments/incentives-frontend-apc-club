import React, { FC, useState } from "react";
import ButtonBgOut from "../components/buttons/ButtonBgOut";
import {
  Evento,
  MarkertPlace,
  Novedad,
  Promociones,
} from "../components/comunicados";
import { useTranslation } from "react-i18next";
import client from "../contentful";
import { useEffect } from "react";
import { useMemo } from "react";
import Videos10 from "../components/comunicados/videos/Videos10";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const entries = await client.getEntries({
    content_type: "comunicados",
  });
  const videos = await client.getEntries({
    content_type: "videos10Aos",
  });

  return {
    props: {
      entries: entries.items.map(({ fields }) => fields),
      videos: videos.items.map(({ fields }) => fields),
    },
  };
}

const comunicado: FC<{entries:any, videos:any}> = ({ entries, videos }) => {
  const [content, setContent] = useState(0);
  const [contentFul, setContentFul] = useState([]);
  const router = useRouter();
  const { query } = router;

  console.log(query);

  useEffect(() => {
    setContentFul(entries);
  }, [entries]);


  const dataSelectOne = [
    { image: "", value: "promo1", label: "Promoción 1" },
    { image: "", value: "promo2", label: "Promoción 2" },
    { image: "", value: "promo3", label: "Promoción 3" },
  ];

  const [t, i18n] = useTranslation("global");

  const contentPage = useMemo(() => {
    if (content === 0 && query) {
      return (
        <Promociones
          selectData={dataSelectOne}

          dataContentful={contentFul}
        />
      );
    }
    // === "?videos"
    if (content === 1 || query) {
      return <Videos10 dataContentfulVideos={videos} />;
    }
    // if (content === t("comunicado.marketPlace")) {
    //   return <MarkertPlace dataContentful={contentFul} />;
    // }
    // if (content === t("comunicado.novedad")) {
    //   return <Novedad dataContentful={contentFul} />;
    // }
    // if (content === t("comunicado.evento")) {
    //   return <Evento contentFul={contentFul} />;
    // }
  }, [entries, contentFul, content]);

  return (
    <div className="grid w-full">
      <div className="gap-2 my-3 flex justify-start">
        <ButtonBgOut
          title={String(t("menu.comunicados"))}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={() => {
            setContent(0);
            router.push("/comunicado");
          }}
        />
        <ButtonBgOut
          title={String(t("comunicado.videosTestimonios"))}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={() => setContent(1)}
        />
        {/* <ButtonBgOut
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
        /> */}
      </div>
      {contentPage}
    </div>
  );
};

export default comunicado;
