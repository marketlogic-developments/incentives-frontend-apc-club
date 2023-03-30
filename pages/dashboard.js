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
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import TableStats from "../components/dashboard/TableStats";

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
      return user?.names;
    }
  }, [user]);

  useEffect(() => {
    redirection();
  }, [user]);

  const redirection = () => {
    if (!user?.passwordReset) {
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
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        return Toast.fire({
          icon: "success",
          title: t("login.donechangepass"),
        });
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
                  setModalType(1);
                  setOpened(true);
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
            setModalType(2);
            setOpened(true);
          }}
        >
          {i18n.resolvedLanguage === "por" ? (
            <img
              src="assets/dashboard/banners/promPor.webp"
              className="bannersImg cursor-pointer"
            />
          ) : (
            <img
              src="assets/dashboard/banners/prom.webp"
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
              src="assets/dashboard/banners/htwPor.webp"
              className="bannersImg"
            />
          ) : (
            <img
              src="assets/dashboard/banners/htw.webp"
              className="bannersImg"
            />
          )}
        </figure>
      );
    }
  }, [typeHeader]);

  const [passwordMatch, setPasswordMatch] = useState(""); // passwords match
  // booleans for password validations
  const [containsUL, setContainsUL] = useState(false); // uppercase letter
  const [containsLL, setContainsLL] = useState(false); // lowercase letter
  const [containsN, setContainsN] = useState(false); // number
  const [containsSC, setContainsSC] = useState(false); // special character
  const [contains8C, setContains8C] = useState(false); // min 8 characters

  // checks all validations are true
  const [allValid, setAllValid] = useState(false);

  useEffect(() => {
    if (containsUL && containsLL && containsN && containsSC && contains8C) {
      return setAllValid(true);
    }

    return setAllValid(false);
  }, [containsUL, containsLL, containsN, containsSC, contains8C]);

  const validatePassword = (string) => {
    // has uppercase letter
    if (string.toLowerCase() != string) setContainsUL(true);
    else setContainsUL(false);

    // has lowercase letter
    if (string.toUpperCase() != string) setContainsLL(true);
    else setContainsLL(false);

    // has number
    if (/\d/.test(string)) setContainsN(true);
    else setContainsN(false);

    // has special character
    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(string))
      setContainsSC(true);
    else setContainsSC(false);

    // has 8 characters
    if (string.length >= 8) setContains8C(true);
    else setContains8C(false);

    // all validations passed
  };

  const handleError = (data) => {
    data.preventDefault();

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    return Toast.fire({
      icon: "error",
      title: t("login.errorchangepass"),
    });
  };

  const typeModal = useMemo(() => {
    if (modalType === 0) {
      return (
        <div className="flex flex-col w-full items-center text-center gap-10 max-sm:gap-2">
          <p className="text-3xl text-primary">{t("dashboard.bienvenido")}</p>
          <p className="text-xl">{t("dashboard.continuar")}</p>

          <form
            className="flex flex-col items-center gap-5 w-full"
            onSubmit={(data) => {
              allValid ? handleSubmit(data) : handleError(data);
            }}
          >
            <div className="relative w-2/4 max-sm:w-full">
              <input
                type={view}
                placeholder={t("dashboard.digitar")}
                className="input input-bordered input-primary w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={(data) => setPasswordMatch(data.target.value)}
                onKeyUp={() => validatePassword(passwordMatch)}
              />
              <button
                type="button"
                onClick={() => {
                  view === "password" ? setView("text") : setView("password");
                }}
                className="absolute inset-y-0 right-0 flex items-center px-4 py-2 text-gray-700 hover:text-gray-600 focus:outline-none"
              >
                {view === "text" ? (
                  <AiOutlineEyeInvisible className="h-5 w-5 fill-[#000]" />
                ) : (
                  <AiOutlineEye className="h-5 w-5 fill-[#000]" />
                )}
              </button>
            </div>
            <div className="w-auto flex flex-col justify-center items-center">
              {containsUL ? (
                <div className="item-icon">
                  <AiOutlineCheckCircle className="h-5 w-5 fill-[#047857]" />
                  <p className="checkitem">{t("dashboard.contieneUL")}</p>
                </div>
              ) : (
                <div className="item-icon">
                  <AiOutlineCloseCircle className="h-5 w-5 fill-[#000]" />
                  <p>{t("dashboard.contieneUL")}</p>
                </div>
              )}
              {containsLL ? (
                <div className="item-icon">
                  <AiOutlineCheckCircle className="h-5 w-5 fill-[#047857]" />
                  <p className="checkitem">{t("dashboard.contieneLL")}</p>
                </div>
              ) : (
                <div className="item-icon">
                  <AiOutlineCloseCircle className="h-5 w-5 fill-[#000]" />
                  <p>{t("dashboard.contieneLL")}</p>
                </div>
              )}
              {containsN ? (
                <div className="item-icon">
                  <AiOutlineCheckCircle className="h-5 w-5 fill-[#047857]" />
                  <p className="checkitem">{t("dashboard.contieneN")}</p>
                </div>
              ) : (
                <div className="item-icon">
                  <AiOutlineCloseCircle className="h-5 w-5 fill-[#000]" />
                  <p>{t("dashboard.contieneN")}</p>
                </div>
              )}
              {containsSC ? (
                <div className="item-icon">
                  <AiOutlineCheckCircle className="h-5 w-5 fill-[#047857]" />
                  <p className="checkitem">{t("dashboard.contieneSC")}</p>
                </div>
              ) : (
                <div className="item-icon">
                  <AiOutlineCloseCircle className="h-5 w-5 fill-[#000]" />
                  <p>{t("dashboard.contieneSC")}</p>
                </div>
              )}
              {contains8C ? (
                <div className="item-icon">
                  <AiOutlineCheckCircle className="h-5 w-5 fill-[#047857]" />
                  <p className="checkitem">{t("dashboard.contiene8C")}</p>
                </div>
              ) : (
                <div className="item-icon">
                  <AiOutlineCloseCircle className="h-5 w-5 fill-[#000]" />
                  <p>{t("dashboard.contiene8C")}</p>
                </div>
              )}
            </div>
            <button
              className={`btn ${
                allValid
                  ? "btn-primary"
                  : "btn-active btn-ghost pointer-events-none"
              }`}
            >
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
  }, [
    modalType,
    view,
    containsUL,
    containsLL,
    containsN,
    containsSC,
    contains8C,
    allValid,
    passwordMatch,
  ]);
  const isMobile = window.innerWidth <= 768;
  const modalSize = isMobile
    ? { initialWidth: "100%", initialHeight: "auto" }
    : { initialWidth: "40%", initialHeight: "auto" };

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
      <ContainerContent pageTitle={"Dashboard"}>
        {header}
        <div className="w-full flex justify-center gap-5">
          <button
            className={`btn btn-xs ${
              typeHeader === 0 ? "btn-primary" : "btn-accent"
            }`}
            onClick={() => {
              setTypeHeader(0);
            }}
          >
            {t("dashboard.ranking")}
          </button>
          <button
            className={`btn ${
              typeHeader === 1 ? "btn-primary" : "btn-accent"
            } btn-xs`}
            onClick={() => {
              setTypeHeader(1);
            }}
          >
            {t("dashboard.promociones")}
          </button>
          <button
            className={`btn ${
              typeHeader === 2 ? "btn-primary" : "btn-accent"
            } btn-xs`}
            onClick={() => {
              setTypeHeader(2);
            }}
          >
            {t("dashboard.htw")}
          </button>
        </div>
        <hr color="red" />
        <div className="gap-10 flex flex-col h-full">
          <TableStats />
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
                onClick={() => route.push("/catalogo")}
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
