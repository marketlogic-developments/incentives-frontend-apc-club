import React, { useEffect, useMemo, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Graph from "../components/dashboard/graph";
import ContainerContent from "../components/containerContent";
import RankingTable from "../components/dashboard/rankingTable";
import { useDispatch, useSelector } from "react-redux";
import Podio from "../components/dashboard/podio";
import { Modal } from "@mantine/core";
import axios from "axios";
import {
  policyAndPassword,
  getPointsData,
} from "../store/reducers/users.reducer";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import GraphSales from "../components/dashboard/graphSales";
import GraphProm from "../components/dashboard/graphProm";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const dashboard = () => {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(true);
  const [view, setView] = useState("password");
  const dispatch = useDispatch();
  const route = useRouter();
  const [typeHeader, setTypeHeader] = useState(0);

  const [t, i18n] = useTranslation("global");

  const [isLoaded, setIsLoaded] = useState(false);
  const [puntos, setPuntos] = useState([]);
  const [lLoading, setLoading] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [modalType, setModalType] = useState([]);

  const userData = useMemo(() => {
    if (user !== 0) {
      return user?.person[0].names;
    }
  }, [user]);

  useEffect(() => {
    redirection();
  }, [user]);

  const redirection = () => {
    if (!user?.passwordReset) {
      setOpened2(false);
      //borrar esto ^
      setModalType(0);
      return setOpened(true);
    }
  };

  const handleSubmit = (data) => {
    data.preventDefault();

    axios
      .patch(
        `${process.env.BACKURL}/users/${user?.id}`,
        { passwordReset: true, password: data.target[0].value },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(policyAndPassword(res.data));
        setOpened(false);
        setOpened2(true);
      });
  };

  useEffect(() => {
    if (user.policy) {
      Cookies.remove("t&c");
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getPointsData(token))
        .then((puntos) => {
          setLoading(false);
          setPuntos(puntos);
          const data = [...puntos].sort(
            (a, b) => b.poins_assig - a.poins_assig
          );
          setSortedData(data);
        })
        .catch(() => {
          return;
        });
    }
  }, [isLoaded, token]);

  const header = useMemo(() => {
    if (typeHeader === 0) {
      return (
        <div className="gap-10 flex flex w-full">
          <div className="gap-10 w-6/12">
            <div className="flex flex-col gap-5 texto_dash">
              <h1 className="font-bold text-2xl max-sm:text-xl">
                {t("dashboard.Inicio")}
              </h1>
              <h2 className="font-bold text-4xl max-sm:text-xl">
                {t("dashboard.Hola")} {userData}
              </h2>
              <p className="w-6/12 max-sm:w-full">{t("dashboard.enApc")}</p>
              <button
                className="btn btn-primary buttonResponsive"
                onClick={() => {
                  // setModalType(1);
                  // setOpened(true);
                  setOpened2(true);
                }}
              >
                {t("dashboard.conoce")}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-3/6 items-center">
            <div className="h-full w-full">
              <div className="gap-10 w-full">
                <Podio t={t} sortedData={sortedData} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (typeHeader === 1) {
      return (
        <figure
          className="w-full flex justify-center"
          onClick={() => {
            // setModalType(2);
            // setOpened(true);
            setOpened2(true);
          }}
        >
          {i18n.resolvedLanguage === "por" ? (
            <img
              src="assets/dashboard/banners/promPor.jpg"
              className="bannersImg cursor-pointer"
            />
          ) : (
            <img
              src="assets/dashboard/banners/prom.jpg"
              className="bannersImg cursor-pointer"
            />
          )}
        </figure>
      );
    }
    if (typeHeader === 2) {
      return (
        <figure
          className="w-full flex justify-center cursor-pointer"
          onClick={() => route.push("/digipoints")}
        >
          {i18n.resolvedLanguage === "por" ? (
            <img
              src="assets/dashboard/banners/htwPor.jpg"
              className="bannersImg"
            />
          ) : (
            <img
              src="assets/dashboard/banners/htw.jpg"
              className="bannersImg"
            />
          )}
        </figure>
      );
    }
  }, [typeHeader]);

  const typeModal = useMemo(() => {
    if (modalType === 0) {
      return (
        <div className="flex flex-col w-full items-center text-center gap-10 max-sm:gap-2">
          <p className="text-3xl text-primary">{t("dashboard.bienvenido")}</p>
          <p className="text-xl">{t("dashboard.continuar")}</p>

          <form
            className="flex flex-col items-center gap-5 w-full"
            onSubmit={(data) => handleSubmit(data)}
          >
            <input
              type={view}
              placeholder={t("dashboard.digitar")}
              className="input input-bordered input-primary w-2/4 max-sm:w-full"
              required
              minLength={8}
            />
            <div className="flex gap-5">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                onClick={() => {
                  view === "password" ? setView("text") : setView("password");
                }}
              />
              <p>{t("dashboard.verpass")}</p>
            </div>

            <button className="btn btn-primary">
              {t("dashboard.cambiarpass")}
            </button>
          </form>
        </div>
      );
    }

    if (modalType === 1) {
      return <RankingTable />;
    }
    if (modalType === 2) {
      return <GraphProm />;
    }
  }, [modalType, view]);
  const isMobile = window.innerWidth <= 768;
  const modalSize = isMobile
    ? { initialWidth: "100%", initialHeight: "auto" }
    : { initialWidth: "40%", initialHeight: "auto" };

  const logout = () => {
    Cookies.remove("infoDt");
    Cookies.remove("dp");
    route.push("/");
  };

  return (
    <>
      <Modal
        opened={opened}
        centered
        size={modalSize}
        onClose={() => (modalType === 0 ? setOpened(true) : setOpened(false))}
        draggable={false}
      >
        {typeModal}
      </Modal>
      <Modal
        opened={opened2}
        centered
        size={"70%"}
        onClose={() => {
          logout();
          // setOpened2(false);
        }}
        className={"modalCloseDashboard"}
      >
        {
          <a href="mailto:info@adobepcclub.com">
            <figure>
              {i18n.resolvedLanguage === "por" ? (
                <img
                  src="assets/dashboard/banners/bannerPApor.jpg"
                  alt="Sales_PA"
                  className="w-full"
                ></img>
              ) : (
                <img
                  src="assets/dashboard/banners/bannerPA.jpg"
                  alt="Sales_PA"
                  className="w-full"
                ></img>
              )}
            </figure>
          </a>
        }
      </Modal>
      <ContainerContent pageTitle={"Dashboard"}>
        {header}
        <div className="w-full flex justify-center gap-5">
          <button
            className={`btn btn-xs btn-accent`}
            onClick={() => setOpened2(true)}
          >
            {t("dashboard.ventas")}
          </button>
          <button
            className={`btn btn-xs ${
              typeHeader === 0 ? "btn-primary" : "btn-accent"
            }`}
            onClick={() => {
              // setTypeHeader(0)
              setOpened2(true);
            }}
          >
            {t("dashboard.ranking")}
          </button>
          <button
            className={`btn ${
              typeHeader === 1 ? "btn-primary" : "btn-accent"
            } btn-xs`}
            onClick={() => {
              // setTypeHeader(1)
              setOpened2(true);
            }}
          >
            {t("dashboard.promociones")}
          </button>
          <button
            className={`btn ${
              typeHeader === 2 ? "btn-primary" : "btn-accent"
            } btn-xs`}
            onClick={() => {
              // setTypeHeader(2)
              setOpened2(true);
            }}
          >
            {t("dashboard.htw")}
          </button>
        </div>
        <hr color="red" />
        <div className="gap-10 flex flex-col h-full">
          <div className="container w-full h-full bg-base-100 flex flex-col sm:flex-row justify-between max-sm:justify-center">
            <div className="w-8/12 max-sm:mx-auto flex flex-col gap-5 progressiveBar justify-center">
              <div className="w-full h-16 flex items-center gap-10 gapBar">
                <div className="flex items-center h-full cct max-sm:w-64 w-32 text-center">
                  <img src="/assets/dashboard/cc.png" width={100}></img>
                </div>
                <div className="w-10/12 flex flex-col items-center justify-around h-full">
                  <div className="w-full flex justify-around">
                    <p className="text-sm font-semibold border-b-2 border-b-orange-500">
                      Teams
                    </p>
                    <p className="text-sm font-semibold border-b-sky-600 border-b-2 ">
                      Enterprise
                    </p>
                    <p className="text-sm font-semibold border-b-2 border-b-green-600">
                      Education
                    </p>
                  </div>
                  <div className="w-full bg-base-200 h-4 flex">
                    <span
                      className="bg-primary h-full"
                      style={{ width: "33.3%" }}
                    />
                    <span
                      className="bg-secondary h-full"
                      style={{ width: "33.3%" }}
                    />
                    <span
                      className="bg-warning h-full"
                      style={{ width: "33.3%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-16 flex items-center gap-10 gapBar">
                <div className="flex items-center h-full cci max-sm:w-64 w-32 text-center">
                  <img src="/assets/dashboard/DC.png" width={100}></img>
                </div>
                <div className="w-10/12 flex flex-col items-center justify-around h-full">
                  <div className="w-full flex justify-around">
                    <p className="text-sm font-semibold border-b-2 border-b-orange-500">
                      Teams
                    </p>
                    <p className="text-sm font-semibold border-b-sky-600 border-b-2">
                      Enterprise
                    </p>
                    <p className="text-sm font-semibold border-b-2 border-b-red-600">
                      Education
                    </p>
                  </div>
                  <div className="w-full bg-base-200 h-4 flex"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center w-4/12 max-sm:w-full justify-center gap-10">
              <div className="flex flex-col gap-5">
                <p className="font-semibold text-center">Partner Goal:</p>
                <p className="text-center font-bold text-3xl">{`${0}`}</p>
              </div>
              <div className="h-full w-min">
                <div
                  className="radial-progress flex justify-center items-center text-primary"
                  style={{
                    "--value": "0",
                    "--size": "9rem",
                    "--thickness": "2px",
                  }}
                >
                  <div className="w-5/6 h-5/6 bg-primary text-center p-5 flex flex-col items-center justify-center rounded-full text-white">
                    <p className="font-bold text-xl">${"0M"}</p>
                    <p className="text-sm">0%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Carousel
            sx={{ width: "100%", height: "100%" }}
            mx="auto"
            withIndicators={false}
            controlSize={40}
            draggable={false}
            height={260}
          >
            {user?.user?.roleId == 3 ? (
              <Carousel.Slide>
                <GraphSales />
              </Carousel.Slide>
            ) : (
              <>
                <Carousel.Slide>
                  <GraphSales />
                </Carousel.Slide>
                <Carousel.Slide>
                  <Graph />
                </Carousel.Slide>
              </>
            )}
          </Carousel>
          <div className="w-full flex justify-center mb-5">
            {user?.roleId !== 2 && (
              <button
                className="btn btn-primary btn-wide"
                onClick={() => route.push("/adobeMarket")}
              >
                {t("dashboard.redimir")}
              </button>
            )}
          </div>
        </div>
      </ContainerContent>
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 2, 3, 4, 5],
    },
  };
}

export default dashboard;
