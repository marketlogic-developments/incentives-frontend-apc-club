import { useMemo } from "react";
import { Menu, Modal } from "@mantine/core";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingUser,
  setCompany,
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
import { setInitialStateAwards } from "../store/reducers/awards.reducer";
import { setInitialStateCompany } from "../store/reducers/company.reducer";
import { setInitialStateOrders } from "../store/reducers/orders.reducer";
import { setInitialStateSales } from "../store/reducers/sales.reducer";
import { setInitialStateTeams } from "../store/reducers/teams.reducer";
import { useState } from "react";
import ModalFormCustomer from "./Lay0ut/ModalFormCustomer";

const Layout = ({ children }) => {
  const digipoints = useSelector((state) => state.user.digipoints);
  const userRedux = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const loadingData = useSelector((state) => state.loadingData.loadingData);
  const dispatch = useDispatch();
  const location =
    typeof window !== "undefined" ? window.location.pathname : "";
  const router = useRouter();
  const sections = ["/", "/terminosycondiciones", "/registro"];
  const [t, i18n] = useTranslation("global");
  const [modal, setModal] = useState(0);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("infoDt") !== null && userRedux === 0) {
      const userGetData = JSON.parse(window.sessionStorage.getItem("infoDt"));

      axios
        .get(`${process.env.BACKURL}/users/${userGetData?.id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${userGetData?.token}`,
          },
        })
        .then((userInfo) => {
          //Get user digiPoints
          axios
            .get(
              `${process.env.BACKURL}/reporters/digipoints-redeem-status/2/${userGetData?.id}`,
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
              `${process.env.BACKURL}/${compOrDist.endpoint}/${compOrDist.byId}`,
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
              redirection(userInfo.data.policy);
              dispatch(loadingUser(true));
            });
        });
    } else {
      if (userRedux !== 0) {
        redirection(userRedux.policy);
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

  // useEffect(() => {
  //   let timeoutId;

  //   if (userRedux !== 0) {
  //     const handleVisibilityChange = () => {
  //       if (document.visibilityState === "hidden") {
  //         timeoutId = setTimeout(function () {
  //           logout();
  //         }, 300000);
  //       } else {
  //         // Si el usuario vuelve antes de que se ejecute el setTimeout, cancelarlo
  //         clearTimeout(timeoutId);
  //       }
  //     };

  //     document.addEventListener("visibilitychange", handleVisibilityChange);

  //     return () => {
  //       document.removeEventListener(
  //         "visibilitychange",
  //         handleVisibilityChange
  //       );

  //       clearTimeout(timeoutId);
  //     };
  //   }

  //   if (location === "/") {
  //     dispatch(loadingUser(true));
  //   }
  // }, [userRedux]);

  const language = (rolNum) => {
    if (rolNum === 1) {
      return i18n.changeLanguage("por");
    }

    return i18n.changeLanguage("es");
  };

  const locations = [
    {
      page: "/dashboard",
      icon: (
        <svg
          width="30"
          height="30"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 15V5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 .75.75V15"></path>
          <path d="M1.5 18.75h21"></path>
          <path d="M11.25 18.75V15h6v3.75"></path>
        </svg>
      ),
      iconactive: "",
      text: t("menu.Dashboard"),
    },
    {
      page: "/organizacion",
      icon: (
        <svg
          width={30}
          height={30}
          fill="#000000"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.5 19.5h-.75V9.75a1.5 1.5 0 0 0-1.5-1.5h-6v-4.5a1.5 1.5 0 0 0-1.5-1.5h-9a1.5 1.5 0 0 0-1.5 1.5V19.5H1.5a.75.75 0 1 0 0 1.5h21a.75.75 0 1 0 0-1.5Zm-11.25-6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 0 1 .75.75ZM6 6h3a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 6 6Zm0 9.75h3a.75.75 0 1 1 0 1.5H6a.75.75 0 1 1 0-1.5Zm8.25-6h6v9.75h-6V9.75Z" />
          <path d="M18 15.75h-1.5a.75.75 0 1 0 0 1.5H18a.75.75 0 1 0 0-1.5Z" />
          <path d="M16.5 13.5H18a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5Z" />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Participantes"),
    },
    {
      page: "/puntosporventas",
      icon: (
        <svg
          id="Capa_2"
          data-name="Capa 2"
          width={35}
          height={35}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1025.03 763.6"
          stroke="#000000"
        >
          <g id="Capa_1-2" data-name="Capa 1">
            <g id="_2cFvTj" data-name="2cFvTj">
              <g>
                <path
                  className="cls-1"
                  d="M168.47,413.51c15.11-1.46,29.96-2.98,44.82-4.31,31.89-2.85,63.66-7.35,95.83-6.11,49.49,1.91,96.51,13.85,142.16,32.82,72.59,30.16,145.49,59.56,218.39,88.96,14.63,5.9,24.39,16.03,31.08,30.61,8.04-2.23,16.01-4.44,23.98-6.66,74.97-20.87,149.89-41.91,224.92-62.54,33.23-9.14,65.87,10.29,73.72,43.12,6.56,27.41-6.7,54.75-33.05,67.6-30.7,14.97-61.5,29.75-92.26,44.62-71.65,34.63-143.3,69.24-214.94,103.89-47.94,23.19-96.33,23.72-145.44,3.63-79.22-32.41-158.54-64.56-237.86-96.73-32.09-13.01-64.92-14.05-98.28-5.59-9.22,2.34-18.47,4.61-27.83,6.27-4.95,.88-6.35,3.09-5.94,7.77,.69,7.85-1.42,15.04-6.33,21.26-6.14,7.78-14.22,11.89-24.14,12.06-8.15,.14-16.32-.16-24.46,.2-1.74,.08-4.23,1.74-4.95,3.32-6.11,13.49-16.43,20.23-31.16,20.27-20.58,.06-41.17,.12-61.75,.06-11-.03-14.98-4.18-14.98-15.25,0-108.94,0-217.88,0-326.82,0-11.62,3.67-15.3,15.34-15.33,20-.05,40.01,.13,60-.08,15.49-.17,26.35,6.37,32.61,20.67,.62,1.43,3,2.84,4.64,2.93,6.2,.34,12.42,.14,18.63,.14,21.78,0,31.65,7.57,37.23,29.23Zm-.61,215.86c1.09,.29,1.49,.53,1.82,.46,7.77-1.7,15.6-3.18,23.28-5.2,40.98-10.78,80.91-8.53,120.32,7.68,78.6,32.35,157.42,64.18,236.19,96.12,41.73,16.92,82.95,15.5,123.51-4.11,78.63-38.01,157.26-76.02,235.88-114.04,23.59-11.4,47.2-22.76,70.74-34.24,15.13-7.38,23.11-20.78,21.68-35.92-2.2-23.28-23.43-37.28-46.99-30.76-42.08,11.64-84.12,23.41-126.18,35.12-39.63,11.04-79.25,22.09-118.88,33.13-2.77,.77-5.16,1.22-5.89,5.14-6.32,34.35-36.57,53.06-69.93,43.05-40.33-12.1-80.53-24.63-120.78-36.99-23.55-7.23-47.12-14.42-70.64-21.76-6.78-2.12-10.17-8.29-8.45-14.47,1.82-6.51,8.12-9.83,15.19-7.97,1.13,.3,2.23,.67,3.34,1.01,62.51,19.18,125.02,38.38,187.54,57.52,17.38,5.32,33.71-2.5,39.3-18.48,4.82-13.78-1.73-31.59-19.04-38.51-76.4-30.55-152.51-61.82-228.71-92.86-48.74-19.85-99.36-29.45-151.93-26.14-34.66,2.18-69.2,6.32-103.82,9.22-5.8,.49-7.76,2-7.73,8.14,.25,59.8,.15,119.61,.16,179.41,0,1.87,0,3.75,0,5.43ZM23.88,694.29c18.63,0,36.85,.23,55.06-.13,5.83-.11,7.25-4.74,7.25-10.01-.05-96.7-.04-193.39-.06-290.09,0-7.12-2.7-9.87-9.79-9.92-12.04-.08-24.08-.02-36.11-.02-5.37,0-10.74,0-16.34,0v310.17Zm86.21-24.19c.89,.26,1.42,.56,1.96,.56,6.99,.05,13.97,.09,20.96,.08,9.21-.01,11.39-2.17,11.39-11.22,0-75.31,0-150.62-.01-225.93,0-5.82,.06-11.65-.03-17.47-.07-4.43-2.22-7.88-6.73-8.09-9.04-.41-18.11-.12-27.53-.12v262.18Z"
                />
                <path
                  className="cls-1"
                  d="M649.93,408.33c-112.72-.07-204.35-91.71-204.21-204.21C445.87,91.38,537.61-.28,650.02,0c113.01,.29,204.23,92.02,203.94,205.08-.29,111.87-92.08,203.31-204.04,203.24Zm-.74-23.56c99.77,.09,181.1-80.65,181.25-179.95,.16-100.01-80.47-180.92-180.54-181.16-99.19-.23-180.42,80.66-180.62,179.87-.2,99.7,80.65,181.15,179.91,181.24Z"
                />
                <path
                  className="cls-1"
                  d="M374.5,215.95c-5.24,0-10.49,.14-15.73-.03-7.58-.25-12.56-4.96-12.64-11.68-.08-6.59,5.03-11.68,12.5-11.83,10.87-.21,21.75-.22,32.62,.02,7.14,.16,12.23,5.14,12.37,11.39,.15,6.73-4.77,11.76-12.23,12.08-5.62,.24-11.26,.05-16.89,.05Z"
                />
                <path
                  className="cls-1"
                  d="M924.65,215.96c-5.42,0-10.84,.16-16.25-.04-7.45-.27-12.47-5.19-12.41-11.84,.06-6.41,4.92-11.44,12.05-11.62,11.21-.27,22.44-.28,33.66,.02,7.1,.19,11.82,5.33,11.75,11.81-.08,6.56-4.77,11.27-11.97,11.58-5.6,.24-11.22,.05-16.83,.05v.03Z"
                />
                <path
                  className="cls-1"
                  d="M390.78,109.91c4.03,2.32,7.21,3.45,9.46,5.58,7.86,7.45,15.48,15.16,23.01,22.95,5.25,5.42,5.3,12.21,.48,17.09-4.74,4.81-11.7,4.7-17.07-.57-7.88-7.71-15.65-15.54-23.36-23.42-3.74-3.83-5.21-8.76-2.24-13.23,2.21-3.33,6.22-5.47,9.73-8.39Z"
                />
                <path
                  className="cls-1"
                  d="M428.72,260.32c-2.33,4.09-3.43,7.32-5.57,9.57-7.44,7.86-15.16,15.47-22.94,23.01-5.34,5.18-12.34,5.24-17.06,.47-4.61-4.66-4.76-11.52,.15-16.65,7.76-8.1,15.73-16,23.77-23.83,3.8-3.7,8.76-5.18,13.24-2.18,3.34,2.23,5.52,6.2,8.4,9.6Z"
                />
                <path
                  className="cls-1"
                  d="M883.2,160c-2.99-2.31-6.92-4.23-9.16-7.37-2.93-4.09-2.28-9.22,1.23-12.9,8.41-8.81,17.02-17.46,25.93-25.77,4.34-4.05,11.14-3.22,15.29,.94,4.21,4.22,5.14,10.89,1.05,15.27-8.44,9.04-17.33,17.68-26.27,26.24-1.67,1.6-4.46,2.04-8.06,3.59Z"
                />
                <path
                  className="cls-1"
                  d="M883.29,247.89c4.02,2.16,7.13,3.11,9.24,5.1,8.02,7.57,15.81,15.4,23.5,23.31,5.25,5.39,5.29,12.3,.49,17.09-4.79,4.77-11.78,4.71-17.09-.48-7.9-7.7-15.67-15.54-23.4-23.42-3.77-3.84-5.14-8.79-2.25-13.26,2.17-3.36,6.18-5.53,9.51-8.35Z"
                />
                <path
                  className="cls-1"
                  d="M66.54,648.69c-.11,6.59-5.45,11.72-11.99,11.53-6.24-.18-11.4-5.41-11.43-11.59-.04-6.54,5.19-11.76,11.79-11.76,6.64,0,11.74,5.18,11.63,11.82Z"
                />
                <path
                  className="cls-1"
                  d="M800.92,204.31c-.39,84.05-68.26,151.49-151.95,150.96-83.76-.53-150.75-68.58-150.3-152.69,.44-82.76,68.96-150.01,152.31-149.5,82.9,.52,150.32,68.51,149.94,151.22Zm-278.7-.45c-.07,70.38,56.93,127.71,127.15,127.89,71.13,.18,127.89-56.92,127.96-128.74,.07-69.19-57.43-126.28-127.36-126.44-70.17-.16-127.68,57.14-127.76,127.29Z"
                />
                <path
                  className="cls-1"
                  d="M587.95,263.53c1.64-9.64,3.24-21.18,5.69-32.54,1.36-6.32,.47-10.77-4.68-15.19-7.93-6.81-15.09-14.52-22.57-21.85-5.31-5.2-7.31-11.37-4.98-18.55,2.25-6.93,7.24-10.86,14.38-11.96,11.89-1.82,23.82-3.35,35.65-5.46,2.38-.42,5.29-2.43,6.41-4.53,5.3-9.91,10.13-20.08,14.99-30.22,3.45-7.19,8.44-12.01,16.91-12.06,8.47-.05,13.55,4.62,17.03,11.85,4.79,9.96,9.91,19.77,14.6,29.78,1.56,3.34,3.41,5.02,7.26,5.47,10.98,1.28,21.88,3.17,32.84,4.62,7.92,1.05,14.21,4.29,16.81,12.26,2.65,8.15-.38,14.66-6.42,20.33-8.2,7.7-16.27,15.56-24.07,23.66-1.54,1.6-2.53,4.75-2.22,6.96,1.63,11.52,3.7,22.98,5.75,34.43,1.35,7.51-.25,13.96-6.51,18.65-6.45,4.83-13.24,4.64-20.21,.88-9.22-4.97-18.68-9.5-27.73-14.76-4.87-2.83-8.76-3.09-13.78-.14-9.52,5.6-19.39,10.63-29.31,15.51-12.27,6.03-25.67-2.03-25.83-17.14Zm3.86-78.65c6.3,6.48,11.56,12.71,17.66,17.97,8.26,7.12,11.04,15.28,8.43,25.91-1.95,7.95-2.83,16.16-4.38,25.41,8.93-4.65,16.85-8.3,24.27-12.77,8.46-5.09,16.27-4.7,24.6,.22,7.42,4.39,15.25,8.08,23.9,12.6-1.68-9.77-2.81-18.4-4.7-26.85-2.12-9.5,.31-16.89,7.61-23.42,6.42-5.75,12.04-12.4,18.42-19.08-9.35-1.4-18.47-3.02-27.65-4.07-8.34-.96-13.84-5.03-17.31-12.66-3.81-8.38-8.19-16.5-12.86-25.79-4.76,9.61-9.05,18.01-13.09,26.54-3.27,6.9-8.41,10.8-16.05,11.77-9.4,1.19-18.76,2.74-28.86,4.25Z"
                />
              </g>
            </g>
          </g>
        </svg>
      ),
      iconactive: "",
      text: t("menu.Puntos_por_ventas"),
    },
    {
      page: "/howtowin",
      icon: (
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.25 5.25v5.166c0 3.721 2.981 6.806 6.703 6.834a6.748 6.748 0 0 0 6.797-6.75V5.25A.75.75 0 0 0 18 4.5H6a.75.75 0 0 0-.75.75Z" />
          <path d="M9 21h6" />
          <path d="M12 17.25V21" />
          <path d="M18.581 12h.919a3 3 0 0 0 3-3V7.5a.75.75 0 0 0-.75-.75h-3" />
          <path d="M5.437 12H4.49a3 3 0 0 1-3-3V7.5a.75.75 0 0 1 .75-.75h3" />
        </svg>
      ),
      iconactive: "",
      text: t("dashboard.htw"),
    },
    {
      page: "/digipointsall",
      icon: (
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.25v19.5" />
          <path d="M17.25 8.25A3.75 3.75 0 0 0 13.5 4.5h-3.375a3.75 3.75 0 0 0 0 7.5h4.125a3.75 3.75 0 0 1 0 7.5h-4.5A3.75 3.75 0 0 1 6 15.75" />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Digipoints"),
    },
    {
      page: "/promociones",
      icon: (
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m11.503 2.428-7.566 1.51-1.509 7.565a.75.75 0 0 0 .206.675l9.788 9.787a.741.741 0 0 0 1.06 0l8.483-8.484a.74.74 0 0 0 0-1.06l-9.787-9.787a.75.75 0 0 0-.675-.206v0Z" />
          <path
            fill="#000000"
            stroke="none"
            d="M7.875 9.375a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
          />
        </svg>
      ),
      iconactive: "",
      text: "Promociones",
    },
    {
      page: "/productos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="30"
          height="30"
          viewBox="0 0 37 33"
          stroke="#000000"
        >
          <image
            id="Capa_34"
            data-name="Capa 34"
            width="37"
            height="33"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAhCAYAAABeD2IVAAAABHNCSVQICAgIfAhkiAAAAzBJREFUWEftmFmIT1Ecx41d1kEpZC8voijKmqJ5EVKKBw+SoSwp24MH44FQ5ImSyJIYEqmhsZTI9kKiyIMHJEuW7NuMz+ffOfqb3Ov+Z6PMrU/n/O899/yWc+/5/u6/qLq6ulmBxwzGb4MW8DXl3uZcawObYUshNopq4dQ1DLSEE8Fokj0dHgv9YRi8y+pYoU71ZeJbMBUugdlIOlyCgXAZpsCVhnLKqK/DOLibwUi3EMQs2osZxueGxEx1pt/rD5F/5vogOATz4Ca0g6SH8gvXesMRWB4ymzbeeZ7Bc53qR2c7jAANJxnxvM9Se/gAPjNFKdE73pehQ8bxrRj3AFbolA/sYFgNH8NESbY01BrMQppD8f6s42MAy7ixWKc0sAD2pETdWJdGY6hSp97QmQvHGstyip3hXDsTnSrlx+F/wKmR+HC6yakMK9GUqQxJyg35JVPzOVGe9c6EcXGTrKrDPD+desski2FvLSbryD1LYTp8B0sVhXcdPK3FfFYVJ337VHHlZTao+k7uhqqMfAu/3XHNQJSg2E7mnFvJPrgBCvYqcIs5kOeUu784f2yVFVG6bJ2zDEp0Ss07CornI7DukZfwOrT2xY1W3TO79lX/8WCEsV66QP8h7AB10my6tJ2gOGD1YL9ruNaWtk+YozRWCaM4ofpXwB3oHiaxeugSbnYCDRhZrKN60L8N1lePwYidYwI8AbMSM2wgr8DgbA3Ycy/AZVd7F0F5dGoIP3ZCGVRCzUMR9kYjMnqxDLGEGQNqVn6mfJ4sgd+DmfXaJ/CxsK15GLwV7RLIyYwDLFcV5I1QyFuoZq4Biz4z4zJdhYOw4TfGk05ZoZoMX7hT+U7tDk5ZlGU9dGY/3Av0pC2BOXA86ySMG2CG6sspl9Wvm5lg37Sfg13g0mU96tWpaNSHPxZ9aZ9dSU42iFNZM9Lk1P+XqfWE/Ddqdb+8z4ObZ0Xcp4bywyphEyg3jX34kXsWFkKuRtcBNcy9RSlZCeqVH5INfWhcGfJ7byJMg/v5f3BM4sRWUJ/c+NL+vKgvZw1eEVcJ1oLqUJXvlGLrMvqfQl2qx0IddkWsGPzjJCfqPwAGrzdo6IXIDQAAAABJRU5ErkJggg=="
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Productos"),
    },
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
      page: "/cargaventas",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="30"
          height="30"
          viewBox="0 0 49 35"
          stroke="#000000"
        >
          <image
            id="Capa_35"
            data-name="Capa 35"
            width="49"
            height="35"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAjCAYAAAA9guKMAAAABHNCSVQICAgIfAhkiAAABP1JREFUWEfVmAmoVUUch31Zmi2mka0Gj8qtyFYsWuAhEdFCkmZKWljZRqWZRtmmttC+kVFq+qy0QjEVJSjBdjKjTCyI0EyKLEpLK1t9fV/MyHS69737Xsz1NvBxznnnvDvzm5n/b/4zdU1NTe0KZXeeL4SB0AH+KH5Q5Wcb2BFWwcPwUbH+uhIiBvHR47AM3oGtsEOVG55WZ/37wnnwClwL36YfFEXsxMsH4Hg4G77ajo1Pq3ZGXBUYGjp42/uiiF15cz/sD8NhUxtFtOf/DoF9YEf4AVbD9238vTr+zxkyAS6DN5sbiV14eS8cBMNgQysr7cH3l8PR4BRwZG2A81oBH8OLsACcJpUWO8X2jINL4e0cInYOPTSCqx2xAtbAevgF9oT6IG5vri+DQWqwVlKyi7CBk8Dptwiegg9gMziV5CdwVHrB6TASfoZL4N0KVGQV0ZUG3A3nwEPwSGhwbNdp3PSHuyCNh1N4vgmcckPgwxaEZBVhQ26B8TAZfg2Nsddt6PXQDxypGfBN0th67l8CHfD8cC2nJZuI46hxDrwOV8PG0AIXpjPBkfkujMChXJ1qt8KX4TsDvgGWwM1wD5QL9mwirNg5rWuklncwz4vhcxgdevhGrtdAHLHfgpDOXJ+EvnAWaAalShYR+1HTtNDLV3J1HYjlWG6WwwDQSi3dwan1NehKBnosxswsMNgdraqJOCqImMfVFV4bjcUGzwRdy1Ey19Gh9oI/wSmWTpvDeH4OZgeB6W/F38wyEg38+hS4I/SijUsrPIGHRjDnehCehRgzyad/37qwasuuLRpAqe+yiNB5psINYHAXA9JKnVaj4Ax4FXSxlUUFPNeDHfIpGPiOVLFkEXEStRgTOtB0+L1Exf7JdcSE7Towd9LFPil8a6rSCJrDnVAqX8siondo/FtcbwNX31ic+6eCDhUDfjD35mQ6kcLTeX8kz3PhPnB0S9lsFhFmu67O9qIL1ReJiMO5fw0mhm98dSI8AXFNiO5kwJuVar1uwty/lCpZRFiRmxTt0mB0asUp1Y37R8HF0N53cXOn2BPMQhUSjeDA8KyDXQzlgj+bCKeN/u6+4Vx4P+lC1xFdybXCDNeAvh0WQlzoHAUXzLHhO8WVK9lEWOHJ8DQYrFfAZ0krOnHvlHKHaIJY3BubtmutjuSEZgT4KqsIK7C3tUgbaZCbS8XSh5sjYD7EYHaU3Nhouc+AYloq2UXYANcC7dHt6Auga5leG/A6l3FiEuje3QA2vzLQXSy3tKSA91URYTu0XdeBBnC+K0DPNwZ2A0dgD3C9cG15voLGx0/aJMJg1TpLrZ7N1W0c6EL2uFfzJ/cWP8I6cBdnevGPI5cKxCjCnaMmUNEe20XHXrsgVF5BHf/6xL2CrmTl5k9aqhum/3IQZ+zpcBpIs6cd9ppbyWNgDLjiOjVaUzzZSIn/qxjFSVuKGy1N4CJ4L/2B4rmT3v8YuEHxWMSgtDe3d7FTnOJdwI2YKc22kopwl2VWGpU6/LUgwMaaTzklNQ/Nwmx3afh7uyhC9zAl8KVol6053KrWSJmX6Wq21wD3bHarIgxAA8bIdy/sEUwtF12vETzDMkYWK8IA9qTZ0wbj4f9QPK/SgLTysYowLX4DtC73x7USB+U6U3dz/fI41LOuboowh9f+1oI7sVqMhVSQIlxvzAQO8KoIc30zTUutC0jF2PHuPxb+BYQAvBlDS6fEAAAAAElFTkSuQmCC"
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Carga_de_Ventas"),
    },
    {
      page: "/reportes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="30"
          height="30"
          viewBox="0 0 51 42"
        >
          <image
            id="Capa_36"
            data-name="Capa 36"
            width="51"
            height="42"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAqCAYAAAAeeGN5AAAABHNCSVQICAgIfAhkiAAAAzJJREFUaEPtmVuITVEYx+1EEzVGMS+8ksiTKLfUvJBC0pQnBrkMTWSK8eBNQm7llsm4xpPiSUmJmpSaPGieTDSRiBFSZ5J0/P5a+3Scs+9nndl756z6d/bZe33f+v/Xt7611l7bGZewFIvFu5huSGgus6uO42yrwb7K1EnqDDHD2L4Cd2L6mET9C8bmEIKOxbT3rV6rmPuQ2ReHDJ3QQv2v4AFYDawJSlPMFoTMAQdtCUpVDFG9TqTOI2aPDUFZECMOF8GuWgWlLkb5RnSsCPIVQwNzaWd2QHL38uweQ2VnwgngHHaPy2zFRb5Wgpvy7eH3F/ee0aYmkKriKQYhp6i5PwLJfhwvj1CvVAXfTfwZAZPj2JXV/c71Otp9WmlfJYbGFks9OAHOglGfRl+ayOyNS4o2tNZM9LHr5P5RMNXj+Uzu3QDNiJkVRYxmFs0wTRj89CNqFs3Y60yYcPxq3TpD236jZjvPNcQl6Ee5P6/IBDpzjVMU0wGHa4ocYr41xFQOj8rI8F8JXQALwBXQTs8NhQ0rD79hw6z+kUHMB4g9B0vBR6BZ7jd4B6aEiNJUOwPxoxFyZkzEaAW/BAZBG8Q+m8VwM/+1uQwqX6h/SxUyIcYQWcTvkN+iFmXIZUZMFLJhdRpiTA811hmTH8P8prEDqP9sVp4LjHtNs+/D8sPreSZyBhKrIDcA2oFethYiaID7y7ieFiJshLr9mZmaIf0WMspBd2erd3ztCrR/Gh8iRu8pLQgqZCUy8yH0CDwEWyGm1V+LYCs/2vIHlQL1P2UmMknyI7M50xDj0QOZyJm8R+Y1AppBovUkQPx0nrUyIUzwyakO7lt/01yP07VmOrYVGNfPE512jpkY2+yj+iOn7EcmauO26/3XYrrpzZNgo+1eteRvBX50UBh81EQIdcr4Asyz1HA93XQxSeiwslRKL2cI0WbwNtCuV5/p3tSTSY2+12DfBroRdNr19VeMEaKTdw2tTVSQqMwWw1cdrq8GR+B7WGSdvAlxe9gcY+mAvceMpC6J0emjPmHvRqHOvXJV4H8AwsdBn8TovUOfMPpypeJfsgrGEom5zMWOHAtxqff+AbAJgHDSlXLuAAAAAElFTkSuQmCC"
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Reportes"),
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
          width={30}
          height={30}
          fill="#000000"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.5 2.25H6.75a3.01 3.01 0 0 0-3 3V21a.75.75 0 0 0 .75.75H18a.75.75 0 1 0 0-1.5H5.25a1.5 1.5 0 0 1 1.5-1.5H19.5a.75.75 0 0 0 .75-.75V3a.75.75 0 0 0-.75-.75Zm-2.25 9-2.4-1.8a.366.366 0 0 0-.45 0l-2.4 1.8v-7.5h5.25v7.5Z" />
        </svg>
      ),
      iconactive: "",
      text: "Herramientas administrativas",
    },
    {
      page: "/reglas",
      icon: (
        <svg
          width={30}
          height={30}
          fill="#000000"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.772 13.77a6.806 6.806 0 0 1-7.49 1.416L7.405 20.83c-.01.018-.028.028-.037.037a2.99 2.99 0 0 1-4.238 0 2.992 2.992 0 0 1 0-4.237l.038-.038 5.643-4.875a6.75 6.75 0 0 1 8.822-8.925.74.74 0 0 1 .441.544.75.75 0 0 1-.206.675l-3.647 3.647.347 1.772 1.772.346 3.646-3.646a.75.75 0 0 1 1.22.234 6.721 6.721 0 0 1-1.435 7.406Z" />
        </svg>
      ),
      iconactive: "",
      text: "Reglas",
    },
    {
      page: "/customercare",
      icon: (
        <svg
          width={30}
          height={30}
          fill="#000000"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m20.813 14.85-4.397-1.876a1.462 1.462 0 0 0-1.416.122l-2.353 1.566a7.172 7.172 0 0 1-3.3-3.282L10.903 9a1.49 1.49 0 0 0 .131-1.416L9.15 3.187a1.528 1.528 0 0 0-1.566-.9A5.269 5.269 0 0 0 3 7.499C3 14.943 9.056 21 16.5 21a5.268 5.268 0 0 0 5.212-4.584 1.528 1.528 0 0 0-.9-1.566Z" />
          <path d="M14.756 4.473a6.806 6.806 0 0 1 4.772 4.772.75.75 0 0 0 .722.563c.067 0 .133-.01.197-.028a.74.74 0 0 0 .525-.92 8.25 8.25 0 0 0-5.832-5.83.75.75 0 1 0-.384 1.443Z" />
          <path d="M13.978 7.368a3.788 3.788 0 0 1 2.653 2.653.74.74 0 0 0 .722.563.603.603 0 0 0 .188-.028.743.743 0 0 0 .534-.92 5.231 5.231 0 0 0-3.713-3.712.75.75 0 1 0-.384 1.444Z" />
        </svg>
      ),
      iconactive: "",
      text: "Customer Care",
    },
  ];
  const locationsPP = [
    {
      page: "/dashboard",
      icon: (
        <svg
          width="30"
          height="30"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 15V5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 .75.75V15"></path>
          <path d="M1.5 18.75h21"></path>
          <path d="M11.25 18.75V15h6v3.75"></path>
        </svg>
      ),
      iconactive: "",
      text: t("menu.Dashboard"),
    },
    {
      page: "/organizacion",
      icon: (
        <svg
          width={30}
          height={30}
          fill="#000000"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.5 19.5h-.75V9.75a1.5 1.5 0 0 0-1.5-1.5h-6v-4.5a1.5 1.5 0 0 0-1.5-1.5h-9a1.5 1.5 0 0 0-1.5 1.5V19.5H1.5a.75.75 0 1 0 0 1.5h21a.75.75 0 1 0 0-1.5Zm-11.25-6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 0 1 .75.75ZM6 6h3a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 6 6Zm0 9.75h3a.75.75 0 1 1 0 1.5H6a.75.75 0 1 1 0-1.5Zm8.25-6h6v9.75h-6V9.75Z" />
          <path d="M18 15.75h-1.5a.75.75 0 1 0 0 1.5H18a.75.75 0 1 0 0-1.5Z" />
          <path d="M16.5 13.5H18a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5Z" />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Participantes"),
    },
    {
      page: "/puntosporventas",
      icon: (
        <svg
          id="Capa_2"
          data-name="Capa 2"
          width={35}
          height={35}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1025.03 763.6"
          stroke="#000000"
        >
          <g id="Capa_1-2" data-name="Capa 1">
            <g id="_2cFvTj" data-name="2cFvTj">
              <g>
                <path
                  className="cls-1"
                  d="M168.47,413.51c15.11-1.46,29.96-2.98,44.82-4.31,31.89-2.85,63.66-7.35,95.83-6.11,49.49,1.91,96.51,13.85,142.16,32.82,72.59,30.16,145.49,59.56,218.39,88.96,14.63,5.9,24.39,16.03,31.08,30.61,8.04-2.23,16.01-4.44,23.98-6.66,74.97-20.87,149.89-41.91,224.92-62.54,33.23-9.14,65.87,10.29,73.72,43.12,6.56,27.41-6.7,54.75-33.05,67.6-30.7,14.97-61.5,29.75-92.26,44.62-71.65,34.63-143.3,69.24-214.94,103.89-47.94,23.19-96.33,23.72-145.44,3.63-79.22-32.41-158.54-64.56-237.86-96.73-32.09-13.01-64.92-14.05-98.28-5.59-9.22,2.34-18.47,4.61-27.83,6.27-4.95,.88-6.35,3.09-5.94,7.77,.69,7.85-1.42,15.04-6.33,21.26-6.14,7.78-14.22,11.89-24.14,12.06-8.15,.14-16.32-.16-24.46,.2-1.74,.08-4.23,1.74-4.95,3.32-6.11,13.49-16.43,20.23-31.16,20.27-20.58,.06-41.17,.12-61.75,.06-11-.03-14.98-4.18-14.98-15.25,0-108.94,0-217.88,0-326.82,0-11.62,3.67-15.3,15.34-15.33,20-.05,40.01,.13,60-.08,15.49-.17,26.35,6.37,32.61,20.67,.62,1.43,3,2.84,4.64,2.93,6.2,.34,12.42,.14,18.63,.14,21.78,0,31.65,7.57,37.23,29.23Zm-.61,215.86c1.09,.29,1.49,.53,1.82,.46,7.77-1.7,15.6-3.18,23.28-5.2,40.98-10.78,80.91-8.53,120.32,7.68,78.6,32.35,157.42,64.18,236.19,96.12,41.73,16.92,82.95,15.5,123.51-4.11,78.63-38.01,157.26-76.02,235.88-114.04,23.59-11.4,47.2-22.76,70.74-34.24,15.13-7.38,23.11-20.78,21.68-35.92-2.2-23.28-23.43-37.28-46.99-30.76-42.08,11.64-84.12,23.41-126.18,35.12-39.63,11.04-79.25,22.09-118.88,33.13-2.77,.77-5.16,1.22-5.89,5.14-6.32,34.35-36.57,53.06-69.93,43.05-40.33-12.1-80.53-24.63-120.78-36.99-23.55-7.23-47.12-14.42-70.64-21.76-6.78-2.12-10.17-8.29-8.45-14.47,1.82-6.51,8.12-9.83,15.19-7.97,1.13,.3,2.23,.67,3.34,1.01,62.51,19.18,125.02,38.38,187.54,57.52,17.38,5.32,33.71-2.5,39.3-18.48,4.82-13.78-1.73-31.59-19.04-38.51-76.4-30.55-152.51-61.82-228.71-92.86-48.74-19.85-99.36-29.45-151.93-26.14-34.66,2.18-69.2,6.32-103.82,9.22-5.8,.49-7.76,2-7.73,8.14,.25,59.8,.15,119.61,.16,179.41,0,1.87,0,3.75,0,5.43ZM23.88,694.29c18.63,0,36.85,.23,55.06-.13,5.83-.11,7.25-4.74,7.25-10.01-.05-96.7-.04-193.39-.06-290.09,0-7.12-2.7-9.87-9.79-9.92-12.04-.08-24.08-.02-36.11-.02-5.37,0-10.74,0-16.34,0v310.17Zm86.21-24.19c.89,.26,1.42,.56,1.96,.56,6.99,.05,13.97,.09,20.96,.08,9.21-.01,11.39-2.17,11.39-11.22,0-75.31,0-150.62-.01-225.93,0-5.82,.06-11.65-.03-17.47-.07-4.43-2.22-7.88-6.73-8.09-9.04-.41-18.11-.12-27.53-.12v262.18Z"
                />
                <path
                  className="cls-1"
                  d="M649.93,408.33c-112.72-.07-204.35-91.71-204.21-204.21C445.87,91.38,537.61-.28,650.02,0c113.01,.29,204.23,92.02,203.94,205.08-.29,111.87-92.08,203.31-204.04,203.24Zm-.74-23.56c99.77,.09,181.1-80.65,181.25-179.95,.16-100.01-80.47-180.92-180.54-181.16-99.19-.23-180.42,80.66-180.62,179.87-.2,99.7,80.65,181.15,179.91,181.24Z"
                />
                <path
                  className="cls-1"
                  d="M374.5,215.95c-5.24,0-10.49,.14-15.73-.03-7.58-.25-12.56-4.96-12.64-11.68-.08-6.59,5.03-11.68,12.5-11.83,10.87-.21,21.75-.22,32.62,.02,7.14,.16,12.23,5.14,12.37,11.39,.15,6.73-4.77,11.76-12.23,12.08-5.62,.24-11.26,.05-16.89,.05Z"
                />
                <path
                  className="cls-1"
                  d="M924.65,215.96c-5.42,0-10.84,.16-16.25-.04-7.45-.27-12.47-5.19-12.41-11.84,.06-6.41,4.92-11.44,12.05-11.62,11.21-.27,22.44-.28,33.66,.02,7.1,.19,11.82,5.33,11.75,11.81-.08,6.56-4.77,11.27-11.97,11.58-5.6,.24-11.22,.05-16.83,.05v.03Z"
                />
                <path
                  className="cls-1"
                  d="M390.78,109.91c4.03,2.32,7.21,3.45,9.46,5.58,7.86,7.45,15.48,15.16,23.01,22.95,5.25,5.42,5.3,12.21,.48,17.09-4.74,4.81-11.7,4.7-17.07-.57-7.88-7.71-15.65-15.54-23.36-23.42-3.74-3.83-5.21-8.76-2.24-13.23,2.21-3.33,6.22-5.47,9.73-8.39Z"
                />
                <path
                  className="cls-1"
                  d="M428.72,260.32c-2.33,4.09-3.43,7.32-5.57,9.57-7.44,7.86-15.16,15.47-22.94,23.01-5.34,5.18-12.34,5.24-17.06,.47-4.61-4.66-4.76-11.52,.15-16.65,7.76-8.1,15.73-16,23.77-23.83,3.8-3.7,8.76-5.18,13.24-2.18,3.34,2.23,5.52,6.2,8.4,9.6Z"
                />
                <path
                  className="cls-1"
                  d="M883.2,160c-2.99-2.31-6.92-4.23-9.16-7.37-2.93-4.09-2.28-9.22,1.23-12.9,8.41-8.81,17.02-17.46,25.93-25.77,4.34-4.05,11.14-3.22,15.29,.94,4.21,4.22,5.14,10.89,1.05,15.27-8.44,9.04-17.33,17.68-26.27,26.24-1.67,1.6-4.46,2.04-8.06,3.59Z"
                />
                <path
                  className="cls-1"
                  d="M883.29,247.89c4.02,2.16,7.13,3.11,9.24,5.1,8.02,7.57,15.81,15.4,23.5,23.31,5.25,5.39,5.29,12.3,.49,17.09-4.79,4.77-11.78,4.71-17.09-.48-7.9-7.7-15.67-15.54-23.4-23.42-3.77-3.84-5.14-8.79-2.25-13.26,2.17-3.36,6.18-5.53,9.51-8.35Z"
                />
                <path
                  className="cls-1"
                  d="M66.54,648.69c-.11,6.59-5.45,11.72-11.99,11.53-6.24-.18-11.4-5.41-11.43-11.59-.04-6.54,5.19-11.76,11.79-11.76,6.64,0,11.74,5.18,11.63,11.82Z"
                />
                <path
                  className="cls-1"
                  d="M800.92,204.31c-.39,84.05-68.26,151.49-151.95,150.96-83.76-.53-150.75-68.58-150.3-152.69,.44-82.76,68.96-150.01,152.31-149.5,82.9,.52,150.32,68.51,149.94,151.22Zm-278.7-.45c-.07,70.38,56.93,127.71,127.15,127.89,71.13,.18,127.89-56.92,127.96-128.74,.07-69.19-57.43-126.28-127.36-126.44-70.17-.16-127.68,57.14-127.76,127.29Z"
                />
                <path
                  className="cls-1"
                  d="M587.95,263.53c1.64-9.64,3.24-21.18,5.69-32.54,1.36-6.32,.47-10.77-4.68-15.19-7.93-6.81-15.09-14.52-22.57-21.85-5.31-5.2-7.31-11.37-4.98-18.55,2.25-6.93,7.24-10.86,14.38-11.96,11.89-1.82,23.82-3.35,35.65-5.46,2.38-.42,5.29-2.43,6.41-4.53,5.3-9.91,10.13-20.08,14.99-30.22,3.45-7.19,8.44-12.01,16.91-12.06,8.47-.05,13.55,4.62,17.03,11.85,4.79,9.96,9.91,19.77,14.6,29.78,1.56,3.34,3.41,5.02,7.26,5.47,10.98,1.28,21.88,3.17,32.84,4.62,7.92,1.05,14.21,4.29,16.81,12.26,2.65,8.15-.38,14.66-6.42,20.33-8.2,7.7-16.27,15.56-24.07,23.66-1.54,1.6-2.53,4.75-2.22,6.96,1.63,11.52,3.7,22.98,5.75,34.43,1.35,7.51-.25,13.96-6.51,18.65-6.45,4.83-13.24,4.64-20.21,.88-9.22-4.97-18.68-9.5-27.73-14.76-4.87-2.83-8.76-3.09-13.78-.14-9.52,5.6-19.39,10.63-29.31,15.51-12.27,6.03-25.67-2.03-25.83-17.14Zm3.86-78.65c6.3,6.48,11.56,12.71,17.66,17.97,8.26,7.12,11.04,15.28,8.43,25.91-1.95,7.95-2.83,16.16-4.38,25.41,8.93-4.65,16.85-8.3,24.27-12.77,8.46-5.09,16.27-4.7,24.6,.22,7.42,4.39,15.25,8.08,23.9,12.6-1.68-9.77-2.81-18.4-4.7-26.85-2.12-9.5,.31-16.89,7.61-23.42,6.42-5.75,12.04-12.4,18.42-19.08-9.35-1.4-18.47-3.02-27.65-4.07-8.34-.96-13.84-5.03-17.31-12.66-3.81-8.38-8.19-16.5-12.86-25.79-4.76,9.61-9.05,18.01-13.09,26.54-3.27,6.9-8.41,10.8-16.05,11.77-9.4,1.19-18.76,2.74-28.86,4.25Z"
                />
              </g>
            </g>
          </g>
        </svg>
      ),
      iconactive: "",
      text: t("menu.Puntos_por_ventas"),
    },
    {
      page: "/howtowin",
      icon: (
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.25 5.25v5.166c0 3.721 2.981 6.806 6.703 6.834a6.748 6.748 0 0 0 6.797-6.75V5.25A.75.75 0 0 0 18 4.5H6a.75.75 0 0 0-.75.75Z" />
          <path d="M9 21h6" />
          <path d="M12 17.25V21" />
          <path d="M18.581 12h.919a3 3 0 0 0 3-3V7.5a.75.75 0 0 0-.75-.75h-3" />
          <path d="M5.437 12H4.49a3 3 0 0 1-3-3V7.5a.75.75 0 0 1 .75-.75h3" />
        </svg>
      ),
      iconactive: "",
      text: t("dashboard.htw"),
    },
  ];
  const locationsPA = [
    {
      page: "/dashboard",
      icon: (
        <svg
          width="30"
          height="30"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 15V5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 .75.75V15"></path>
          <path d="M1.5 18.75h21"></path>
          <path d="M11.25 18.75V15h6v3.75"></path>
        </svg>
      ),
      iconactive: "",
      text: t("menu.Dashboard"),
    },
    {
      page: "/organizacion",
      icon: (
        <svg
          width={30}
          height={30}
          fill="#000000"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.5 19.5h-.75V9.75a1.5 1.5 0 0 0-1.5-1.5h-6v-4.5a1.5 1.5 0 0 0-1.5-1.5h-9a1.5 1.5 0 0 0-1.5 1.5V19.5H1.5a.75.75 0 1 0 0 1.5h21a.75.75 0 1 0 0-1.5Zm-11.25-6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 0 1 .75.75ZM6 6h3a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 6 6Zm0 9.75h3a.75.75 0 1 1 0 1.5H6a.75.75 0 1 1 0-1.5Zm8.25-6h6v9.75h-6V9.75Z" />
          <path d="M18 15.75h-1.5a.75.75 0 1 0 0 1.5H18a.75.75 0 1 0 0-1.5Z" />
          <path d="M16.5 13.5H18a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5Z" />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Participantes"),
    },
    {
      page: "/puntosporventas",
      icon: (
        <svg
          id="Capa_2"
          data-name="Capa 2"
          width={35}
          height={35}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1025.03 763.6"
          stroke="#000000"
        >
          <g id="Capa_1-2" data-name="Capa 1">
            <g id="_2cFvTj" data-name="2cFvTj">
              <g>
                <path
                  className="cls-1"
                  fill="#000000"
                  d="M168.47,413.51c15.11-1.46,29.96-2.98,44.82-4.31,31.89-2.85,63.66-7.35,95.83-6.11,49.49,1.91,96.51,13.85,142.16,32.82,72.59,30.16,145.49,59.56,218.39,88.96,14.63,5.9,24.39,16.03,31.08,30.61,8.04-2.23,16.01-4.44,23.98-6.66,74.97-20.87,149.89-41.91,224.92-62.54,33.23-9.14,65.87,10.29,73.72,43.12,6.56,27.41-6.7,54.75-33.05,67.6-30.7,14.97-61.5,29.75-92.26,44.62-71.65,34.63-143.3,69.24-214.94,103.89-47.94,23.19-96.33,23.72-145.44,3.63-79.22-32.41-158.54-64.56-237.86-96.73-32.09-13.01-64.92-14.05-98.28-5.59-9.22,2.34-18.47,4.61-27.83,6.27-4.95,.88-6.35,3.09-5.94,7.77,.69,7.85-1.42,15.04-6.33,21.26-6.14,7.78-14.22,11.89-24.14,12.06-8.15,.14-16.32-.16-24.46,.2-1.74,.08-4.23,1.74-4.95,3.32-6.11,13.49-16.43,20.23-31.16,20.27-20.58,.06-41.17,.12-61.75,.06-11-.03-14.98-4.18-14.98-15.25,0-108.94,0-217.88,0-326.82,0-11.62,3.67-15.3,15.34-15.33,20-.05,40.01,.13,60-.08,15.49-.17,26.35,6.37,32.61,20.67,.62,1.43,3,2.84,4.64,2.93,6.2,.34,12.42,.14,18.63,.14,21.78,0,31.65,7.57,37.23,29.23Zm-.61,215.86c1.09,.29,1.49,.53,1.82,.46,7.77-1.7,15.6-3.18,23.28-5.2,40.98-10.78,80.91-8.53,120.32,7.68,78.6,32.35,157.42,64.18,236.19,96.12,41.73,16.92,82.95,15.5,123.51-4.11,78.63-38.01,157.26-76.02,235.88-114.04,23.59-11.4,47.2-22.76,70.74-34.24,15.13-7.38,23.11-20.78,21.68-35.92-2.2-23.28-23.43-37.28-46.99-30.76-42.08,11.64-84.12,23.41-126.18,35.12-39.63,11.04-79.25,22.09-118.88,33.13-2.77,.77-5.16,1.22-5.89,5.14-6.32,34.35-36.57,53.06-69.93,43.05-40.33-12.1-80.53-24.63-120.78-36.99-23.55-7.23-47.12-14.42-70.64-21.76-6.78-2.12-10.17-8.29-8.45-14.47,1.82-6.51,8.12-9.83,15.19-7.97,1.13,.3,2.23,.67,3.34,1.01,62.51,19.18,125.02,38.38,187.54,57.52,17.38,5.32,33.71-2.5,39.3-18.48,4.82-13.78-1.73-31.59-19.04-38.51-76.4-30.55-152.51-61.82-228.71-92.86-48.74-19.85-99.36-29.45-151.93-26.14-34.66,2.18-69.2,6.32-103.82,9.22-5.8,.49-7.76,2-7.73,8.14,.25,59.8,.15,119.61,.16,179.41,0,1.87,0,3.75,0,5.43ZM23.88,694.29c18.63,0,36.85,.23,55.06-.13,5.83-.11,7.25-4.74,7.25-10.01-.05-96.7-.04-193.39-.06-290.09,0-7.12-2.7-9.87-9.79-9.92-12.04-.08-24.08-.02-36.11-.02-5.37,0-10.74,0-16.34,0v310.17Zm86.21-24.19c.89,.26,1.42,.56,1.96,.56,6.99,.05,13.97,.09,20.96,.08,9.21-.01,11.39-2.17,11.39-11.22,0-75.31,0-150.62-.01-225.93,0-5.82,.06-11.65-.03-17.47-.07-4.43-2.22-7.88-6.73-8.09-9.04-.41-18.11-.12-27.53-.12v262.18Z"
                />
                <path
                  className="cls-1"
                  d="M649.93,408.33c-112.72-.07-204.35-91.71-204.21-204.21C445.87,91.38,537.61-.28,650.02,0c113.01,.29,204.23,92.02,203.94,205.08-.29,111.87-92.08,203.31-204.04,203.24Zm-.74-23.56c99.77,.09,181.1-80.65,181.25-179.95,.16-100.01-80.47-180.92-180.54-181.16-99.19-.23-180.42,80.66-180.62,179.87-.2,99.7,80.65,181.15,179.91,181.24Z"
                />
                <path
                  className="cls-1"
                  d="M374.5,215.95c-5.24,0-10.49,.14-15.73-.03-7.58-.25-12.56-4.96-12.64-11.68-.08-6.59,5.03-11.68,12.5-11.83,10.87-.21,21.75-.22,32.62,.02,7.14,.16,12.23,5.14,12.37,11.39,.15,6.73-4.77,11.76-12.23,12.08-5.62,.24-11.26,.05-16.89,.05Z"
                />
                <path
                  className="cls-1"
                  d="M924.65,215.96c-5.42,0-10.84,.16-16.25-.04-7.45-.27-12.47-5.19-12.41-11.84,.06-6.41,4.92-11.44,12.05-11.62,11.21-.27,22.44-.28,33.66,.02,7.1,.19,11.82,5.33,11.75,11.81-.08,6.56-4.77,11.27-11.97,11.58-5.6,.24-11.22,.05-16.83,.05v.03Z"
                />
                <path
                  className="cls-1"
                  d="M390.78,109.91c4.03,2.32,7.21,3.45,9.46,5.58,7.86,7.45,15.48,15.16,23.01,22.95,5.25,5.42,5.3,12.21,.48,17.09-4.74,4.81-11.7,4.7-17.07-.57-7.88-7.71-15.65-15.54-23.36-23.42-3.74-3.83-5.21-8.76-2.24-13.23,2.21-3.33,6.22-5.47,9.73-8.39Z"
                />
                <path
                  className="cls-1"
                  d="M428.72,260.32c-2.33,4.09-3.43,7.32-5.57,9.57-7.44,7.86-15.16,15.47-22.94,23.01-5.34,5.18-12.34,5.24-17.06,.47-4.61-4.66-4.76-11.52,.15-16.65,7.76-8.1,15.73-16,23.77-23.83,3.8-3.7,8.76-5.18,13.24-2.18,3.34,2.23,5.52,6.2,8.4,9.6Z"
                />
                <path
                  className="cls-1"
                  d="M883.2,160c-2.99-2.31-6.92-4.23-9.16-7.37-2.93-4.09-2.28-9.22,1.23-12.9,8.41-8.81,17.02-17.46,25.93-25.77,4.34-4.05,11.14-3.22,15.29,.94,4.21,4.22,5.14,10.89,1.05,15.27-8.44,9.04-17.33,17.68-26.27,26.24-1.67,1.6-4.46,2.04-8.06,3.59Z"
                />
                <path
                  className="cls-1"
                  d="M883.29,247.89c4.02,2.16,7.13,3.11,9.24,5.1,8.02,7.57,15.81,15.4,23.5,23.31,5.25,5.39,5.29,12.3,.49,17.09-4.79,4.77-11.78,4.71-17.09-.48-7.9-7.7-15.67-15.54-23.4-23.42-3.77-3.84-5.14-8.79-2.25-13.26,2.17-3.36,6.18-5.53,9.51-8.35Z"
                />
                <path
                  className="cls-1"
                  d="M66.54,648.69c-.11,6.59-5.45,11.72-11.99,11.53-6.24-.18-11.4-5.41-11.43-11.59-.04-6.54,5.19-11.76,11.79-11.76,6.64,0,11.74,5.18,11.63,11.82Z"
                />
                <path
                  className="cls-1"
                  d="M800.92,204.31c-.39,84.05-68.26,151.49-151.95,150.96-83.76-.53-150.75-68.58-150.3-152.69,.44-82.76,68.96-150.01,152.31-149.5,82.9,.52,150.32,68.51,149.94,151.22Zm-278.7-.45c-.07,70.38,56.93,127.71,127.15,127.89,71.13,.18,127.89-56.92,127.96-128.74,.07-69.19-57.43-126.28-127.36-126.44-70.17-.16-127.68,57.14-127.76,127.29Z"
                />
                <path
                  className="cls-1"
                  d="M587.95,263.53c1.64-9.64,3.24-21.18,5.69-32.54,1.36-6.32,.47-10.77-4.68-15.19-7.93-6.81-15.09-14.52-22.57-21.85-5.31-5.2-7.31-11.37-4.98-18.55,2.25-6.93,7.24-10.86,14.38-11.96,11.89-1.82,23.82-3.35,35.65-5.46,2.38-.42,5.29-2.43,6.41-4.53,5.3-9.91,10.13-20.08,14.99-30.22,3.45-7.19,8.44-12.01,16.91-12.06,8.47-.05,13.55,4.62,17.03,11.85,4.79,9.96,9.91,19.77,14.6,29.78,1.56,3.34,3.41,5.02,7.26,5.47,10.98,1.28,21.88,3.17,32.84,4.62,7.92,1.05,14.21,4.29,16.81,12.26,2.65,8.15-.38,14.66-6.42,20.33-8.2,7.7-16.27,15.56-24.07,23.66-1.54,1.6-2.53,4.75-2.22,6.96,1.63,11.52,3.7,22.98,5.75,34.43,1.35,7.51-.25,13.96-6.51,18.65-6.45,4.83-13.24,4.64-20.21,.88-9.22-4.97-18.68-9.5-27.73-14.76-4.87-2.83-8.76-3.09-13.78-.14-9.52,5.6-19.39,10.63-29.31,15.51-12.27,6.03-25.67-2.03-25.83-17.14Zm3.86-78.65c6.3,6.48,11.56,12.71,17.66,17.97,8.26,7.12,11.04,15.28,8.43,25.91-1.95,7.95-2.83,16.16-4.38,25.41,8.93-4.65,16.85-8.3,24.27-12.77,8.46-5.09,16.27-4.7,24.6,.22,7.42,4.39,15.25,8.08,23.9,12.6-1.68-9.77-2.81-18.4-4.7-26.85-2.12-9.5,.31-16.89,7.61-23.42,6.42-5.75,12.04-12.4,18.42-19.08-9.35-1.4-18.47-3.02-27.65-4.07-8.34-.96-13.84-5.03-17.31-12.66-3.81-8.38-8.19-16.5-12.86-25.79-4.76,9.61-9.05,18.01-13.09,26.54-3.27,6.9-8.41,10.8-16.05,11.77-9.4,1.19-18.76,2.74-28.86,4.25Z"
                />
              </g>
            </g>
          </g>
        </svg>
      ),
      iconactive: "",
      text: t("menu.Puntos_por_ventas"),
    },
    {
      page: "/howtowin",
      icon: (
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.25 5.25v5.166c0 3.721 2.981 6.806 6.703 6.834a6.748 6.748 0 0 0 6.797-6.75V5.25A.75.75 0 0 0 18 4.5H6a.75.75 0 0 0-.75.75Z" />
          <path d="M9 21h6" />
          <path d="M12 17.25V21" />
          <path d="M18.581 12h.919a3 3 0 0 0 3-3V7.5a.75.75 0 0 0-.75-.75h-3" />
          <path d="M5.437 12H4.49a3 3 0 0 1-3-3V7.5a.75.75 0 0 1 .75-.75h3" />
        </svg>
      ),
      iconactive: "",
      text: t("dashboard.htw"),
    },
    {
      page: "/digipoints",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.147 10.2591L8.51502 6.01639C8.49053 5.95272 8.44732 5.89796 8.39108 5.85934C8.33485 5.82072 8.26823 5.80005 8.20002 5.80005C8.1318 5.80005 8.06518 5.82072 8.00895 5.85934C7.95272 5.89796 7.90951 5.95272 7.88502 6.01639L6.25301 10.2591C6.23606 10.3032 6.21005 10.3433 6.17665 10.3767C6.14325 10.4101 6.10322 10.4361 6.05914 10.453L1.81638 12.085C1.75271 12.1095 1.69795 12.1527 1.65933 12.209C1.62071 12.2652 1.60004 12.3318 1.60004 12.4C1.60004 12.4682 1.62071 12.5349 1.65933 12.5911C1.69795 12.6473 1.75271 12.6905 1.81638 12.715L6.05914 14.347C6.10322 14.364 6.14325 14.39 6.17665 14.4234C6.21005 14.4568 6.23606 14.4968 6.25301 14.5409L7.88502 18.7837C7.90951 18.8473 7.95272 18.9021 8.00895 18.9407C8.06518 18.9793 8.1318 19 8.20002 19C8.26823 19 8.33485 18.9793 8.39108 18.9407C8.44732 18.9021 8.49053 18.8473 8.51502 18.7837L10.147 14.5409C10.164 14.4968 10.19 14.4568 10.2234 14.4234C10.2568 14.39 10.2968 14.364 10.3409 14.347L14.5837 12.715C14.6473 12.6905 14.7021 12.6473 14.7407 12.5911C14.7793 12.5349 14.8 12.4682 14.8 12.4C14.8 12.3318 14.7793 12.2652 14.7407 12.209C14.7021 12.1527 14.6473 12.1095 14.5837 12.085L10.3409 10.453C10.2968 10.4361 10.2568 10.4101 10.2234 10.3767C10.19 10.3433 10.164 10.3032 10.147 10.2591ZM4.45001 2.95L3.70001 1L2.95 2.95L1 3.70001L2.95 4.45001L3.70001 6.40001L4.45001 4.45001L6.40001 3.70001L4.45001 2.95ZM16.4002 4.79988L15.4 2.2L14.3999 4.79988L11.8 5.80001L14.3999 6.80014L15.4 9.40002L16.4002 6.80014L19 5.80001L16.4002 4.79988Z"
            stroke="black"
            stroke-width="1.03964"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.DDigipoints"),
    },
    {
      page: "/productos",
      icon: (
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.375 0.6875H2.625C2.17745 0.6875 1.74822 0.86529 1.43176 1.18176C1.11529 1.49822 0.9375 1.92745 0.9375 2.375V15.3125L6 10.8125L11.0625 15.3125V2.375C11.0625 1.92745 10.8847 1.49822 10.5682 1.18176C10.2518 0.86529 9.82255 0.6875 9.375 0.6875Z"
            stroke="black"
            stroke-width="1.125"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Productos"),
    },
  ];

  const locationsVendedor = [
    {
      page: "/dashboard",
      icon: (
        <svg
          width="30"
          height="30"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 15V5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 .75.75V15"></path>
          <path d="M1.5 18.75h21"></path>
          <path d="M11.25 18.75V15h6v3.75"></path>
        </svg>
      ),
      iconactive: "",
      text: t("menu.Dashboard"),
    },
    {
      page: "/howtowin",
      icon: (
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.25 5.25v5.166c0 3.721 2.981 6.806 6.703 6.834a6.748 6.748 0 0 0 6.797-6.75V5.25A.75.75 0 0 0 18 4.5H6a.75.75 0 0 0-.75.75Z" />
          <path d="M9 21h6" />
          <path d="M12 17.25V21" />
          <path d="M18.581 12h.919a3 3 0 0 0 3-3V7.5a.75.75 0 0 0-.75-.75h-3" />
          <path d="M5.437 12H4.49a3 3 0 0 1-3-3V7.5a.75.75 0 0 1 .75-.75h3" />
        </svg>
      ),
      iconactive: "",
      text: t("dashboard.htw"),
    },
    {
      page: "/digipoints",
      icon: (
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.25v19.5" />
          <path d="M17.25 8.25A3.75 3.75 0 0 0 13.5 4.5h-3.375a3.75 3.75 0 0 0 0 7.5h4.125a3.75 3.75 0 0 1 0 7.5h-4.5A3.75 3.75 0 0 1 6 15.75" />
        </svg>
      ),
      iconactive: "",
      text: "DigiPoints",
    },
    {
      page: "/productos",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="30"
          height="30"
          viewBox="0 0 37 33"
        >
          <image
            id="Capa_34"
            data-name="Capa 34"
            width="37"
            height="33"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAhCAYAAABeD2IVAAAABHNCSVQICAgIfAhkiAAAAzBJREFUWEftmFmIT1Ecx41d1kEpZC8voijKmqJ5EVKKBw+SoSwp24MH44FQ5ImSyJIYEqmhsZTI9kKiyIMHJEuW7NuMz+ffOfqb3Ov+Z6PMrU/n/O899/yWc+/5/u6/qLq6ulmBxwzGb4MW8DXl3uZcawObYUshNopq4dQ1DLSEE8Fokj0dHgv9YRi8y+pYoU71ZeJbMBUugdlIOlyCgXAZpsCVhnLKqK/DOLibwUi3EMQs2osZxueGxEx1pt/rD5F/5vogOATz4Ca0g6SH8gvXesMRWB4ymzbeeZ7Bc53qR2c7jAANJxnxvM9Se/gAPjNFKdE73pehQ8bxrRj3AFbolA/sYFgNH8NESbY01BrMQppD8f6s42MAy7ixWKc0sAD2pETdWJdGY6hSp97QmQvHGstyip3hXDsTnSrlx+F/wKmR+HC6yakMK9GUqQxJyg35JVPzOVGe9c6EcXGTrKrDPD+desski2FvLSbryD1LYTp8B0sVhXcdPK3FfFYVJ337VHHlZTao+k7uhqqMfAu/3XHNQJSg2E7mnFvJPrgBCvYqcIs5kOeUu784f2yVFVG6bJ2zDEp0Ss07CornI7DukZfwOrT2xY1W3TO79lX/8WCEsV66QP8h7AB10my6tJ2gOGD1YL9ruNaWtk+YozRWCaM4ofpXwB3oHiaxeugSbnYCDRhZrKN60L8N1lePwYidYwI8AbMSM2wgr8DgbA3Ycy/AZVd7F0F5dGoIP3ZCGVRCzUMR9kYjMnqxDLGEGQNqVn6mfJ4sgd+DmfXaJ/CxsK15GLwV7RLIyYwDLFcV5I1QyFuoZq4Biz4z4zJdhYOw4TfGk05ZoZoMX7hT+U7tDk5ZlGU9dGY/3Av0pC2BOXA86ySMG2CG6sspl9Wvm5lg37Sfg13g0mU96tWpaNSHPxZ9aZ9dSU42iFNZM9Lk1P+XqfWE/Ddqdb+8z4ObZ0Xcp4bywyphEyg3jX34kXsWFkKuRtcBNcy9RSlZCeqVH5INfWhcGfJ7byJMg/v5f3BM4sRWUJ/c+NL+vKgvZw1eEVcJ1oLqUJXvlGLrMvqfQl2qx0IddkWsGPzjJCfqPwAGrzdo6IXIDQAAAABJRU5ErkJggg=="
          />
        </svg>
      ),
      iconactive: "",
      text: t("menu.Productos"),
    },
  ];

  const redirection = (tyc) => {
    if (!tyc) {
      return router.push("/terminosycondiciones");
    }

    if (location === "/terminosycondiciones") {
      return router.push("/dashboard");
    }
  };

  const href = (page) => {
    router.push(page);
  };

  const logout = () => {
    dispatch(setInitialStateAwards());
    dispatch(setInitialStateCompany());
    dispatch(setInitialStateOrders());
    dispatch(setInitialStateTeams());
    dispatch(setInitialStateSales());
    dispatch(setInitialStateUser());

    dispatch(changeLoadingData(true));
    window.sessionStorage.removeItem("infoDt");
    Cookies.remove("dp");
    router.push("/");
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return <ModalFormCustomer />;
    }
  }, [modal, opened]);

  const menu = useMemo(() => {
    if (userRedux?.roleId === 1) {
      return locations
        .filter(({ page }) => {
          if (userRedux.email.split("@")[1] === "adobe.com") {
            return ![
              "/digipointsall",
              "/reportTyC",
              "/premios",
              "/cargaventas",
              "/reglas",
              "/herramientas",
              "/customercare",
            ].includes(page);
          }

          return page;
        })
        .map(({ icon, page, text }, index) => {
          return (
            <div className="containerItemLayout" key={index}>
              <div
                className={
                  window.location.pathname === page
                    ? "itemLayoutSelect"
                    : "itemLayout"
                }
                key={index}
                onClick={() => href(page)}
              >
                {icon}
                <p>{text}</p>
              </div>
            </div>
          );
        });
    } else if (userRedux?.roleId === 2) {
      return locationsPP.map(({ icon, page, text }, index) => {
        return (
          <div className="containerItemLayout" key={index}>
            <div
              className={
                window.location.pathname === page
                  ? "itemLayoutSelect"
                  : "itemLayout"
              }
              key={index}
              onClick={() => href(page)}
            >
              {icon}
              <p>{text}</p>
            </div>
          </div>
        );
      });
    } else if (userRedux?.roleId === 3) {
      return locationsPA.map(({ icon, page, text }, index) => {
        return (
          <div className="containerItemLayout" key={index}>
            <div
              className={
                window.location.pathname === page
                  ? "itemLayoutSelect"
                  : "itemLayout"
              }
              key={index}
              onClick={() => href(page)}
            >
              {icon}
              <p>{text}</p>
            </div>
          </div>
        );
      });
    } else if (userRedux?.roleId === 5) {
      return locationsVendedor.map(({ icon, page, text }, index) => {
        return (
          <div className="containerItemLayout" key={index}>
            <div
              className={
                window.location.pathname === page
                  ? "itemLayoutSelect"
                  : "itemLayout"
              }
              key={index}
              onClick={() => href(page)}
            >
              {icon}
              <p>{text}</p>
            </div>
          </div>
        );
      });
    }
  }, [locations, locationsVendedor, userRedux, locationsPA, locationsPP]);

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
        onClose={() => setOpened(false)}
        size={"80%"}
        centered
      >
        {typeModal}
      </Modal>
      <div className="containerGlobal">
        <div className="globalContent bg-primary">
          <div className="containerLayout">
            <div className="flex flex-col px-4">
              <div className="flex flex-col gap-[1.375rem]">
                <div
                  className="logoAdobe cursor-pointer"
                  onClick={() => router.push("/dashboard")}
                >
                  <figure className="flex">
                    <img
                      src="/assets/dashboard/logoapc.webp"
                      alt="apc_canales"
                    ></img>
                  </figure>
                </div>
                <div>
                  <figure className="flex">
                    <img
                      src="/assets/dashboard/years.webp"
                      className="w-full"
                      alt="logo_10_años_adobe"
                    ></img>
                  </figure>
                </div>
                <div className="flex p-3 bg-base-100 border-[1px] border-[#E0E0E0] rounded-[10px]">
                  <div className="flex flex-col w-full gap-6">
                    <div className="flex gap-3 items-center">
                      <svg
                        width="43"
                        height="43"
                        viewBox="0 0 43 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="21.5" cy="21.5" r="21.5" fill="#FFEEED" />
                        <path
                          d="M20.001 36C19.764 36.0012 19.5323 35.93 19.3368 35.796C19.1413 35.662 18.9914 35.4716 18.907 35.2501L17.0397 30.3944C17.0019 30.2965 16.9441 30.2076 16.8699 30.1335C16.7957 30.0593 16.7068 30.0014 16.609 29.9636L11.7519 28.0949C11.5306 28.01 11.3403 27.86 11.2061 27.6647C11.0719 27.4694 11 27.238 11 27.001C11 26.764 11.0719 26.5326 11.2061 26.3373C11.3403 26.142 11.5306 25.992 11.7519 25.907L16.6076 24.0397C16.7054 24.0019 16.7943 23.9441 16.8685 23.8699C16.9427 23.7957 17.0005 23.7069 17.0383 23.609L18.907 18.7519C18.9919 18.5306 19.142 18.3403 19.3373 18.2061C19.5326 18.0719 19.764 18 20.001 18C20.238 18 20.4694 18.0719 20.6647 18.2061C20.86 18.3403 21.01 18.5306 21.0949 18.7519L22.9622 23.6076C23 23.7055 23.0579 23.7943 23.132 23.8685C23.2062 23.9427 23.2951 24.0005 23.3929 24.0383L28.2205 25.8958C28.4508 25.9811 28.6491 26.1354 28.7886 26.3375C28.9281 26.5396 29.0019 26.7798 29 27.0254C28.9964 27.2582 28.923 27.4846 28.7893 27.6753C28.6556 27.866 28.4677 28.0122 28.25 28.0949L23.3943 29.9622C23.2965 30 23.2076 30.0579 23.1335 30.1321C23.0593 30.2062 23.0014 30.2951 22.9636 30.3929L21.0949 35.2501C21.0106 35.4716 20.8606 35.662 20.6652 35.796C20.4697 35.93 20.238 36.0012 20.001 36Z"
                          fill="#EB1000"
                        />
                        <path
                          d="M30 24C29.8267 23.9999 29.6576 23.9474 29.5148 23.8493C29.372 23.7512 29.2622 23.6121 29.2001 23.4504L27.9764 20.2699C27.9548 20.2139 27.9218 20.163 27.8793 20.1205C27.8369 20.0781 27.786 20.045 27.7299 20.0235L24.549 18.8C24.3874 18.7377 24.2485 18.628 24.1505 18.4852C24.0525 18.3424 24 18.1733 24 18.0002C24 17.827 24.0525 17.6579 24.1505 17.5151C24.2485 17.3724 24.3874 17.2626 24.549 17.2004L27.7299 15.9768C27.786 15.9553 27.8369 15.9222 27.8793 15.8798C27.9218 15.8373 27.9548 15.7864 27.9764 15.7304L29.191 12.5724C29.2464 12.4231 29.3413 12.2916 29.4656 12.1919C29.5898 12.0922 29.7388 12.028 29.8966 12.0062C30.0862 11.9833 30.2781 12.0243 30.4417 12.1228C30.6054 12.2213 30.7315 12.3716 30.7999 12.5499L32.0236 15.7304C32.0452 15.7864 32.0782 15.8373 32.1207 15.8798C32.1631 15.9222 32.214 15.9553 32.2701 15.9768L35.451 17.2004C35.6126 17.2626 35.7515 17.3724 35.8495 17.5151C35.9475 17.6579 36 17.827 36 18.0002C36 18.1733 35.9475 18.3424 35.8495 18.4852C35.7515 18.628 35.6126 18.7377 35.451 18.8L32.2701 20.0235C32.214 20.045 32.1631 20.0781 32.1207 20.1205C32.0782 20.163 32.0452 20.2139 32.0236 20.2699L30.7999 23.4504C30.7378 23.6121 30.628 23.7512 30.4852 23.8493C30.3424 23.9474 30.1733 23.9999 30 24Z"
                          fill="#FFC8C5"
                        />
                        <path
                          d="M14.5 19C14.3484 19 14.2004 18.9541 14.0754 18.8682C13.9504 18.7824 13.8544 18.6608 13.7999 18.5193L12.9378 16.2775C12.9191 16.2284 12.8902 16.1839 12.8531 16.1468C12.816 16.1097 12.7715 16.0809 12.7225 16.0622L10.4806 15.2C10.3391 15.1455 10.2175 15.0495 10.1317 14.9245C10.0459 14.7995 10 14.6515 10 14.4999C10 14.3483 10.0459 14.2003 10.1317 14.0754C10.2175 13.9504 10.3391 13.8543 10.4806 13.7999L12.7225 12.9377C12.7714 12.9189 12.8159 12.89 12.853 12.853C12.8901 12.8159 12.919 12.7714 12.9378 12.7224L13.7923 10.5005C13.8404 10.3697 13.9234 10.2545 14.0321 10.1673C14.1409 10.0801 14.2713 10.0241 14.4095 10.0055C14.5754 9.98532 14.7432 10.0211 14.8864 10.1072C15.0296 10.1932 15.14 10.3246 15.2001 10.4805L16.0623 12.7224C16.081 12.7714 16.1099 12.8159 16.147 12.853C16.1841 12.89 16.2286 12.9189 16.2775 12.9377L18.5194 13.7999C18.6609 13.8543 18.7825 13.9504 18.8683 14.0754C18.9541 14.2003 19 14.3483 19 14.4999C19 14.6515 18.9541 14.7995 18.8683 14.9245C18.7825 15.0495 18.6609 15.1455 18.5194 15.2L16.2775 16.0622C16.2285 16.0809 16.184 16.1097 16.1469 16.1468C16.1098 16.1839 16.0809 16.2284 16.0623 16.2775L15.2001 18.5193C15.1456 18.6608 15.0496 18.7824 14.9246 18.8682C14.7996 18.9541 14.6516 19 14.5 19Z"
                          fill="#FFC8C5"
                        />
                      </svg>
                      <div>
                        <p className="!text-2xl font-bold">1000</p>
                        <p className="text-xs 2xl:text-base">
                          Digipoints acumulados
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn btn-info !btn-outline w-full"
                      onClick={() => {
                        router.push("/catalogo");
                      }}
                    >
                      Ver catálogo de premios
                    </button>
                  </div>
                </div>
              </div>
              <div className="containerRedirections gap-2">{menu}</div>
            </div>
          </div>
          <span className="h-screen barra"></span>
          <div className="w-[82%]">
            <div className="containerNavbar">
              <div className="navbar">
                <figure>
                  <img src="/assets/dashboard/years.webp" />
                </figure>
                <div className="flex">
                  <div className="digipoints">
                    <button
                      onClick={() => {
                        if (location === "/digipoints") {
                          return;
                        }

                        router.push("/digipoints");
                      }}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>{" "}
                      <strong>
                        {typeof digipoints?.assigned_points !== "undefined" &&
                        typeof digipoints?.cart_points !== "undefined"
                          ? digipoints?.assigned_points -
                            digipoints?.cart_points
                          : typeof digipoints?.assigned_points !== "undefined"
                          ? digipoints?.assigned_points
                          : 0}
                      </strong>{" "}
                      <strong className="text-digi-desk">- DIGIPOINTS</strong>{" "}
                      <strong className="text-digi-mobi">- DGS</strong>
                    </button>
                  </div>
                  <div className="infomations none">
                    <svg
                      width={30}
                      height={30}
                      fill="#d9d9d9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.256 16.594a8.99 8.99 0 1 1 3.15 3.15v0l-3.112.882a.74.74 0 0 1-.919-.92l.881-3.112Z"></path>
                    </svg>
                    <svg
                      width={30}
                      height={30}
                      fill="#d9d9d9"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.769 9.769 0 0 0 12 2.25ZM12 18a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 18Zm.75-4.584v.084a.75.75 0 1 1-1.5 0v-.75A.75.75 0 0 1 12 12a1.875 1.875 0 1 0-1.875-1.875.75.75 0 1 1-1.5 0 3.375 3.375 0 1 1 4.125 3.29Z"></path>
                    </svg>
                  </div>
                  <div className="notifications">
                    <div
                      className="shoopingMarket cursor-pointer"
                      onClick={() => {
                        router.push("/shoppingCar");
                      }}
                    >
                      <svg
                        width={35}
                        height={35}
                        fill="#ffffff"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m20.99 6.131-1.143 6.272a2.25 2.25 0 0 1-2.213 1.847H6.76l.413 2.25H17.25A2.25 2.25 0 1 1 15 18.75c0-.256.044-.51.131-.75H9.62a2.25 2.25 0 1 1-3.825-.712L3.197 3H1.5a.75.75 0 0 1 0-1.5h1.697a1.5 1.5 0 0 1 1.472 1.228l.46 2.522H20.25a.74.74 0 0 1 .572.272.722.722 0 0 1 .169.61Z" />
                      </svg>
                      <p className="none">1</p>
                    </div>
                    <div
                      className="shoopingMarket cursor-pointer"
                      onClick={() => {
                        setModal(0);
                        setOpened(true);
                      }}
                    >
                      <svg
                        width={30}
                        height={30}
                        fill="#ffffff"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.769 9.769 0 0 0 12 2.25ZM12 18a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 18Zm.75-4.584v.084a.75.75 0 1 1-1.5 0v-.75A.75.75 0 0 1 12 12a1.875 1.875 0 1 0-1.875-1.875.75.75 0 1 1-1.5 0 3.375 3.375 0 1 1 4.125 3.29Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="userDrop">
                    <div className="menumobile">
                      <MobileMenu
                        className="bannerMob"
                        locations={locations}
                        locationsPP={locationsPP}
                        locationsPA={locationsPA}
                        locationsVendedor={locationsVendedor}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="user min-w-[34px]">
                        <Menu trigger="hover" openDelay={100} closeDelay={400}>
                          <Menu.Target>
                            <div className="userPreMenu flex">
                              {userRedux.profilePhotoPath !== null &&
                              userRedux.profilePhotoPath !== "noImage" &&
                              userRedux.profilePhotoPath !== "" &&
                              userRedux.profilePhotoPath !== undefined ? (
                                <figure>
                                  <img src={userRedux.profilePhotoPath} />
                                </figure>
                              ) : (
                                <svg
                                  width={30}
                                  height={30}
                                  fill="#2c2c2c"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 15.375a4.125 4.125 0 1 0 0-8.25 4.125 4.125 0 0 0 0 8.25Z" />
                                  <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.769 9.769 0 0 0 12 2.25Zm6.169 15.225a7.624 7.624 0 0 0-2.297-2.156 5.597 5.597 0 0 1-7.744 0 7.622 7.622 0 0 0-2.297 2.156 8.25 8.25 0 1 1 12.338 0Z" />
                                </svg>
                              )}
                            </div>
                          </Menu.Target>

                          <Menu.Dropdown>
                            <Menu.Item>
                              <div
                                className="buttonLayoutDropdown"
                                onClick={() => {
                                  router.push(`/user/${userRedux?.names}`);
                                }}
                              >
                                <p>Ver Perfil</p>
                              </div>
                            </Menu.Item>
                            <Menu.Item onClick={() => logout()}>
                              <div className="buttonLayoutDropdown">
                                <p>{t("menu.salir")}</p>
                              </div>
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </div>
                      <div className="username">
                        <p>{userRedux?.names}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
