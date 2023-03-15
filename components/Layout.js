import { useMemo } from "react";
import { Menu, Modal } from "@mantine/core";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingUser,
  setDigipoints,
  userLogin,
  userToken,
} from "../store/reducers/users.reducer";
import MobileMenu from "./MobileMenu";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { changeLoadingData } from "../store/reducers/loading.reducer";

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
        .then((res1) => {
          axios
            .get(
              `${process.env.BACKURL}/reporters/digipoints-redeem-status/2/1/${userGetData?.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  Authorization: `Bearer ${userGetData?.token}`,
                },
              }
            )
            .then((res2) => {
              dispatch(userLogin(res1.data));
              dispatch(userToken(userGetData.token));
              language(res1.data.person[0].languageId);
              redirection(res1.data.policy);

              const [digipoints] = res2.data;
              if (res2.data.length === 0) {
                dispatch(
                  setDigipoints({
                    assigned_points: 0,
                    cart_points: 0,
                  })
                );
              } else {
                dispatch(setDigipoints(digipoints));
              }

              dispatch(loadingUser(true));
            });
        });
    } else {
      if (userRedux !== 0) {
        redirection(userRedux.policy);
        language(userRedux?.person[0]?.languageId);
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
          stroke="#fff"
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
      page: "/participantes",
      icon: (
        <svg
          width="30"
          height="30"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.25 15a4.875 4.875 0 1 0 0-9.75 4.875 4.875 0 0 0 0 9.75Z"></path>
          <path d="M14.568 5.428a5.093 5.093 0 0 1 1.322-.178 4.875 4.875 0 1 1 0 9.75"></path>
          <path d="M1.5 18.507a8.25 8.25 0 0 1 13.5 0"></path>
          <path d="M15.89 15a8.241 8.241 0 0 1 6.75 3.506"></path>
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
      page: "/digipoints",
      icon: (
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#fff"
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
    {
      page: "/premios",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="30"
          height="30"
          viewBox="0 0 36 41"
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
  ];
  const locationsPP = [
    {
      page: "/dashboard",
      icon: (
        <svg
          width="30"
          height="30"
          fill="none"
          stroke="#fff"
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
      page: "/participantes",
      icon: (
        <svg
          width="30"
          height="30"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.25 15a4.875 4.875 0 1 0 0-9.75 4.875 4.875 0 0 0 0 9.75Z"></path>
          <path d="M14.568 5.428a5.093 5.093 0 0 1 1.322-.178 4.875 4.875 0 1 1 0 9.75"></path>
          <path d="M1.5 18.507a8.25 8.25 0 0 1 13.5 0"></path>
          <path d="M15.89 15a8.241 8.241 0 0 1 6.75 3.506"></path>
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
  ];
  const locationsPA = [
    {
      page: "/dashboard",
      icon: (
        <svg
          width="30"
          height="30"
          fill="none"
          stroke="#fff"
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
      page: "/participantes",
      icon: (
        <svg
          width="30"
          height="30"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.25 15a4.875 4.875 0 1 0 0-9.75 4.875 4.875 0 0 0 0 9.75Z"></path>
          <path d="M14.568 5.428a5.093 5.093 0 0 1 1.322-.178 4.875 4.875 0 1 1 0 9.75"></path>
          <path d="M1.5 18.507a8.25 8.25 0 0 1 13.5 0"></path>
          <path d="M15.89 15a8.241 8.241 0 0 1 6.75 3.506"></path>
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
      page: "/digipoints",
      icon: (
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#fff"
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
      text: t("menu.DDigipoints"),
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
    {
      page: "/premios",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="30"
          height="30"
          viewBox="0 0 36 41"
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
  ];

  const locationsVendedor = [
    {
      page: "/dashboard",
      icon: (
        <svg
          width="30"
          height="30"
          fill="none"
          stroke="#fff"
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
      page: "/digipoints",
      icon: (
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#fff"
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
    dispatch(changeLoadingData(true));
    router.push(page);
  };

  const logout = () => {
    dispatch(changeLoadingData(true));
    window.sessionStorage.removeItem("infoDt");
    Cookies.remove("dp");
    router.push("/");
  };

  const menu = useMemo(() => {
    if (userRedux?.roleId === 1) {
      return locations.map(({ icon, page, text }, index) => {
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
          <div className="fixed h-screen w-screen flex items-center justify-center z-50 bg-[rgba(255,255,255,0.8)]">
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
        <div className="fixed h-screen w-screen flex items-center justify-center z-50 bg-[rgba(255,255,255,0.8)]">
          <div className="spinner"></div>
        </div>
      )}
      <div className="containerGlobal">
        <div className="globalContent bg-primary">
          <div className="containerLayout">
            <div className="mt-10 flex flex-col h-[80%]">
              <div className="logoAdobe">
                <figure className="flex">
                  <img src="/assets/dashboard/logoapc.png"></img>
                </figure>
              </div>
              <div className="containerRedirections">{menu}</div>
            </div>
            {userRedux?.roleId !== 2 && (
              <div
                className="adobeMarket z-10"
                onClick={() => {
                  dispatch(changeLoadingData(true));
                  router.push("/adobeMarket");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="30"
                  height="30"
                  viewBox="0 0 45 42"
                >
                  <image
                    id="Capa_33"
                    data-name="Capa 33"
                    width="45"
                    height="42"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAqCAYAAAAnH9IiAAAABHNCSVQICAgIfAhkiAAABTpJREFUWEfNmXuIVVUUh2eKyt5vexk9DCoSckR7QTVpREWRURlZ1vQUzeqPFLSHIhFUZKLZ255qaaFRRNjLrLAHFUn6TxZqKplOWWHZS7Pvk72HM3fOzD1nvOdwN/zY++6zz96/vc9aa6+1bmPrPg3nNTQ0PAn+BS8ErKX+E9RlaYT0AzAbU8HuFX7PAJ+DDeCfemIv6d4QmgDOBL3ADgmCK2g/A54Hq+uFuKRj6UfjEtAMbPdIkJT4reCPeiCeJB359KRxbsBF1LuBb8AQ8HW9ko68/AbTwJVAJXUjCypIN/J7l/B8S1kbSjvp5Not/Hg2dFxBPTvxsC/tx8B/YDNQWa3F3wEbqf8CWiJFa1MY93vo91nsc6zj7HNsbHcwAtVIn8PLbwWid1PfF0jZdRe4J7nDKm2/RIQbs+2G0/ric5/Fthv9DkyrRro/g94AB4GXwCigCbQcB1RQLY4isneot4bnik4RZU410kex6kxwGvgKXAy+TzCRrOQ0k5LdCWh19gIq8K6hbd/uYM+wsT3CM8c41n7H2m87jrdvZ6B+ObeiMqkaaSdUGYcB5dSTX5ogXVbTA1OHvKkHVyMtqfFgYmDXTP1BWUzDOgdQ/wh2BItBUxbS1zHw6TDBCOrpQOUoq9zGQpPDmlOox2QhrQV5EewPNHGjgWaqrPIxC50KNIlneNpZSPdhoMp4IlgELgS/lMT4YNZZAhQR/aCjXTcL6f0Yp8d3PtDo62CtK4m0/o53g1ZkKlBUMpF23BPgpkD0WOplJZF+h3XODmtpub7MQ/oOBt8bXr6Ueh6Il0hR/I9gYn0dRaIV6MhtK1nEw3H6HY8Cjbyf607gFVxk0VLdD7xsXPvmvKRP5gWV8RjwNlC+i/bqXmaNywJRb+RP8pI+kBdeA5oefQ99kSJttco+F2ixfgOa27ZDyioebvJ1oLmzOEl0nOIB1LL2QtNa6K8oGjpqbTqUh/TD4WXJqdHv1ZJlxVxJa+WF8lHyeR7SKoaRu57YWKCSFFG0FuqPouglponVerSVPKTP4q1Z4BCgklxeBGPmVPkkrUv6OLgdtHMb8pCW7Pth596IVwM9r1oVZVbf/NpA3HlNJM2vXCAPad81eePNZClCEQ0mVD4d/h+AuRhDrHYlL2k/lyfhpEWFU/HEH2ENdcfYcLtIeyMOBbcAY0RP+ylgGJTMTFWuk+e3IqcbqlyvSnsx70nHOdbQUMYNbG/Mw6gWY7tDeiALe5WbnzgdGL+VWrpDeg4MNUvGbQYIKk4t5du5fgYdZDmeTF7SOuPLgRGFE3vKphFqWSStXTag/ixt4rykDwtEdaCKLtewgEn+DiUvaU/Bm/EEoEOTVhbS+SYwaZlWfqWzBehTVIqVVkOiRiy6outrQTrOYR7Ez6fcmVL4FmhFTKh4KQwIddqaRiC6uacARc20gK6uUb5Xd1ss2MmmM0cule+rhIqIGdUbwkOtihswlWZaWAuTFpLps5iK2Dds0mhbsiPBJPAFML3caRyaVzwieS8TCY0DD4XOI6m1LCeBFmAEnxaSGTaZfFF8DgU6+RY3rbsr2auALkNq6S5pT0dzZx7EfwvMJV8PDH6N6QYBnau0k9YXfw6o1MPBq0B3V5EzZyhxSfs1a0raQNesk0UZ9rptApq/d4Ei0JVDlYz/PmWsaeLjgV/Qf9o6U/JtC3b3pH3XhLq5kBjau+CHQIVc2dkphf7DqRWRC8JG/SI/AWXdE+8y0t8e0pL13wBvR1PCyqALLgRZciK6AJ6q/6TpEpi8fxDo13RZ/gfYlTv9foGsJAAAAABJRU5ErkJggg=="
                  />
                </svg>
                <p>{t("menu.catalogo")}</p>
              </div>
            )}
          </div>
          <span className="h-screen barra"></span>
          <div className="w-full">
            <div className="navbar">
              <figure className="w-[30%]">
                <img src="/assets/dashboard/years.png" className="!w-[60%] " />
              </figure>

              <div className="w-[35%] justify-around">
                <div className="digipoints">
                  <button
                    onClick={() => {
                      dispatch(changeLoadingData(true));
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
                        ? digipoints?.assigned_points - digipoints?.cart_points
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
                      dispatch(changeLoadingData(true));
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
                  <svg
                    className="none"
                    width={30}
                    height={30}
                    fill="#d9d9d9"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.719 16.49c-.553-.956-1.219-2.774-1.219-5.99v-.666c0-4.153-3.337-7.556-7.444-7.584H12a7.49 7.49 0 0 0-7.5 7.5v.75c0 3.216-.666 5.034-1.219 5.99a1.481 1.481 0 0 0-.01 1.51 1.49 1.49 0 0 0 1.304.75h14.85a1.49 1.49 0 0 0 1.303-.75 1.481 1.481 0 0 0-.01-1.51Z" />
                    <path d="M14.99 20.25h-6a.75.75 0 1 0 0 1.5h6a.75.75 0 1 0 0-1.5Z" />
                  </svg>
                  <svg
                    className="none"
                    width={30}
                    height={30}
                    fill="#d9d9d9"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m22.012 14.099-1.396-1.856c.009-.17 0-.347 0-.479L22.012 9.9a.73.73 0 0 0 .122-.647 10.765 10.765 0 0 0-1.022-2.475.769.769 0 0 0-.543-.375l-2.297-.328-.347-.347-.328-2.297a.788.788 0 0 0-.366-.544 11.014 11.014 0 0 0-2.484-1.021.731.731 0 0 0-.647.121l-1.856 1.388h-.488L9.9 1.986a.731.731 0 0 0-.647-.121c-.864.236-1.696.58-2.475 1.021a.769.769 0 0 0-.375.544l-.328 2.297-.347.347-2.297.328a.769.769 0 0 0-.544.375c-.442.78-.785 1.61-1.021 2.475a.731.731 0 0 0 .121.647l1.397 1.856v.478L1.987 14.1a.731.731 0 0 0-.121.647c.236.864.58 1.696 1.021 2.475a.769.769 0 0 0 .544.375l2.297.328.347.347.328 2.297a.769.769 0 0 0 .375.543c.78.443 1.61.786 2.475 1.022a.722.722 0 0 0 .647-.122l1.856-1.387h.488L14.1 22.01a.731.731 0 0 0 .647.122 10.593 10.593 0 0 0 2.475-1.022.769.769 0 0 0 .375-.543l.328-2.307c.112-.112.244-.234.337-.337l2.307-.328a.77.77 0 0 0 .543-.375c.443-.78.786-1.61 1.022-2.475a.732.732 0 0 0-.122-.647ZM12 16.124a4.125 4.125 0 1 1 0-8.25 4.125 4.125 0 0 1 0 8.25Z" />
                  </svg>
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
                    <div className="user">
                      <Menu trigger="hover" openDelay={100} closeDelay={400}>
                        <Menu.Target>
                          <div className="userPreMenu">
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
                          </div>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item>
                            <div
                              className="buttonLayoutDropdown"
                              onClick={() => {
                                dispatch(changeLoadingData(true));
                                router.push(
                                  `/user/${userRedux?.person[0].names}`
                                );
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
                      <p>{userRedux?.person[0]?.names}</p>
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
