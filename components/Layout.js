import { useMemo } from "react";
import { Menu, Modal } from "@mantine/core";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingUser,
  setCompany,
  setDataSession,
  setDigipoints,
  setDistribuitor,
  setInitialStateUser,
  userLogin,
  userToken,
} from "../store/reducers/users.reducer";
import MobileMenu from "./MobileMenu";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { changeLoadingData } from "../store/reducers/loading.reducer";
import {
  setInitialStateAwards,
  setMenuMarket,
} from "../store/reducers/awards.reducer";
import { setInitialStateCompany } from "../store/reducers/company.reducer";
import { setInitialStateOrders } from "../store/reducers/orders.reducer";
import { setInitialStateSales } from "../store/reducers/sales.reducer";
import { setInitialStateTeams } from "../store/reducers/teams.reducer";
import { useState } from "react";
import ModalFormCustomer from "./Lay0ut/ModalFormCustomer";
import DigiPointsCard from "./Lay0ut/DigiPointsCard";
import MenuAPC from "./Lay0ut/Menu";
import Logo10 from "./Lay0ut/Logo10";
import DigiPointsCollapse from "./Lay0ut/DigiPointsCollapse";
import UserOptions from "./Lay0ut/UserOptions";
import ContainerContent from "./containerContent";
import MenuMarket from "./Lay0ut/MenuMarket";
import ModalCustomerCare from "./costumerCare/modal/ModalCustomerCare";
import {
  CloseCircle,
  Bell,
  Whatsapp,
  Menu as MenuLines,
  ShoppingCard,
  Megaphone,
} from "./icons";
import ModalPersonalize from "./Lay0ut/ModalPersonalize";
import EyeObserver from "./Lay0ut/SwitchUser/EyeObserver";
import ModalUpdateData from "./Lay0ut/Modals/ModalUpdateData";
import { VerifyTC } from "../functions/VerifyTC";
import ModalTCPa from "./Lay0ut/Modals/ModalTCPa";
import ModalInfoAPC from "./Lay0ut/ModalInfoAPC";
import ETLA from "../public/assets/Icons/ETLA";
import ModalTCETLA from "./ETLA/Modals/ModalTCETLA";

const Layout = ({ children }) => {
  const digipoints = useSelector((state) => state.user.digipoints);
  const userRedux = useSelector((state) => state.user.user);
  const video = useSelector((state) => state.contentful.videos[0]);
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.user.loading);
  const loadingData = useSelector((state) => state.loadingData.loadingData);
  const dispatch = useDispatch();
  const location =
    typeof window !== "undefined" ? window.location.pathname : "";
  const router = useRouter();
  const sections = ["/", "/terminosycondiciones", "/registro"];
  const [t, i18n] = useTranslation("global");
  const [modal, setModal] = useState(0);
  const [modalCustomer, setModalCustomer] = useState(false);
  const [opened, setOpened] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuUser, setMenuUser] = useState(false);
  const menuMarket = useSelector((state) => state.awards.menuMarket);
  const [screen, setScreen] = useState();
  const dataSession = useSelector((state) => state.user.userSwitch);
  const [verifytcResult, setVerifytcResult] = useState(false);

  useEffect(() => {
    setScreen(window.innerWidth);
    const handleWindowResize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const verifytc = useMemo(
    () =>
      userRedux !== 0 &&
      VerifyTC(
        token,
        userRedux.companyId !== null
          ? userRedux.companyId
          : userRedux.distributionChannelId,
        userRedux.companyId !== null ? "companies" : "distribution-channel"
      ).then((res) => setVerifytcResult(res)),
    [userRedux]
  );

  useEffect(() => {
    if (
      userRedux.cpf !== video?.key &&
      video?.key !== undefined &&
      userRedux !== 0 &&
      location === "/dashboard" &&
      dataSession.prevData === undefined
    ) {
      setModal(4);
      setTimeout(() => {
        setOpened(true);
      }, 2000);
    }

    if (
      userRedux.user_update_data === null ||
      userRedux.user_update_data === false
    ) {
      setModal(2);
      setOpened(true);
    }

    if (userRedux.inprogram === "adobeetla" && !userRedux.policyetla) {
      setModal(5);
      setOpened(true);
    }

    if (verifytcResult) {
      setModal(3);
      setOpened(true);
    }
  }, [userRedux, verifytcResult, video]);

  useEffect(() => {
    if (window.sessionStorage.getItem("infoDt") !== null && userRedux === 0) {
      const userGetData = JSON.parse(window.sessionStorage.getItem("infoDt"));
      dispatch(setDataSession(userGetData));

      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userGetData?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${userGetData?.token}`,
            },
          }
        )
        .then((userInfo) => {
          //Get user digiPoints
          axios
            .get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/digipoints-redeem-status/${userGetData?.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Bearer ${userGetData?.token}`,
                },
              }
            )
            .then((dpInfo) => {
              const [digipoints] = dpInfo.data;
              if (dpInfo.data.length === 0) {
                dispatch(
                  setDigipoints({
                    assigned_points: 0,
                    cart_points: 0,
                  })
                );
              } else {
                dispatch(setDigipoints(digipoints));
              }
            });

          //Verify if user is associate with a company or Distribuitor

          const compOrDist =
            userInfo.data.companyId !== null &&
            userInfo.data.distributionChannelId === null
              ? {
                  endpoint: "companies",
                  byId: userInfo.data.companyId,
                }
              : {
                  endpoint: "distribution-channel",
                  byId: userInfo.data.distributionChannelId,
                };

          axios
            .get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/${compOrDist.endpoint}/${compOrDist.byId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Bearer ${userGetData.token}`,
                },
              }
            )
            .then(({ data }) => {
              if (compOrDist.endpoint === "distribution-channel") {
                dispatch(setDistribuitor(data));
              } else {
                dispatch(setCompany(data));
              }
            })
            .catch((err) => {
              if (err.message === "Request failed with status code 404") {
                dispatch(
                  setCompany({
                    CreatedAt: 0,
                    id: 0,
                    name: "Sin canal / distribuidor",
                    representativeId: 0,
                    phoneNumber: "000000",
                    operationStatusId: 0,
                    distChannelsId: "No",
                    maxDayAssign: 0,
                    resellerMasterId: "",
                    goalsPerQuarter: "",
                    goalsPerYear: "",
                    partnerAdmin: {
                      name: "No",
                    },
                  })
                );
              }
            })
            .finally(() => {
              dispatch(userLogin(userInfo.data));
              dispatch(userToken(userGetData.token));
              language(userInfo.data.languageId);
              redirection(userInfo.data.policy, userInfo.data);
              dispatch(loadingUser(true));
            });
        });
    } else {
      if (userRedux !== 0) {
        redirection(userRedux.policy, userRedux);
        language(userRedux?.languageId);
      } else {
        dispatch(loadingUser(true));
      }
    }
  }, [location]);

  useEffect(() => {
    if (loadingData) {
      dispatch(changeLoadingData(false));
    }
  }, [location]);

  const profileImage = (
    <div className="bg-[#1473E6] rounded-full btn btn-circle btn-sm border-none hover:bg-[#1473E6]">
      {userRedux.profilePhotoPath === null ||
      userRedux.profilePhotoPath === "" ||
      userRedux.profilePhotoPath === "noImage" ? (
        <p className="text-white text-center flex w-full h-full items-center justify-center">
          {userRedux?.names[0]}
        </p>
      ) : (
        <img
          src={userRedux.profilePhotoPath}
          className="w-full h-full rounded-full"
          alt="Avatar"
        />
      )}
    </div>
  );

  useEffect(() => {
    let timeoutId;

    if (userRedux !== 0) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          timeoutId = setTimeout(function () {
            logout();
          }, 1800000);
        } else {
          // Si el usuario vuelve antes de que se ejecute el setTimeout, cancelarlo
          clearTimeout(timeoutId);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );

        clearTimeout(timeoutId);
      };
    }

    if (location === "/") {
      dispatch(loadingUser(true));
    }
  }, [userRedux]);

  const closeModal = () => {
    setOpened(!opened);
  };

  const language = (rolNum) => {
    if (rolNum === 1) {
      return i18n.changeLanguage("por");
    }
    if (rolNum === 2) {
      return i18n.changeLanguage("es");
    }
    if (rolNum === 3) {
      return i18n.changeLanguage("en");
    }
  };

  const locations = [
    {
      page: "/dashboard",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.17189 1.6875H2.39063C2.0023 1.6875 1.6875 2.0023 1.6875 2.39062V7.17188C1.6875 7.5602 2.0023 7.875 2.39063 7.875H7.17189C7.56021 7.875 7.87502 7.5602 7.87502 7.17188V2.39062C7.87502 2.0023 7.56021 1.6875 7.17189 1.6875Z"
            stroke="#232B2F"
            strokeWidth="1.147"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.17189 1.6875H2.39063C2.0023 1.6875 1.6875 2.0023 1.6875 2.39062V7.17188C1.6875 7.5602 2.0023 7.875 2.39063 7.875H7.17189C7.56021 7.875 7.87502 7.5602 7.87502 7.17188V2.39062C7.87502 2.0023 7.56021 1.6875 7.17189 1.6875Z"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="1.147"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.6094 1.6875H10.8281C10.4398 1.6875 10.125 2.0023 10.125 2.39062V7.17188C10.125 7.5602 10.4398 7.875 10.8281 7.875H15.6094C15.9977 7.875 16.3125 7.5602 16.3125 7.17188V2.39062C16.3125 2.0023 15.9977 1.6875 15.6094 1.6875Z"
            stroke="black"
            strokeWidth="1.147"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.17189 10.125H2.39063C2.0023 10.125 1.6875 10.4398 1.6875 10.8281V15.6094C1.6875 15.9977 2.0023 16.3125 2.39063 16.3125H7.17189C7.56021 16.3125 7.87502 15.9977 7.87502 15.6094V10.8281C7.87502 10.4398 7.56021 10.125 7.17189 10.125Z"
            stroke="black"
            strokeWidth="1.147"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.6094 10.125H10.8281C10.4398 10.125 10.125 10.4398 10.125 10.8281V15.6094C10.125 15.9977 10.4398 16.3125 10.8281 16.3125H15.6094C15.9977 16.3125 16.3125 15.9977 16.3125 15.6094V10.8281C16.3125 10.4398 15.9977 10.125 15.6094 10.125Z"
            stroke="black"
            strokeWidth="1.147"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Dashboard"),
    },
    {
      page: "/reportes/dashboards/InvoiceReportUser",
      icon: (
        <svg
          width={20}
          height={20}
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.5 11.252a4.5 4.5 0 0 0-4.5-4.5h-3.75c-.047 0-4.913-.066-9.534-3.947a1.49 1.49 0 0 0-1.604-.207 1.472 1.472 0 0 0-.862 1.36v14.587a1.472 1.472 0 0 0 .862 1.36c.2.092.418.14.638.14.353.002.695-.12.966-.347 3.553-2.98 7.237-3.712 8.784-3.89v3.29a1.49 1.49 0 0 0 .665 1.247l1.032.694a1.576 1.576 0 0 0 1.378.15 1.49 1.49 0 0 0 .91-1.04l1.115-4.435a4.519 4.519 0 0 0 3.9-4.463Zm-6.469 8.53L15 19.099v-3.346h2.044l-1.013 4.03ZM18 14.253h-3v-6h3a3 3 0 0 1 0 6Z" />
        </svg>
      ),
      iconactive: "",
      text: "Invoice Report",
    },
    {
      page: "/comunicado",
      iconactive: "",
      icon: (
        <svg
          width={20}
          height={20}
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.5 11.252a4.5 4.5 0 0 0-4.5-4.5h-3.75c-.047 0-4.913-.066-9.534-3.947a1.49 1.49 0 0 0-1.604-.207 1.472 1.472 0 0 0-.862 1.36v14.587a1.472 1.472 0 0 0 .862 1.36c.2.092.418.14.638.14.353.002.695-.12.966-.347 3.553-2.98 7.237-3.712 8.784-3.89v3.29a1.49 1.49 0 0 0 .665 1.247l1.032.694a1.576 1.576 0 0 0 1.378.15 1.49 1.49 0 0 0 .91-1.04l1.115-4.435a4.519 4.519 0 0 0 3.9-4.463Zm-6.469 8.53L15 19.099v-3.346h2.044l-1.013 4.03ZM18 14.253h-3v-6h3a3 3 0 0 1 0 6Z" />
        </svg>
      ),
      text: t("menu.comunicados"),
    },
    {
      page:
        userRedux.roleId === 1 ? "/digipointsall" : "/digipoints/mydigipoints",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.147 10.2591L8.51502 6.01639C8.49053 5.95272 8.44732 5.89796 8.39108 5.85934C8.33485 5.82073 8.26823 5.80005 8.20002 5.80005C8.1318 5.80005 8.06518 5.82073 8.00895 5.85934C7.95272 5.89796 7.90951 5.95272 7.88502 6.01639L6.25301 10.2591C6.23606 10.3032 6.21005 10.3433 6.17665 10.3767C6.14325 10.4101 6.10322 10.4361 6.05914 10.453L1.81638 12.085C1.75271 12.1095 1.69795 12.1527 1.65933 12.209C1.62071 12.2652 1.60004 12.3318 1.60004 12.4C1.60004 12.4682 1.62071 12.5349 1.65933 12.5911C1.69795 12.6473 1.75271 12.6905 1.81638 12.715L6.05914 14.347C6.10322 14.364 6.14325 14.39 6.17665 14.4234C6.21005 14.4568 6.23606 14.4968 6.25301 14.5409L7.88502 18.7837C7.90951 18.8473 7.95272 18.9021 8.00895 18.9407C8.06518 18.9793 8.1318 19 8.20002 19C8.26823 19 8.33485 18.9793 8.39108 18.9407C8.44732 18.9021 8.49053 18.8473 8.51502 18.7837L10.147 14.5409C10.164 14.4968 10.19 14.4568 10.2234 14.4234C10.2568 14.39 10.2968 14.364 10.3409 14.347L14.5837 12.715C14.6473 12.6905 14.7021 12.6473 14.7407 12.5911C14.7793 12.5349 14.8 12.4682 14.8 12.4C14.8 12.3318 14.7793 12.2652 14.7407 12.209C14.7021 12.1527 14.6473 12.1095 14.5837 12.085L10.3409 10.453C10.2968 10.4361 10.2568 10.4101 10.2234 10.3767C10.19 10.3433 10.164 10.3032 10.147 10.2591ZM4.45001 2.95L3.70001 1L2.95 2.95L1 3.70001L2.95 4.45001L3.70001 6.40001L4.45001 4.45001L6.40001 3.70001L4.45001 2.95ZM16.4002 4.79988L15.4 2.2L14.3999 4.79988L11.8 5.80001L14.3999 6.80014L15.4 9.40002L16.4002 6.80014L19 5.80001L16.4002 4.79988Z"
            strokeWidth="1.03964"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.147 10.2591L8.51502 6.01639C8.49053 5.95272 8.44732 5.89796 8.39108 5.85934C8.33485 5.82073 8.26823 5.80005 8.20002 5.80005C8.1318 5.80005 8.06518 5.82073 8.00895 5.85934C7.95272 5.89796 7.90951 5.95272 7.88502 6.01639L6.25301 10.2591C6.23606 10.3032 6.21005 10.3433 6.17665 10.3767C6.14325 10.4101 6.10322 10.4361 6.05914 10.453L1.81638 12.085C1.75271 12.1095 1.69795 12.1527 1.65933 12.209C1.62071 12.2652 1.60004 12.3318 1.60004 12.4C1.60004 12.4682 1.62071 12.5349 1.65933 12.5911C1.69795 12.6473 1.75271 12.6905 1.81638 12.715L6.05914 14.347C6.10322 14.364 6.14325 14.39 6.17665 14.4234C6.21005 14.4568 6.23606 14.4968 6.25301 14.5409L7.88502 18.7837C7.90951 18.8473 7.95272 18.9021 8.00895 18.9407C8.06518 18.9793 8.1318 19 8.20002 19C8.26823 19 8.33485 18.9793 8.39108 18.9407C8.44732 18.9021 8.49053 18.8473 8.51502 18.7837L10.147 14.5409C10.164 14.4968 10.19 14.4568 10.2234 14.4234C10.2568 14.39 10.2968 14.364 10.3409 14.347L14.5837 12.715C14.6473 12.6905 14.7021 12.6473 14.7407 12.5911C14.7793 12.5349 14.8 12.4682 14.8 12.4C14.8 12.3318 14.7793 12.2652 14.7407 12.209C14.7021 12.1527 14.6473 12.1095 14.5837 12.085L10.3409 10.453C10.2968 10.4361 10.2568 10.4101 10.2234 10.3767C10.19 10.3433 10.164 10.3032 10.147 10.2591ZM4.45001 2.95L3.70001 1L2.95 2.95L1 3.70001L2.95 4.45001L3.70001 6.40001L4.45001 4.45001L6.40001 3.70001L4.45001 2.95ZM16.4002 4.79988L15.4 2.2L14.3999 4.79988L11.8 5.80001L14.3999 6.80014L15.4 9.40002L16.4002 6.80014L19 5.80001L16.4002 4.79988Z"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="1.03964"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      text: t("menu.Digipoints"),
    },
    {
      page: "/ManagmentDigipoints",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.83494 6.2682C7.40219 5.83545 6.70062 5.83539 6.26794 6.26808C5.83525 6.70076 5.83531 7.40233 6.26806 7.83508L14.1027 15.6697C14.5355 16.1025 15.237 16.1025 15.6697 15.6698C16.1024 15.2372 16.1023 14.5356 15.6696 14.1028L7.83494 6.2682Z"
            stroke="#232B2F"
            strokeWidth="1.3125"
            strokeMiterlimit="10"
          />
          <path
            d="M7.83494 6.2682C7.40219 5.83545 6.70062 5.83539 6.26794 6.26808C5.83525 6.70076 5.83531 7.40233 6.26806 7.83508L14.1027 15.6697C14.5355 16.1025 15.237 16.1025 15.6697 15.6698C16.1024 15.2372 16.1023 14.5356 15.6696 14.1028L7.83494 6.2682Z"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="1.3125"
            strokeMiterlimit="10"
          />
          <path
            d="M6.27119 6.27119C6.16787 6.37448 6.08592 6.49711 6.03001 6.63208C5.97409 6.76705 5.94531 6.91171 5.94531 7.05781C5.94531 7.2039 5.97409 7.34856 6.03001 7.48353C6.08592 7.6185 6.16787 7.74113 6.27119 7.84443L7.84865 9.42189L9.4219 7.84865L7.84443 6.27119C7.74114 6.16787 7.61851 6.08592 7.48354 6.03C7.34857 5.97409 7.2039 5.94531 7.05781 5.94531C6.91172 5.94531 6.76705 5.97409 6.63208 6.03C6.49711 6.08592 6.37448 6.16787 6.27119 6.27119Z"
            fill="black"
          />
          <path
            d="M1.6875 6.75H3.375H1.6875ZM3.17039 3.17039L4.3636 4.36359L3.17039 3.17039ZM6.75001 1.6875V3.375V1.6875ZM10.3296 3.17039L9.13642 4.36359L10.3296 3.17039ZM4.3636 9.13641L3.17039 10.3296L4.3636 9.13641Z"
            fill="black"
          />
          <path
            d="M1.6875 6.75H3.375M3.17039 3.17039L4.3636 4.36359M6.75001 1.6875V3.375M10.3296 3.17039L9.13642 4.36359M4.3636 9.13641L3.17039 10.3296"
            stroke="black"
            strokeWidth="1.3125"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
        </svg>
      ),
      text: t("menu.DDigipoints"),
      subsections:
        userRedux.roleId === 3
          ? [
              {
                page: "/digipoints/createteam",
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.147 10.2591L8.51502 6.01639C8.49053 5.95272 8.44732 5.89796 8.39108 5.85934C8.33485 5.82073 8.26823 5.80005 8.20002 5.80005C8.1318 5.80005 8.06518 5.82073 8.00895 5.85934C7.95272 5.89796 7.90951 5.95272 7.88502 6.01639L6.25301 10.2591C6.23606 10.3032 6.21005 10.3433 6.17665 10.3767C6.14325 10.4101 6.10322 10.4361 6.05914 10.453L1.81638 12.085C1.75271 12.1095 1.69795 12.1527 1.65933 12.209C1.62071 12.2652 1.60004 12.3318 1.60004 12.4C1.60004 12.4682 1.62071 12.5349 1.65933 12.5911C1.69795 12.6473 1.75271 12.6905 1.81638 12.715L6.05914 14.347C6.10322 14.364 6.14325 14.39 6.17665 14.4234C6.21005 14.4568 6.23606 14.4968 6.25301 14.5409L7.88502 18.7837C7.90951 18.8473 7.95272 18.9021 8.00895 18.9407C8.06518 18.9793 8.1318 19 8.20002 19C8.26823 19 8.33485 18.9793 8.39108 18.9407C8.44732 18.9021 8.49053 18.8473 8.51502 18.7837L10.147 14.5409C10.164 14.4968 10.19 14.4568 10.2234 14.4234C10.2568 14.39 10.2968 14.364 10.3409 14.347L14.5837 12.715C14.6473 12.6905 14.7021 12.6473 14.7407 12.5911C14.7793 12.5349 14.8 12.4682 14.8 12.4C14.8 12.3318 14.7793 12.2652 14.7407 12.209C14.7021 12.1527 14.6473 12.1095 14.5837 12.085L10.3409 10.453C10.2968 10.4361 10.2568 10.4101 10.2234 10.3767C10.19 10.3433 10.164 10.3032 10.147 10.2591ZM4.45001 2.95L3.70001 1L2.95 2.95L1 3.70001L2.95 4.45001L3.70001 6.40001L4.45001 4.45001L6.40001 3.70001L4.45001 2.95ZM16.4002 4.79988L15.4 2.2L14.3999 4.79988L11.8 5.80001L14.3999 6.80014L15.4 9.40002L16.4002 6.80014L19 5.80001L16.4002 4.79988Z"
                      strokeWidth="1.03964"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.147 10.2591L8.51502 6.01639C8.49053 5.95272 8.44732 5.89796 8.39108 5.85934C8.33485 5.82073 8.26823 5.80005 8.20002 5.80005C8.1318 5.80005 8.06518 5.82073 8.00895 5.85934C7.95272 5.89796 7.90951 5.95272 7.88502 6.01639L6.25301 10.2591C6.23606 10.3032 6.21005 10.3433 6.17665 10.3767C6.14325 10.4101 6.10322 10.4361 6.05914 10.453L1.81638 12.085C1.75271 12.1095 1.69795 12.1527 1.65933 12.209C1.62071 12.2652 1.60004 12.3318 1.60004 12.4C1.60004 12.4682 1.62071 12.5349 1.65933 12.5911C1.69795 12.6473 1.75271 12.6905 1.81638 12.715L6.05914 14.347C6.10322 14.364 6.14325 14.39 6.17665 14.4234C6.21005 14.4568 6.23606 14.4968 6.25301 14.5409L7.88502 18.7837C7.90951 18.8473 7.95272 18.9021 8.00895 18.9407C8.06518 18.9793 8.1318 19 8.20002 19C8.26823 19 8.33485 18.9793 8.39108 18.9407C8.44732 18.9021 8.49053 18.8473 8.51502 18.7837L10.147 14.5409C10.164 14.4968 10.19 14.4568 10.2234 14.4234C10.2568 14.39 10.2968 14.364 10.3409 14.347L14.5837 12.715C14.6473 12.6905 14.7021 12.6473 14.7407 12.5911C14.7793 12.5349 14.8 12.4682 14.8 12.4C14.8 12.3318 14.7793 12.2652 14.7407 12.209C14.7021 12.1527 14.6473 12.1095 14.5837 12.085L10.3409 10.453C10.2968 10.4361 10.2568 10.4101 10.2234 10.3767C10.19 10.3433 10.164 10.3032 10.147 10.2591ZM4.45001 2.95L3.70001 1L2.95 2.95L1 3.70001L2.95 4.45001L3.70001 6.40001L4.45001 4.45001L6.40001 3.70001L4.45001 2.95ZM16.4002 4.79988L15.4 2.2L14.3999 4.79988L11.8 5.80001L14.3999 6.80014L15.4 9.40002L16.4002 6.80014L19 5.80001L16.4002 4.79988Z"
                      stroke="black"
                      strokeOpacity="0.2"
                      strokeWidth="1.03964"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                text: t("digipoints.crearEquipos"),
              },
              {
                page: "/digipoints/digipointdistribution",
                icon: (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.147 10.2591L8.51502 6.01639C8.49053 5.95272 8.44732 5.89796 8.39108 5.85934C8.33485 5.82073 8.26823 5.80005 8.20002 5.80005C8.1318 5.80005 8.06518 5.82073 8.00895 5.85934C7.95272 5.89796 7.90951 5.95272 7.88502 6.01639L6.25301 10.2591C6.23606 10.3032 6.21005 10.3433 6.17665 10.3767C6.14325 10.4101 6.10322 10.4361 6.05914 10.453L1.81638 12.085C1.75271 12.1095 1.69795 12.1527 1.65933 12.209C1.62071 12.2652 1.60004 12.3318 1.60004 12.4C1.60004 12.4682 1.62071 12.5349 1.65933 12.5911C1.69795 12.6473 1.75271 12.6905 1.81638 12.715L6.05914 14.347C6.10322 14.364 6.14325 14.39 6.17665 14.4234C6.21005 14.4568 6.23606 14.4968 6.25301 14.5409L7.88502 18.7837C7.90951 18.8473 7.95272 18.9021 8.00895 18.9407C8.06518 18.9793 8.1318 19 8.20002 19C8.26823 19 8.33485 18.9793 8.39108 18.9407C8.44732 18.9021 8.49053 18.8473 8.51502 18.7837L10.147 14.5409C10.164 14.4968 10.19 14.4568 10.2234 14.4234C10.2568 14.39 10.2968 14.364 10.3409 14.347L14.5837 12.715C14.6473 12.6905 14.7021 12.6473 14.7407 12.5911C14.7793 12.5349 14.8 12.4682 14.8 12.4C14.8 12.3318 14.7793 12.2652 14.7407 12.209C14.7021 12.1527 14.6473 12.1095 14.5837 12.085L10.3409 10.453C10.2968 10.4361 10.2568 10.4101 10.2234 10.3767C10.19 10.3433 10.164 10.3032 10.147 10.2591ZM4.45001 2.95L3.70001 1L2.95 2.95L1 3.70001L2.95 4.45001L3.70001 6.40001L4.45001 4.45001L6.40001 3.70001L4.45001 2.95ZM16.4002 4.79988L15.4 2.2L14.3999 4.79988L11.8 5.80001L14.3999 6.80014L15.4 9.40002L16.4002 6.80014L19 5.80001L16.4002 4.79988Z"
                      strokeWidth="1.03964"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.147 10.2591L8.51502 6.01639C8.49053 5.95272 8.44732 5.89796 8.39108 5.85934C8.33485 5.82073 8.26823 5.80005 8.20002 5.80005C8.1318 5.80005 8.06518 5.82073 8.00895 5.85934C7.95272 5.89796 7.90951 5.95272 7.88502 6.01639L6.25301 10.2591C6.23606 10.3032 6.21005 10.3433 6.17665 10.3767C6.14325 10.4101 6.10322 10.4361 6.05914 10.453L1.81638 12.085C1.75271 12.1095 1.69795 12.1527 1.65933 12.209C1.62071 12.2652 1.60004 12.3318 1.60004 12.4C1.60004 12.4682 1.62071 12.5349 1.65933 12.5911C1.69795 12.6473 1.75271 12.6905 1.81638 12.715L6.05914 14.347C6.10322 14.364 6.14325 14.39 6.17665 14.4234C6.21005 14.4568 6.23606 14.4968 6.25301 14.5409L7.88502 18.7837C7.90951 18.8473 7.95272 18.9021 8.00895 18.9407C8.06518 18.9793 8.1318 19 8.20002 19C8.26823 19 8.33485 18.9793 8.39108 18.9407C8.44732 18.9021 8.49053 18.8473 8.51502 18.7837L10.147 14.5409C10.164 14.4968 10.19 14.4568 10.2234 14.4234C10.2568 14.39 10.2968 14.364 10.3409 14.347L14.5837 12.715C14.6473 12.6905 14.7021 12.6473 14.7407 12.5911C14.7793 12.5349 14.8 12.4682 14.8 12.4C14.8 12.3318 14.7793 12.2652 14.7407 12.209C14.7021 12.1527 14.6473 12.1095 14.5837 12.085L10.3409 10.453C10.2968 10.4361 10.2568 10.4101 10.2234 10.3767C10.19 10.3433 10.164 10.3032 10.147 10.2591ZM4.45001 2.95L3.70001 1L2.95 2.95L1 3.70001L2.95 4.45001L3.70001 6.40001L4.45001 4.45001L6.40001 3.70001L4.45001 2.95ZM16.4002 4.79988L15.4 2.2L14.3999 4.79988L11.8 5.80001L14.3999 6.80014L15.4 9.40002L16.4002 6.80014L19 5.80001L16.4002 4.79988Z"
                      stroke="black"
                      strokeOpacity="0.2"
                      strokeWidth="1.03964"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                text: t("menu.AsignarDigipoints"),
              },
            ]
          : undefined,
    },
    {
      page: "/promociones",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3018 1.6875H10.9811C10.8467 1.6874 10.7178 1.74049 10.6225 1.83516L1.98458 10.473C1.79545 10.6631 1.68927 10.9203 1.68927 11.1885C1.68927 11.4566 1.79545 11.7138 1.98458 11.9039L6.09787 16.0172C6.28793 16.2063 6.54516 16.3125 6.8133 16.3125C7.08143 16.3125 7.33866 16.2063 7.52873 16.0172L16.1631 7.38281C16.2578 7.28749 16.3109 7.15857 16.3108 7.02422V2.7C16.3114 2.56715 16.2858 2.43549 16.2353 2.31258C16.1849 2.18967 16.1107 2.07796 16.0169 1.98385C15.9231 1.88975 15.8117 1.81512 15.6889 1.76426C15.5662 1.7134 15.4346 1.68731 15.3018 1.6875Z"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.3018 1.6875H10.9811C10.8467 1.6874 10.7178 1.74049 10.6225 1.83516L1.98458 10.473C1.79545 10.6631 1.68927 10.9203 1.68927 11.1885C1.68927 11.4566 1.79545 11.7138 1.98458 11.9039L6.09787 16.0172C6.28793 16.2063 6.54516 16.3125 6.8133 16.3125C7.08143 16.3125 7.33866 16.2063 7.52873 16.0172L16.1631 7.38281C16.2578 7.28749 16.3109 7.15857 16.3108 7.02422V2.7C16.3114 2.56715 16.2858 2.43549 16.2353 2.31258C16.1849 2.18967 16.1107 2.07796 16.0169 1.98385C15.9231 1.88975 15.8117 1.81512 15.6889 1.76426C15.5662 1.7134 15.4346 1.68731 15.3018 1.6875Z"
            strokeOpacity="0.2"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M13.5 5.625C13.2775 5.625 13.06 5.55902 12.875 5.4354C12.69 5.31179 12.5458 5.13609 12.4606 4.93052C12.3755 4.72495 12.3532 4.49875 12.3966 4.28052C12.44 4.0623 12.5472 3.86184 12.7045 3.70451C12.8618 3.54717 13.0623 3.44003 13.2805 3.39662C13.4988 3.35321 13.725 3.37549 13.9305 3.46064C14.1361 3.54578 14.3118 3.68998 14.4354 3.87498C14.559 4.05999 14.625 4.2775 14.625 4.5C14.625 4.79837 14.5065 5.08452 14.2955 5.2955C14.0845 5.50647 13.7984 5.625 13.5 5.625Z" />
          <path
            d="M13.5 5.625C13.2775 5.625 13.06 5.55902 12.875 5.4354C12.69 5.31179 12.5458 5.13609 12.4606 4.93052C12.3755 4.72495 12.3532 4.49875 12.3966 4.28052C12.44 4.0623 12.5472 3.86184 12.7045 3.70451C12.8618 3.54717 13.0623 3.44003 13.2805 3.39662C13.4988 3.35321 13.725 3.37549 13.9305 3.46064C14.1361 3.54578 14.3118 3.68998 14.4354 3.87498C14.559 4.05999 14.625 4.2775 14.625 4.5C14.625 4.79837 14.5065 5.08452 14.2955 5.2955C14.0845 5.50647 13.7984 5.625 13.5 5.625Z"
            fill-opacity="0.2"
          />
        </svg>
      ),
      iconactive: "",
      text: "Promociones",
    },
    {
      page: "/reportesDashboard",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25002 6.75V4.21875C2.25002 3.84579 2.39817 3.4881 2.6619 3.22438C2.92562 2.96066 3.28331 2.8125 3.65627 2.8125H6.32428C6.60194 2.81251 6.87339 2.89471 7.1044 3.04875L8.08315 3.70125C8.31417 3.85529 8.58561 3.93749 8.86327 3.9375H14.3438C14.7168 3.9375 15.0744 4.08566 15.3382 4.34938C15.6019 4.6131 15.75 4.97079 15.75 5.34375V6.75"
            strokeWidth="1.0625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.25002 6.75V4.21875C2.25002 3.84579 2.39817 3.4881 2.6619 3.22438C2.92562 2.96066 3.28331 2.8125 3.65627 2.8125H6.32428C6.60194 2.81251 6.87339 2.89471 7.1044 3.04875L8.08315 3.70125C8.31417 3.85529 8.58561 3.93749 8.86327 3.9375H14.3438C14.7168 3.9375 15.0744 4.08566 15.3382 4.34938C15.6019 4.6131 15.75 4.97079 15.75 5.34375V6.75"
            strokeOpacity="0.2"
            strokeWidth="1.0625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.8715 7.96465L16.3013 13.7812C16.3013 14.1538 16.1535 14.5111 15.8903 14.7747C15.6271 15.0384 15.27 15.1868 14.8975 15.1875H3.10254C2.73001 15.1868 2.37296 15.0384 2.10976 14.7747C1.84657 14.5111 1.69875 14.1538 1.69875 13.7812L1.12852 7.96465C1.11614 7.80985 1.13595 7.65416 1.1867 7.50738C1.23744 7.36061 1.31803 7.22594 1.42338 7.11184C1.52873 6.99774 1.65656 6.90668 1.79882 6.84441C1.94109 6.78214 2.09471 6.74999 2.25 6.75H15.7536C15.9086 6.75048 16.0618 6.78298 16.2036 6.84546C16.3455 6.90795 16.4729 6.99908 16.5779 7.11312C16.6828 7.22717 16.7631 7.36168 16.8136 7.50821C16.8642 7.65475 16.8839 7.81014 16.8715 7.96465Z"
            strokeWidth="1.0625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.8715 7.96465L16.3013 13.7812C16.3013 14.1538 16.1535 14.5111 15.8903 14.7747C15.6271 15.0384 15.27 15.1868 14.8975 15.1875H3.10254C2.73001 15.1868 2.37296 15.0384 2.10976 14.7747C1.84657 14.5111 1.69875 14.1538 1.69875 13.7812L1.12852 7.96465C1.11614 7.80985 1.13595 7.65416 1.1867 7.50738C1.23744 7.36061 1.31803 7.22594 1.42338 7.11184C1.52873 6.99774 1.65656 6.90668 1.79882 6.84441C1.94109 6.78214 2.09471 6.74999 2.25 6.75H15.7536C15.9086 6.75048 16.0618 6.78298 16.2036 6.84546C16.3455 6.90795 16.4729 6.99908 16.5779 7.11312C16.6828 7.22717 16.7631 7.36168 16.8136 7.50821C16.8642 7.65475 16.8839 7.81014 16.8715 7.96465Z"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="1.0625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Reportes"),
    },
    {
      page: "/puntosporventas",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.4047 6.75C2.21565 6.74981 2.03418 6.82434 1.89984 6.95736C1.7655 7.09039 1.68918 7.27111 1.68751 7.46016C1.68675 7.52568 1.69624 7.59092 1.71564 7.65352L3.53322 14.0625C3.61746 14.3619 3.7975 14.6254 4.04576 14.8127C4.29403 15 4.59684 15.1008 4.90783 15.0996H13.0922C13.4038 15.0999 13.7071 14.9989 13.9563 14.8118C14.2055 14.6248 14.3871 14.3618 14.4739 14.0625L16.2915 7.65352L16.3125 7.46016C16.3109 7.27111 16.2346 7.09039 16.1002 6.95736C15.9659 6.82434 15.7844 6.74981 15.5954 6.75H2.4047ZM9.20112 12.3775C8.90892 12.376 8.62369 12.288 8.38144 12.1246C8.13919 11.9612 7.95077 11.7297 7.83996 11.4593C7.72914 11.189 7.70091 10.8918 7.7588 10.6054C7.8167 10.319 7.95815 10.0561 8.16528 9.85003C8.37242 9.64392 8.63597 9.50379 8.92267 9.44732C9.20937 9.39084 9.50637 9.42056 9.7762 9.53272C10.046 9.64488 10.2766 9.83445 10.4388 10.0775C10.601 10.3206 10.6875 10.6062 10.6875 10.8984C10.6857 11.2914 10.5282 11.6676 10.2497 11.9448C9.97111 12.222 9.5941 12.3776 9.20112 12.3775Z"
            stroke="#232B2F"
            strokeWidth="1.4375"
            strokeLinejoin="round"
          />
          <path
            d="M2.4047 6.75C2.21565 6.74981 2.03418 6.82434 1.89984 6.95736C1.7655 7.09039 1.68918 7.27111 1.68751 7.46016C1.68675 7.52568 1.69624 7.59092 1.71564 7.65352L3.53322 14.0625C3.61746 14.3619 3.7975 14.6254 4.04576 14.8127C4.29403 15 4.59684 15.1008 4.90783 15.0996H13.0922C13.4038 15.0999 13.7071 14.9989 13.9563 14.8118C14.2055 14.6248 14.3871 14.3618 14.4739 14.0625L16.2915 7.65352L16.3125 7.46016C16.3109 7.27111 16.2346 7.09039 16.1002 6.95736C15.9659 6.82434 15.7844 6.74981 15.5954 6.75H2.4047ZM9.20112 12.3775C8.90892 12.376 8.62369 12.288 8.38144 12.1246C8.13919 11.9612 7.95077 11.7297 7.83996 11.4593C7.72914 11.189 7.70091 10.8918 7.7588 10.6054C7.8167 10.319 7.95815 10.0561 8.16528 9.85003C8.37242 9.64392 8.63597 9.50379 8.92267 9.44732C9.20937 9.39084 9.50637 9.42056 9.7762 9.53272C10.046 9.64488 10.2766 9.83445 10.4388 10.0775C10.601 10.3206 10.6875 10.6062 10.6875 10.8984C10.6857 11.2914 10.5282 11.6676 10.2497 11.9448C9.97111 12.222 9.5941 12.3776 9.20112 12.3775Z"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="1.4375"
            strokeLinejoin="round"
          />
          <path
            d="M5.62503 6.75L9.00004 2.25L12.375 6.75"
            stroke="black"
            strokeWidth="1.4375"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Puntos_por_ventas"),
    },
    {
      page: "/reportTyC",
      icon: (
        <svg
          width={30}
          height={30}
          fill="#000000"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m20.925 6.412-1.5-3A.77.77 0 0 0 18.75 3H5.25a.769.769 0 0 0-.675.413l-1.5 3A.844.844 0 0 0 3 6.75V19.5A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5V6.75a.844.844 0 0 0-.075-.338Zm-5.213 8.185-3.178 3.187a.769.769 0 0 1-1.068 0l-3.178-3.187a.75.75 0 0 1 1.059-1.06l1.903 1.904V9.75a.75.75 0 1 1 1.5 0v5.69l1.903-1.902a.75.75 0 0 1 1.06 1.059ZM4.96 6l.75-1.5h12.582l.75 1.5H4.959Z" />
        </svg>
      ),
      iconactive: "",
      text: "Reporte T&C",
    },
    {
      page: "/herramientas",
      icon: (
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.22113 6.7609C7.75949 6.71531 7.29503 6.81352 6.89136 7.04209C6.48769 7.27066 6.16454 7.61841 5.96614 8.03773C5.76775 8.45706 5.70381 8.92746 5.78309 9.38452C5.86237 9.84159 6.08098 10.263 6.409 10.591C6.73702 10.919 7.15841 11.1376 7.61548 11.2169C8.07254 11.2962 8.54294 11.2322 8.96227 11.0339C9.38159 10.8355 9.72935 10.5123 9.95792 10.1086C10.1865 9.70496 10.2847 9.24051 10.2391 8.77887C10.1871 8.26136 9.95782 7.77774 9.59004 7.40996C9.22227 7.04218 8.73864 6.81288 8.22113 6.7609ZM13.6387 9C13.6373 9.24457 13.6193 9.48876 13.5849 9.7309L15.1744 10.9775C15.2436 11.0349 15.2902 11.115 15.306 11.2035C15.3217 11.292 15.3056 11.3832 15.2605 11.4609L13.7568 14.0625C13.7112 14.1395 13.6398 14.1979 13.5553 14.2274C13.4708 14.2569 13.3786 14.2557 13.2949 14.2239L11.7164 13.5882C11.6293 13.5536 11.535 13.5411 11.442 13.5518C11.3489 13.5625 11.2599 13.5962 11.1831 13.6498C10.9421 13.8157 10.689 13.963 10.4258 14.0906C10.343 14.1308 10.2715 14.1908 10.2174 14.2653C10.1633 14.3397 10.1284 14.4263 10.1157 14.5174L9.87911 16.2011C9.86357 16.29 9.81763 16.3707 9.74914 16.4295C9.68066 16.4883 9.59388 16.5215 9.50364 16.5234H6.49636C6.40761 16.5219 6.32202 16.4902 6.25371 16.4335C6.18539 16.3768 6.13843 16.2985 6.12054 16.2116L5.88429 14.5304C5.87102 14.4383 5.8352 14.3509 5.78 14.2759C5.7248 14.201 5.65193 14.1408 5.56788 14.1008C5.30499 13.9739 5.0527 13.8261 4.81343 13.6589C4.73682 13.6056 4.64816 13.5722 4.55542 13.5617C4.46269 13.5512 4.3688 13.564 4.28222 13.5988L2.70405 14.2341C2.62041 14.2659 2.52822 14.2672 2.44372 14.2378C2.35921 14.2083 2.28781 14.15 2.24209 14.073L0.738458 11.4715C0.693251 11.3938 0.677096 11.3025 0.692869 11.214C0.708643 11.1255 0.75532 11.0454 0.824591 10.9881L2.16791 9.9334C2.24151 9.87498 2.29935 9.7991 2.33619 9.71266C2.37302 9.62622 2.38769 9.53195 2.37885 9.4384C2.3662 9.2918 2.35846 9.14555 2.35846 8.99895C2.35846 8.85234 2.36584 8.7082 2.37885 8.56477C2.38672 8.47179 2.37134 8.37831 2.33408 8.29276C2.29683 8.20721 2.23888 8.13227 2.16545 8.07469L0.822833 7.02C0.754686 6.96238 0.708992 6.88261 0.693758 6.79468C0.678524 6.70674 0.694722 6.61625 0.739512 6.53906L2.24315 3.9375C2.28881 3.8605 2.36019 3.8021 2.4447 3.77258C2.52921 3.74306 2.62143 3.74432 2.7051 3.77613L4.28362 4.41176C4.37067 4.44642 4.46496 4.45894 4.55804 4.4482C4.65111 4.43746 4.74007 4.4038 4.81694 4.35023C5.05785 4.18434 5.311 4.03696 5.57421 3.90937C5.65696 3.86916 5.72854 3.80918 5.78261 3.73475C5.83669 3.66031 5.87161 3.57371 5.88429 3.48258L6.12089 1.79895C6.13643 1.71003 6.18237 1.62927 6.25085 1.57047C6.31934 1.51167 6.40612 1.47847 6.49636 1.47656H9.50364C9.59239 1.4781 9.67798 1.50982 9.74629 1.5665C9.8146 1.62319 9.86157 1.70145 9.87946 1.7884L10.1157 3.46957C10.129 3.5617 10.1648 3.64913 10.22 3.72408C10.2752 3.79903 10.3481 3.85918 10.4321 3.89918C10.695 4.02608 10.9473 4.17386 11.1866 4.34109C11.2632 4.3944 11.3518 4.4278 11.4446 4.43829C11.5373 4.44879 11.6312 4.43604 11.7178 4.40121L13.2959 3.76594C13.3796 3.73409 13.4718 3.73278 13.5563 3.76223C13.6408 3.79169 13.7122 3.85002 13.7579 3.92695L15.2615 6.52852C15.3067 6.60624 15.3229 6.69749 15.3071 6.78601C15.2914 6.87453 15.2447 6.95459 15.1754 7.01191L13.8321 8.0666C13.7582 8.12483 13.7 8.20062 13.6628 8.28708C13.6257 8.37353 13.6108 8.4679 13.6194 8.5616C13.631 8.70715 13.6387 8.8534 13.6387 9Z"
            strokeWidth="1.3125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.22113 6.7609C7.75949 6.71531 7.29503 6.81352 6.89136 7.04209C6.48769 7.27066 6.16454 7.61841 5.96614 8.03773C5.76775 8.45706 5.70381 8.92746 5.78309 9.38452C5.86237 9.84159 6.08098 10.263 6.409 10.591C6.73702 10.919 7.15841 11.1376 7.61548 11.2169C8.07254 11.2962 8.54294 11.2322 8.96227 11.0339C9.38159 10.8355 9.72935 10.5123 9.95792 10.1086C10.1865 9.70496 10.2847 9.24051 10.2391 8.77887C10.1871 8.26136 9.95782 7.77774 9.59004 7.40996C9.22227 7.04218 8.73864 6.81288 8.22113 6.7609ZM13.6387 9C13.6373 9.24457 13.6193 9.48876 13.5849 9.7309L15.1744 10.9775C15.2436 11.0349 15.2902 11.115 15.306 11.2035C15.3217 11.292 15.3056 11.3832 15.2605 11.4609L13.7568 14.0625C13.7112 14.1395 13.6398 14.1979 13.5553 14.2274C13.4708 14.2569 13.3786 14.2557 13.2949 14.2239L11.7164 13.5882C11.6293 13.5536 11.535 13.5411 11.442 13.5518C11.3489 13.5625 11.2599 13.5962 11.1831 13.6498C10.9421 13.8157 10.689 13.963 10.4258 14.0906C10.343 14.1308 10.2715 14.1908 10.2174 14.2653C10.1633 14.3397 10.1284 14.4263 10.1157 14.5174L9.87911 16.2011C9.86357 16.29 9.81763 16.3707 9.74914 16.4295C9.68066 16.4883 9.59388 16.5215 9.50364 16.5234H6.49636C6.40761 16.5219 6.32202 16.4902 6.25371 16.4335C6.18539 16.3768 6.13843 16.2985 6.12054 16.2116L5.88429 14.5304C5.87102 14.4383 5.8352 14.3509 5.78 14.2759C5.7248 14.201 5.65193 14.1408 5.56788 14.1008C5.30499 13.9739 5.0527 13.8261 4.81343 13.6589C4.73682 13.6056 4.64816 13.5722 4.55542 13.5617C4.46269 13.5512 4.3688 13.564 4.28222 13.5988L2.70405 14.2341C2.62041 14.2659 2.52822 14.2672 2.44372 14.2378C2.35921 14.2083 2.28781 14.15 2.24209 14.073L0.738458 11.4715C0.693251 11.3938 0.677096 11.3025 0.692869 11.214C0.708643 11.1255 0.75532 11.0454 0.824591 10.9881L2.16791 9.9334C2.24151 9.87498 2.29935 9.7991 2.33619 9.71266C2.37302 9.62622 2.38769 9.53195 2.37885 9.4384C2.3662 9.2918 2.35846 9.14555 2.35846 8.99895C2.35846 8.85234 2.36584 8.7082 2.37885 8.56477C2.38672 8.47179 2.37134 8.37831 2.33408 8.29276C2.29683 8.20721 2.23888 8.13227 2.16545 8.07469L0.822833 7.02C0.754686 6.96238 0.708992 6.88261 0.693758 6.79468C0.678524 6.70674 0.694722 6.61625 0.739512 6.53906L2.24315 3.9375C2.28881 3.8605 2.36019 3.8021 2.4447 3.77258C2.52921 3.74306 2.62143 3.74432 2.7051 3.77613L4.28362 4.41176C4.37067 4.44642 4.46496 4.45894 4.55804 4.4482C4.65111 4.43746 4.74007 4.4038 4.81694 4.35023C5.05785 4.18434 5.311 4.03696 5.57421 3.90937C5.65696 3.86916 5.72854 3.80918 5.78261 3.73475C5.83669 3.66031 5.87161 3.57371 5.88429 3.48258L6.12089 1.79895C6.13643 1.71003 6.18237 1.62927 6.25085 1.57047C6.31934 1.51167 6.40612 1.47847 6.49636 1.47656H9.50364C9.59239 1.4781 9.67798 1.50982 9.74629 1.5665C9.8146 1.62319 9.86157 1.70145 9.87946 1.7884L10.1157 3.46957C10.129 3.5617 10.1648 3.64913 10.22 3.72408C10.2752 3.79903 10.3481 3.85918 10.4321 3.89918C10.695 4.02608 10.9473 4.17386 11.1866 4.34109C11.2632 4.3944 11.3518 4.4278 11.4446 4.43829C11.5373 4.44879 11.6312 4.43604 11.7178 4.40121L13.2959 3.76594C13.3796 3.73409 13.4718 3.73278 13.5563 3.76223C13.6408 3.79169 13.7122 3.85002 13.7579 3.92695L15.2615 6.52852C15.3067 6.60624 15.3229 6.69749 15.3071 6.78601C15.2914 6.87453 15.2447 6.95459 15.1754 7.01191L13.8321 8.0666C13.7582 8.12483 13.7 8.20062 13.6628 8.28708C13.6257 8.37353 13.6108 8.4679 13.6194 8.5616C13.631 8.70715 13.6387 8.8534 13.6387 9Z"
            strokeOpacity="0.2"
            strokeWidth="1.3125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.admin"),
      subsections: [
        {
          page: "/premios",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="30"
              height="30"
              viewBox="0 0 36 41"
              stroke="#000000"
            >
              <image
                id="Capa_31"
                data-name="Capa 31"
                width="36"
                height="41"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAApCAYAAABdnotGAAAABHNCSVQICAgIfAhkiAAAAsdJREFUWEftmE9IF0EUx9uisg6BEaH9U0swAiVLTIJAOilBRUKRhBUdDD3UIUI7BmlQhzxU2EmLiAQhiw6dwjoFaQUVEkWWURZEGkIQ2c/PN2ZlWfQ3O7LdZuHD7s68ee+7b2fe/gnm/Yctk8ksxO0GWAF/YSQIgpEkoYIkRi42iCnH/h6sjo3rRNRxmy9nQQTMwWkJjBLgazQAfYWcP4VcOAvdkAdXQEJ3MuZhNlFOgghYg7ObsNw4vcu+gSDj9M3n+DFsh0baroWB6avmWELaaT+TiiCTmc84Www3oAK2wgOohUNwHXoIeiCWuUrOn8B5+lrTElSGoxdwFadNCFyg4LAPWqDZZG49/d9igro4Pwy76dP8mnVLfMsQoLnwBQahEseTtC3jeAjyTYQLtJ8OoxnRbZyrTRdTQf+fVATJCQFus9sPd+Aozsdoa+L4sglSTNs7Y1vKXvOoCl5BDX2fsolRX+IMmSDKSB9Um2ydY6+J/RZ+wBojQMu73vjXvGpGzIRNzD9BXGE/+4IkxsZGRW9VxF63QCtM/IZFMV8fHHwPS1CGAT/hvcNAma4D1Zs38MuMVQaLQNn47uhvJfZLQkF9pHSviwOuowt7rZxyxj7XWNr0uNDt66DtpKM/zcs9aQsqNJn2gnR7ZrplqWVolFSrtLtsWzBeG5tDoSDVmwEXZ9hugzzNIb2nqH7MdYtO6lDQXH19lCDVDy3Xi3AMSlkhL+MesVN9WRpp1yvFwVkydIt2VXDbpmr+CDqhRZV/ulIT8BKNJ6CIjmGbJ8sc6sbHkQQ+NmPzDKZXpRcUzRpZ9hnKOo18hvwqIwPx14+wUvs6ZHva+wz5DPmnffiV4l8//OsHGdAneaqFcQcOrb9NsNFHQR3sgtfmVujrRb/1euGU7WlP/ya4b3unTuAndZMZX/L192EjOP0zSkGa/r4Mhb8BpwAbxJ3LxUUDqAAAAABJRU5ErkJggg=="
              />
            </svg>
          ),
          iconactive: "",
          text: t("menu.Premios"),
        },
        {
          page: "/allredeem",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="30"
              height="30"
              viewBox="0 0 36 41"
              stroke="#000000"
            >
              <image
                id="Capa_31"
                data-name="Capa 31"
                width="36"
                height="41"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAApCAYAAABdnotGAAAABHNCSVQICAgIfAhkiAAAAsdJREFUWEftmE9IF0EUx9uisg6BEaH9U0swAiVLTIJAOilBRUKRhBUdDD3UIUI7BmlQhzxU2EmLiAQhiw6dwjoFaQUVEkWWURZEGkIQ2c/PN2ZlWfQ3O7LdZuHD7s68ee+7b2fe/gnm/Yctk8ksxO0GWAF/YSQIgpEkoYIkRi42iCnH/h6sjo3rRNRxmy9nQQTMwWkJjBLgazQAfYWcP4VcOAvdkAdXQEJ3MuZhNlFOgghYg7ObsNw4vcu+gSDj9M3n+DFsh0baroWB6avmWELaaT+TiiCTmc84Www3oAK2wgOohUNwHXoIeiCWuUrOn8B5+lrTElSGoxdwFadNCFyg4LAPWqDZZG49/d9igro4Pwy76dP8mnVLfMsQoLnwBQahEseTtC3jeAjyTYQLtJ8OoxnRbZyrTRdTQf+fVATJCQFus9sPd+Aozsdoa+L4sglSTNs7Y1vKXvOoCl5BDX2fsolRX+IMmSDKSB9Um2ydY6+J/RZ+wBojQMu73vjXvGpGzIRNzD9BXGE/+4IkxsZGRW9VxF63QCtM/IZFMV8fHHwPS1CGAT/hvcNAma4D1Zs38MuMVQaLQNn47uhvJfZLQkF9pHSviwOuowt7rZxyxj7XWNr0uNDt66DtpKM/zcs9aQsqNJn2gnR7ZrplqWVolFSrtLtsWzBeG5tDoSDVmwEXZ9hugzzNIb2nqH7MdYtO6lDQXH19lCDVDy3Xi3AMSlkhL+MesVN9WRpp1yvFwVkydIt2VXDbpmr+CDqhRZV/ulIT8BKNJ6CIjmGbJ8sc6sbHkQQ+NmPzDKZXpRcUzRpZ9hnKOo18hvwqIwPx14+wUvs6ZHva+wz5DPmnffiV4l8//OsHGdAneaqFcQcOrb9NsNFHQR3sgtfmVujrRb/1euGU7WlP/ya4b3unTuAndZMZX/L192EjOP0zSkGa/r4Mhb8BpwAbxJ3LxUUDqAAAAABJRU5ErkJggg=="
              />
            </svg>
          ),
          iconactive: "",
          text: t("menu.redenciones"),
        },
        {
          page: "/cargaventas",
          icon: (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_346_527)">
                <path
                  d="M11.25 12.9301H13.9219C15.8555 12.9301 17.4375 11.9032 17.4375 9.99105C17.4375 8.0789 15.5743 7.12687 14.0625 7.05199C13.75 4.0616 11.5664 2.24261 9.00002 2.24261C6.57423 2.24261 5.01188 3.85242 4.50001 5.44886C2.39063 5.64926 0.5625 6.99152 0.5625 9.18949C0.5625 11.3875 2.46094 12.9301 4.78126 12.9301H6.75001"
                  strokeWidth="1.3125"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.25 12.9301H13.9219C15.8555 12.9301 17.4375 11.9032 17.4375 9.99105C17.4375 8.0789 15.5743 7.12687 14.0625 7.05199C13.75 4.0616 11.5664 2.24261 9.00002 2.24261C6.57423 2.24261 5.01188 3.85242 4.50001 5.44886C2.39063 5.64926 0.5625 6.99152 0.5625 9.18949C0.5625 11.3875 2.46094 12.9301 4.78126 12.9301H6.75001"
                  strokeOpacity="0.2"
                  strokeWidth="1.3125"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.25 8.99261L9.00002 6.74261L6.75002 8.99261M9.00002 15.7574V7.30511"
                  strokeWidth="1.3125"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_346_527">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ),
          iconactive: "",
          text: t("menu.Carga_de_Ventas"),
        },
        {
          page: "/reglas",
          icon: (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.8125 16.3125V2.39555C2.81267 2.34635 2.82575 2.29805 2.85043 2.25548C2.8751 2.21292 2.91052 2.17757 2.95313 2.15297C3.2277 1.99195 3.96985 1.6875 5.62501 1.6875C7.87501 1.6875 10.7227 3.375 12.375 3.375C13.3079 3.37258 14.231 3.1841 15.0901 2.82059C15.1008 2.81612 15.1125 2.81437 15.124 2.8155C15.1355 2.81662 15.1466 2.82057 15.1563 2.82701C15.1659 2.83344 15.1738 2.84216 15.1793 2.85239C15.1847 2.86262 15.1876 2.87403 15.1875 2.88563V10.5975C15.1874 10.6247 15.1795 10.6513 15.1646 10.6741C15.1496 10.6969 15.1284 10.7149 15.1035 10.7258C14.8138 10.8527 13.7929 11.25 12.375 11.25C10.6875 11.25 7.87501 10.125 5.62501 10.125C3.375 10.125 2.8125 10.6875 2.8125 10.6875"
                strokeWidth="1.25"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M2.8125 16.3125V2.39555C2.81267 2.34635 2.82575 2.29805 2.85043 2.25548C2.8751 2.21292 2.91052 2.17757 2.95313 2.15297C3.2277 1.99195 3.96985 1.6875 5.62501 1.6875C7.87501 1.6875 10.7227 3.375 12.375 3.375C13.3079 3.37258 14.231 3.1841 15.0901 2.82059C15.1008 2.81612 15.1125 2.81437 15.124 2.8155C15.1355 2.81662 15.1466 2.82057 15.1563 2.82701C15.1659 2.83344 15.1738 2.84216 15.1793 2.85239C15.1847 2.86262 15.1876 2.87403 15.1875 2.88563V10.5975C15.1874 10.6247 15.1795 10.6513 15.1646 10.6741C15.1496 10.6969 15.1284 10.7149 15.1035 10.7258C14.8138 10.8527 13.7929 11.25 12.375 11.25C10.6875 11.25 7.87501 10.125 5.62501 10.125C3.375 10.125 2.8125 10.6875 2.8125 10.6875"
                strokeOpacity="0.2"
                strokeWidth="1.25"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
          ),
          iconactive: "",
          text: t("menu.reglas"),
        },
      ],
    },
    {
      page: "/customercare",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.91796 13.5C2.46092 12.3398 1.68748 10.2175 1.68748 9C1.68748 4.96125 5.24988 1.6875 9 1.6875C12.7501 1.6875 16.3125 4.96125 16.3125 9C16.3125 10.2175 15.5039 12.4102 15.082 13.5"
            strokeWidth="1.3125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.91796 13.5C2.46092 12.3398 1.68748 10.2175 1.68748 9C1.68748 4.96125 5.24988 1.6875 9 1.6875C12.7501 1.6875 16.3125 4.96125 16.3125 9C16.3125 10.2175 15.5039 12.4102 15.082 13.5"
            strokeOpacity="0.2"
            strokeWidth="1.3125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.81062 9.49673L3.32933 9.77798C2.26655 10.4002 2.21487 12.3236 3.2105 14.0741C4.20613 15.8245 5.87781 16.7393 6.94059 16.1173L7.42188 15.8361C7.54962 15.76 7.64245 15.6369 7.68044 15.4931C7.71843 15.3494 7.69855 15.1965 7.62508 15.0672L4.57035 9.70309C4.53433 9.63933 4.48602 9.58335 4.42822 9.5384C4.37041 9.49345 4.30425 9.46042 4.23359 9.44123C4.16292 9.42203 4.08914 9.41705 4.01654 9.42658C3.94393 9.4361 3.87394 9.45995 3.81062 9.49673ZM14.1895 9.49673L14.6708 9.77798C15.7335 10.3999 15.7866 12.3233 14.7896 14.0737C13.7926 15.8241 12.1223 16.7389 11.0595 16.117L10.5782 15.8357C10.4505 15.7597 10.3576 15.6365 10.3196 15.4928C10.2817 15.3491 10.3015 15.1961 10.375 15.0669L13.4297 9.70309C13.4658 9.63933 13.5141 9.58335 13.5719 9.5384C13.6297 9.49345 13.6958 9.46042 13.7665 9.44123C13.8372 9.42203 13.9109 9.41705 13.9835 9.42658C14.0562 9.4361 14.1261 9.45995 14.1895 9.49673Z"
            strokeWidth="1.3125"
            strokeMiterlimit="10"
          />
        </svg>
      ),
      iconactive: "",
      text: "Customer Care",
    },
    {
      page: "/etla/dashboardEtla",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.17189 1.6875H2.39063C2.0023 1.6875 1.6875 2.0023 1.6875 2.39062V7.17188C1.6875 7.5602 2.0023 7.875 2.39063 7.875H7.17189C7.56021 7.875 7.87502 7.5602 7.87502 7.17188V2.39062C7.87502 2.0023 7.56021 1.6875 7.17189 1.6875Z"
            stroke="#232B2F"
            strokeWidth="1.147"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.17189 1.6875H2.39063C2.0023 1.6875 1.6875 2.0023 1.6875 2.39062V7.17188C1.6875 7.5602 2.0023 7.875 2.39063 7.875H7.17189C7.56021 7.875 7.87502 7.5602 7.87502 7.17188V2.39062C7.87502 2.0023 7.56021 1.6875 7.17189 1.6875Z"
            stroke="black"
            strokeOpacity="0.2"
            strokeWidth="1.147"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.6094 1.6875H10.8281C10.4398 1.6875 10.125 2.0023 10.125 2.39062V7.17188C10.125 7.5602 10.4398 7.875 10.8281 7.875H15.6094C15.9977 7.875 16.3125 7.5602 16.3125 7.17188V2.39062C16.3125 2.0023 15.9977 1.6875 15.6094 1.6875Z"
            stroke="black"
            strokeWidth="1.147"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.17189 10.125H2.39063C2.0023 10.125 1.6875 10.4398 1.6875 10.8281V15.6094C1.6875 15.9977 2.0023 16.3125 2.39063 16.3125H7.17189C7.56021 16.3125 7.87502 15.9977 7.87502 15.6094V10.8281C7.87502 10.4398 7.56021 10.125 7.17189 10.125Z"
            stroke="black"
            strokeWidth="1.147"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.6094 10.125H10.8281C10.4398 10.125 10.125 10.4398 10.125 10.8281V15.6094C10.125 15.9977 10.4398 16.3125 10.8281 16.3125H15.6094C15.9977 16.3125 16.3125 15.9977 16.3125 15.6094V10.8281C16.3125 10.4398 15.9977 10.125 15.6094 10.125Z"
            stroke="black"
            strokeWidth="1.147"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Dashboard"),
    },
  ];

  const redirection = (tyc, data) => {
    const userCanales = [null, "adobe", "adobeetla", undefined].includes(
      data.inprogram
    );
    const userEtla = data.inprogram === "etla";

    if (userEtla && !data.policyetla) {
      console.log("redirtigiendo a tc");
      return router.push("/etla/terminosycondiciones");
    }

    if (!tyc && userCanales) {
      return router.push("/terminosycondiciones");
    }

    if (location === "/etla/terminosycondiciones") {
      return router.push("/etla/dashboardEtla");
    }

    if (location === "/terminosycondiciones") {
      return router.push("/dashboard");
    }
  };

  const href = (page) => {
    if (showMenu) {
      setShowMenu(false);
    }

    router.push(page);
  };

  const logout = () => {
    dispatch(setInitialStateAwards());
    dispatch(setInitialStateCompany());
    dispatch(setInitialStateOrders());
    dispatch(setInitialStateTeams());
    dispatch(setInitialStateSales());
    dispatch(setInitialStateUser());
    window.sessionStorage.removeItem("infoDt");
    Cookies.remove("dp");
    dispatch(loadingUser(true));
    router.push("/");
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return <ModalCustomerCare closeModal={closeModal} />;
    }
    if (modal === 1) {
      return <ModalPersonalize onClose={setOpened} />;
    }
    if (modal === 2) {
      return <ModalUpdateData onClose={setOpened} />;
    }
    if (modal === 3) {
      return <ModalTCPa />;
    }

    if (modal === 4) {
      return <ModalInfoAPC onClose={setOpened} />;
    }

    if (modal === 5) {
      return <ModalTCETLA onClose={setOpened} />;
    }
  }, [modal, opened]);

  const menu = (n) => {
    if (userRedux !== 0) {
      return locations
        .filter(({ page }) => {
          if (n === 1) {
            if (userRedux.roleId === 1) {
              return [
                "/dashboard",
                "/digipointsall",
                "/reportesDashboard",
                "/comunicado",
              ].includes(page);
            }
            if (userRedux.roleId === 3) {
              return [
                "/dashboard",
                "/digipoints/mydigipoints",
                "/reportes/dashboards/InvoiceReportUser",
                "/comunicado",
              ].includes(page);
            }

            if (userRedux.roleId === 2) {
              return ["/dashboard", "/puntosporventas", "/comunicado"].includes(
                page
              );
            }

            if (userRedux.roleId === 5) {
              return [
                "/dashboard",
                "/digipoints/mydigipoints",
                "/reportes/dashboards/InvoiceReportUser",
                "/comunicado",
              ].includes(page);
            }
          }
          if (n === 2) {
            if (userRedux.roleId === 1) {
              return [
                "/herramientas",
                "/puntosporventas",
                "/customercare",
              ].includes(page);
            }

            if (userRedux.roleId === 3) {
              return ["/ManagmentDigipoints" /*"/puntosporventas"*/].includes(
                page
              );
            }
          }
        })
        .map(({ icon, page, text, subsections }, index) => (
          <MenuAPC
            icon={icon}
            page={page}
            text={text}
            index={index}
            subsections={subsections}
            href={href}
            location={location}
            collapse={collapse}
            dataUserSwitch={dataSession}
          />
        ));
    }
  };

  const textLocation = () => {
    const item = locations.find((i) => i.page === location);

    if (item === undefined) {
      const locationsWithSubsections = locations
        .filter(({ subsections }) => subsections)
        .map(({ subsections }) => subsections);

      const subsectionText = locationsWithSubsections
        .flat()
        .find((item) => item.page === location);

      if (subsectionText === undefined) {
        if (location.includes("user")) {
          return t("user.ajustesdeperfil");
        }

        if (location === "/catalogo") {
          return t("menu.catalogo");
        }

        if (location === "/shoppingCar") {
          return t("shoopingcar.carrito");
        }

        if (location === "/estadoProducto") {
          return t("estadoProducto.estado");
        }

        if (location === "/howtowin") {
          return t("dashboard.htw");
        }

        if (
          [
            "/reportes/dashboards/SalesPerformance",
            "/reportes/dashboards/DigiPointsPerformance",
            "/reportes/dashboards/UserPerformance",
            "/reportes/dashboards/PartnerTyc",
            "/reportes/dashboards/InvoiceReport",
            "/reportes/dashboards/DigiPointsRedemption",
            "/reportes/dashboards/DigiPointsPromotions",
            "/reportes/dashboards/DigiPointsBehavior",
            "/reportes/dashboards/GoogleAnalytic",
            "/reportes/dashboards/CustomCare",
            "/reportes/dashboards/SoImportReport",
            "/reportes/dashboards/RegistrationPerformance",
            "/reportes/dashboards/FollowUp",
            "/reportes/dashboards/Summary",
          ].includes(location)
        ) {
          return t("Reportes.reportes");
        }
        if (location === "/reportes/dashboards/InvoiceReportUser") {
          return "Invoice Report";
        }

        if (location.includes("comunicado")) {
          return t("menu.comunicados");
        }

        if (location.includes("organizacion")) {
          return t("menu.Participantes");
        }

        if (location.includes("productos")) {
          return t("menu.Productos");
        }

        dispatch(changeLoadingData(true));
        router.push("/dashboard");
        return "Redirect";
      }

      return subsectionText.text;
    }

    return item.text;
  };

  if (!loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center z-50">
        <div className="spinner"></div>
      </div>
    );
  }

  if (sections.includes(location)) {
    return (
      <>
        {loadingData && (
          <div
            className="fixed h-screen w-screen flex items-center justify-center bg-[rgba(255,255,255,0.8)]"
            style={{ zIndex: 201 }}
          >
            <div className="spinner"></div>
          </div>
        )}
        {children}
      </>
    );
  }

  const actionCustomerCare = () => {
    setModal(0);
    setOpened(true);
  };

  console.log(userRedux.inprogram);

  return (
    <>
      {loadingData && (
        <div
          className="fixed h-screen w-screen flex items-center justify-center z-50 bg-[rgba(255,255,255,0.8)]"
          style={{ zIndex: 201 }}
        >
          <div className="spinner"></div>
        </div>
      )}
      <Modal
        opened={opened}
        withCloseButton={[0, 5].includes(modal) ? true : false}
        onClose={
          [0, 5].includes(modal)
            ? closeModal
            : [3].includes(modal)
            ? () => logout()
            : () => {}
        }
        fullScreen={[1, 2].includes(modal)}
        centered
        size={"auto"}
        overlayProps={{
          backgroundOpacity: [0, 3].includes(modal) ? 1 : 0.55,
          blur: 5,
        }}
        transitionProps={{ transition: "rotate-left" }}
        closeButtonProps={{
          variant: "none",
          size: "auto",
          children: <CloseCircle />,
        }}
        padding={0}
      >
        {typeModal}
      </Modal>
      <ContainerContent pageTitle={textLocation()}>
        <div className="containerGlobal">
          <div className="globalContent bg-primary ">
            <div
              className={`containerLayout`}
              style={{
                "--wmenu": collapse ? "5.56%" : "18.3%",
                "--wminmenu": collapse ? "82px" : "256px",
                "--showmenu": showMenu ? "flex" : "none",
              }}
            >
              <div className="flex flex-col py-6 gap-6 h-full">
                {
                  <MenuLines
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                    switchUser={
                      typeof dataSession.prevData === "object" && true
                    }
                    styles={showMenu ? "h-[50px]" : "hidden"}
                  />
                }
                <div className="flex flex-col gap-6 px-6">
                  <div
                    className="logoAdobe cursor-pointer"
                    style={{
                      "--wlogo": collapse ? "100%" : "60%",
                    }}
                    onClick={() => router.push("/dashboard")}
                  >
                    <figure className="flex">
                      <img
                        src="/assets/dashboard/logoapc.webp"
                        alt="apc_canales"
                      ></img>
                    </figure>
                  </div>

                  {collapse ? (
                    <DigiPointsCollapse digipoints={digipoints} />
                  ) : (
                    <DigiPointsCard digipoints={digipoints} />
                  )}
                </div>
                <div className="flex flex-col gap-6 overflow-y-scroll scrollMenu w-full">
                  <div className="containerRedirections gap-2">{menu(1)}</div>
                  {userRedux.roleId !== 5 && (
                    <>
                      <hr className="mx-6" />
                      <div className="containerRedirections gap-2">
                        {menu(2)}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-center w-full mt-auto">
                  {collapse ? (
                    <figure className="flex w-[36px]">
                      <img
                        src="/assets/dashboard/Logo11.png"
                        alt="apc_canales"
                      ></img>
                    </figure>
                  ) : (
                    <figure className="flex">
                      <img
                        src="/assets/dashboard/years.webp"
                        alt="apc_canales"
                      ></img>
                    </figure>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <div
                className={`w-full ${
                  typeof dataSession.prevData === "object"
                    ? "pt-0 px-0"
                    : "pt-1 px-6"
                }`}
              >
                <div
                  className={`containerNavbar ${
                    typeof dataSession.prevData === "object"
                      ? "!bg-[#232B2F] py-2"
                      : "!bg-[#ffff] py-2"
                  }`}
                >
                  <div className="sticky grid justify-items-center items-center">
                    <div className="md:hidden flex">
                      <MenuLines
                        onClick={() => setShowMenu(!showMenu)}
                        switchUser={
                          typeof dataSession.prevData === "object" && true
                        }
                      />
                    </div>
                    <div className="md:flex hidden">
                      <MenuLines
                        onClick={() => setCollapse(!collapse)}
                        switchUser={
                          typeof dataSession.prevData === "object" && true
                        }
                      />
                    </div>
                  </div>
                  <div className="navbar grid grid-cols-3">
                    <div className="w-auto">
                      <p
                        className={`sm:!text-3xl md:!text-3xl !text-sm font-bold ${
                          typeof dataSession.prevData === "object" &&
                          "text-white"
                        }`}
                      >
                        {textLocation()}
                      </p>
                    </div>
                    {screen > 639 && (
                      <div className="sm:visible invisible notifications grid grid-cols-6 content-center gap-5">
                        {/* adobe etla */}
                        {userRedux.inprogram === "adobeetla" && (
                          <div
                            onClick={() => router.push("/etla/dashboardEtla")}
                            className="w-full cursor-pointer"
                          >
                            <ETLA />
                          </div>
                        )}

                        {/* 1 */}
                        <div className="w-auto">
                          <div
                            className="shoopingMarket cursor-pointer"
                            onClick={() => dispatch(setMenuMarket(!menuMarket))}
                          >
                            <svg
                              width="35"
                              height="35"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0938 25.2301C10.6005 25.2301 11.0114 24.8193 11.0114 24.3125C11.0114 23.8057 10.6005 23.3949 10.0938 23.3949C9.58698 23.3949 9.17615 23.8057 9.17615 24.3125C9.17615 24.8193 9.58698 25.2301 10.0938 25.2301Z"
                                stroke={
                                  typeof dataSession.prevData === "object"
                                    ? "white"
                                    : "black"
                                }
                                strokeWidth="1.83523"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22.9403 25.2301C23.4471 25.2301 23.858 24.8193 23.858 24.3125C23.858 23.8057 23.4471 23.3949 22.9403 23.3949C22.4336 23.3949 22.0227 23.8057 22.0227 24.3125C22.0227 24.8193 22.4336 25.2301 22.9403 25.2301Z"
                                stroke={
                                  typeof dataSession.prevData === "object"
                                    ? "white"
                                    : "black"
                                }
                                strokeWidth="1.83523"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2.75284 5.0426H6.42329L9.17613 20.642H23.858"
                                stroke={
                                  typeof dataSession.prevData === "object"
                                    ? "white"
                                    : "black"
                                }
                                strokeWidth="1.83523"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9.17614 16.9716H23.4817C23.5878 16.9717 23.6907 16.9349 23.7728 16.8677C23.8549 16.8005 23.9111 16.7069 23.9319 16.6028L25.5836 8.34429C25.597 8.2777 25.5953 8.20897 25.5789 8.14308C25.5624 8.07719 25.5316 8.01578 25.4885 7.96327C25.4454 7.91076 25.3912 7.86847 25.3298 7.83945C25.2684 7.81042 25.2014 7.79539 25.1334 7.79544H7.34091"
                                stroke={
                                  typeof dataSession.prevData === "object"
                                    ? "white"
                                    : "black"
                                }
                                strokeWidth="1.83523"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* 2 */}
                        {typeof dataSession.prevData === "object" && (
                          <EyeObserver />
                        )}
                        {/* 3 */}
                        <div className="w-full col-span-2 sm:mr-0 md:mr-0 lg:mr-0 mr-3">
                          <div className="relative">
                            <div className="menumobile hidden">
                              <MobileMenu
                                className="bannerMob"
                                locations={locations}
                              />
                            </div>
                            <div
                              className="flex items-center gap-3 bg-[#F5F5F5] rounded-full  sm:w-[217px] md:w-[217px] p-3 text-xs cursor-pointer"
                              onClick={() => setMenuUser(!menuUser)}
                            >
                              {profileImage}
                              <div className="username">
                                <p className="lg:!text-sm xl:!text-base">
                                  {userRedux?.names}
                                </p>
                              </div>
                            </div>
                          </div>
                          {menuUser && (
                            <UserOptions
                              user={userRedux}
                              token={token}
                              logout={logout}
                              menuUser={menuUser}
                              setMenuUser={setMenuUser}
                              actionCustomerCare={actionCustomerCare}
                            />
                          )}
                        </div>
                      </div>
                    )}
                    {screen < 639 &&
                      typeof dataSession.prevData === "object" && (
                        <EyeObserver />
                      )}
                  </div>
                </div>
                <div
                  className={`pt-1 overflow-hidden lg:overflow-visible ${
                    typeof dataSession.prevData === "object" ? "px-6" : "px-0"
                  }`}
                >
                  {children}
                </div>

                {screen < 639 && (
                  <div className="sticky bottom-0 w-full border-t-2 object-bottom">
                    <div className="navbar grid grid-cols-2 justify-items-center bg-white">
                      <div
                        className="shoopingMarket cursor-pointer"
                        onClick={() => dispatch(setMenuMarket(!menuMarket))}
                      >
                        <ShoppingCard />
                      </div>
                      <div className="" onClick={() => setMenuUser(!menuUser)}>
                        {profileImage}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {menuMarket && <MenuMarket />}
              {screen < 767 && menuUser && (
                <UserOptions
                  user={userRedux}
                  token={token}
                  logout={logout}
                  menuUser={menuUser}
                  setMenuUser={setMenuUser}
                  actionCustomerCare={actionCustomerCare}
                  size={screen}
                />
              )}
              {screen > 639 && (
                <a
                  href="https://api.whatsapp.com/send?phone=5715800310&text=Hola,%20Necesito%20informacion%20sobre"
                  target="_blank"
                  className="rounded-full border flex w-fit right-0 bottom-0 fixed p-3 mr-6 mb-6 bg-white whatsappButton z-[1]"
                >
                  <svg
                    width={40}
                    height={40}
                    fill="none"
                    stroke="#25D366"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="iconWhatsApp"
                  >
                    <path d="M4.256 16.594a8.99 8.99 0 1 1 3.15 3.15v0l-3.112.882a.74.74 0 0 1-.919-.92l.881-3.112Z" />
                    <path d="M7.5 9.703A2.24 2.24 0 0 1 9.75 7.5h.328a.74.74 0 0 1 .638.366l.694 1.153a.73.73 0 0 1 .028.722l-.44.9a3.375 3.375 0 0 0 2.362 2.362l.9-.44a.732.732 0 0 1 .722.028l1.153.693a.74.74 0 0 1 .365.638v.328a2.24 2.24 0 0 1-2.203 2.25A6.74 6.74 0 0 1 7.5 9.703v0Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </ContainerContent>
    </>
  );
};

export default Layout;
