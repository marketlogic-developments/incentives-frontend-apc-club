import { Modal } from "@mantine/core";
import axios, { Axios } from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { SignModal } from "../components/terminosycondiciones/Canvas";
import Tyces from "../components/terminosycondiciones/tyces";
import Tycpor from "../components/terminosycondiciones/tycpor";
import { policyAndPassword, userLogin } from "../store/reducers/users.reducer";

const terminosycondiciones = () => {
  const [checked, setChecked] = useState(false);
  const route = useRouter();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const [modal, setModal] = useState(0);
  const [imageSign, setImageSign] = useState(null);

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (user?.cpf === "active") {
      return setOpened(true);
    }
  }, []);

  const handleSubmit = () => {
    Swal.fire({
      title: t("terminosycondiciones.deseas"),
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: t("terminosycondiciones.aceptarBtn"),
      confirmButtonColor: "#eb1000",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `${process.env.BACKURL}/users/${user?.id}`,
            { cpf: "active" },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            dispatch(userLogin({ ...user, cpf: "active" }));
            return setOpened(true);
          });
      }
    });
  };

  const isMobile = window.innerWidth <= 768;

  const modalSize = isMobile
    ? { initialWidth: "90%", initialHeight: "auto" }
    : { initialWidth: "40%", initialHeight: "auto" };

  return (
    <>
      <Head>
        <title>Terminos y Condiciones</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      <main
        className="flex justify-center relative h-screen bg-white"
        style={{ maxWidth: "100%", zIndex: 50, marginTop: "5vh" }}
      >
        <Modal
          opened={opened}
          centered
          size={"80%"}
          onClose={() => null}
          id="modalterminos"
        >
          <div className="w-full p-10 flex flex-col justify-center gap-10">
            <h2 className="font-medium text-justify text-xl">
              {t("tyc.title1")} <strong>{t("tyc.title12")}</strong>
            </h2>
            <h2 className="font-medium text-justify text-xl">
              {t("tyc.title2")}
            </h2>
            <h2 className="font-medium text-justify text-xl">
              {t("tyc.title3")}
            </h2>
            <div className="flex justify-center">
              <button
                className="btn btn-primary w-max text-lg"
                onClick={() => {
                  Cookies.remove("infoDt");
                  route.push("/");
                }}
              >
                {t("menu.salir")}
              </button>
            </div>
          </div>
        </Modal>
        {user?.cpf !== "active" && (
          <div className="flex flex-col items-center w-full gap-5">
            {/* <div className="m-6 flex flex-col gap-16">
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-3xl">
                {t("terminosycondiciones.TerminosyCondiciones")}
              </h1>
            </div>
          </div> */}
            <div className="flex gap-5 items-center">
              <div className="rounded-full bg-primary p-2 w-[30px] h-[30px] flex justify-center items-center">
                <p className="text-white">1</p>
              </div>
              <p>{t("terminosycondiciones.aceptar")}</p>
              <button className="buttonSign">
                {t("terminosycondiciones.aprobar")}
              </button>
            </div>

            {user?.person[0]?.languageId === 1 ? (
              <iframe
                title="TermsAndContidionsAdobeSign"
                src="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhCcW5vpqipVeP4okcl4cwzhtHBOExs8xsfkD9ObSqH_IqLxxQKpBR8Mcsy_xC5UXls*"
                className="iframeTandC"
              ></iframe>
            ) : (
              <iframe
                title="TermsAndContidionsAdobeSign"
                src="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhB3Rs7ztelMC_V9OYaM2PXrDtb5dGH_wpWWn2SoP0gduKbSowZpEFoOhmga9SF6OdI*"
                className="iframeTandC"
              ></iframe>
            )}

            {/* <div className="flex flex-col gap-10 items-center">
            <div className="flex gap-5">
              <input
                type="checkbox"
                class="checkbox checkbox-lg"
                onChange={(e) => {
                  setChecked(e.target.checked);
                  setOpened(e.target.checked);
                }}
              />
              <p className="text-3xl">{t("terminosycondiciones.aceptar")}</p>
            </div>
            {checked && imageSign !== null && (
              <div>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleSubmit}
                >
                  {t("terminosycondiciones.bienvenido")}
                </button>
              </div>
            )}
          </div> */}
            <div className="flex gap-5 items-center">
              <div className="rounded-full bg-primary p-2 w-[30px] h-[30px] flex justify-center items-center">
                <p className="text-white">2</p>
              </div>
              <p>{t("terminosycondiciones.click")}</p>
            </div>

            <button
              className="btn btn-primary btn-lg mb-5"
              onClick={handleSubmit}
            >
              {t("terminosycondiciones.bienvenido")}
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default terminosycondiciones;
