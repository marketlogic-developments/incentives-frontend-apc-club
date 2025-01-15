import React, { FC, useEffect, useState } from "react";
import ContainerContent from "../components/containerContent";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import GraphSales from "../components/dashboard/graphSales";
import TableStats from "../components/dashboard/TableStats";
import CarouselBanners from "../components/dashboard/carouselBanners";
import TableTopsRanking from "../components/dashboard/TableTopsRanking";
import client from "../contentful";
import { getVideos } from "../store/reducers/contentful.reducer";
import SectionDigipointsPA from "../components/dashboard/SectionDigipointsPA";
import { RootState } from "store/store";

interface Props {
  entries: any;
  banners: any;
  infoApc: any;
}

const dashboard: FC<Props> = ({ entries, banners, infoApc }) => {
  const { user, token } = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    dispatch(getVideos(infoApc));
    // if (
    //   !user?.passwordReset &&
    //   dataUserSwitch.prevData === undefined &&
    //   token.length !== 0
    // ) {
    //   redirection();
    // }
  }, [user, token]);

  return (
    <>
      <ContainerContent pageTitle={"Dashboard"}>
        <div className="m-6 flex flex-col gap-10 ">
          <CarouselBanners banners={banners} />
          <hr color="red" />
          <div className="gap-10 flex flex-col h-full items-center">
            <TableStats />
            <GraphSales />
            {user?.roles[0].name === "partner_admin" && <SectionDigipointsPA />}

            <TableTopsRanking
              containerStyles={
                "mt-4 !rounded-tl-lg !rounded-tr-lg !overflow-x-auto max-h-[300px]"
              }
              tableStyles={"table-zebra !text-sm"}
              thStyles={"sticky text-white"}
              cols={[
                t("Top"),
                t("tabla.nombre"),
                t("Email"),
                t("Revenue (USD)"),
                t("DigiPoints"),
                t("tabla.region"),
              ]}
            />
          </div>
        </div>
      </ContainerContent>
    </>
  );
};
export async function getServerSideProps() {
  const infoApc = await client.getEntries({
    content_type: "modalInformationApc",
  });

  const entries = await client.getEntries({
    content_type: "videosApc",
  });

  const banners = await client.getEntries({
    content_type: "banners",
  });

  return {
    props: {
      entries: entries.items.map(({ fields }) => fields),
      banners: banners.items.map(({ fields }) => fields),
      infoApc: infoApc.items.map(({ fields }) => fields),
      protected: true,
      userTypes: [1, 2, 3, 4, 5],
    },
  };
}

export default dashboard;
