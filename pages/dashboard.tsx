import React, { FC, useEffect, useMemo, useState } from "react";
import ContainerContent from "../components/containerContent";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mantine/core";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import GraphSales from "../components/dashboard/graphSales";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import TableStats from "../components/dashboard/TableStats";
import BannerColombia from "../components/dashboard/BannerColombia";
import CarouselBanners from "../components/dashboard/carouselBanners";
import TableTopsRanking from "../components/dashboard/TableTopsRanking";
import LicenseChart from "../components/dashboard/LicenseChart";
import { CardChart, InputReporte } from "../components";
import { SearchIcon } from "../components/icons";
import client from "../contentful";
import { getVideos } from "../store/reducers/contentful.reducer";
import { getLicenciesByMonth } from "../store/reducers/sales.reducer";
import SectionDigipointsPA from "../components/dashboard/SectionDigipointsPA";
import ResetPassword from "components/Module/Modales/Login/ResetPassword";
import { RootState } from "store/store";

interface Props {
  entries: any;
  banners: any;
  infoApc: any;
}

const dashboard: FC<Props> = ({ entries, banners, infoApc }) => {
  const { user, token, userSwitch } = useSelector(
    (state: RootState) => state.user
  );
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [view, setView] = useState("password");
  const dispatch = useDispatch();
  const route = useRouter();
  const [t, i18n] = useTranslation("global");
  const [modalType, setModalType] = useState<number>(0);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [salesData, setSalesData] = useState({
    documentCloud: { teams: [], enterprise: [], education: [] },
    creativeCloud: { teams: [], enterprise: [], education: [] },
    numberData: [],
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  const redirection = () => {
    setModalType(0);
    return setOpened(true);
  };

  const typeModal = useMemo(() => {
    if (modalType === 0) {
      return <ResetPassword />;
    }
  }, [modalType]);

  const logout = () => {
    window.sessionStorage.removeItem("token");
    Cookies.remove("dp");
    route.push("/");
  };

  return (
    <>
      <Modal
        opened={opened}
        centered
        size={"80%"}
        onClose={() => (modalType ? setOpened(true) : setOpened(false))}
        draggable={false}
        className={modalType ? "modalChangePassword" : undefined}
      >
        {typeModal}
      </Modal>
      <Modal
        opened={opened2}
        centered
        size={"90%"}
        onClose={() => {
          logout();
          // setOpened2(false);
        }}
        className={"modalCloseDashboard"}
      ></Modal>
      <ContainerContent pageTitle={"Dashboard"}>
        <div className="m-6 flex flex-col gap-10 ">
          <CarouselBanners banners={banners} />
          <hr color="red" />
          {/* <div className="gap-10 flex flex-col h-full items-center">
            <TableStats />
            <GraphSales />
            {user.roleId === 3 && <SectionDigipointsPA user={user} />}

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
          </div> */}
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
