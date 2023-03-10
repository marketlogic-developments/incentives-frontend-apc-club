import { Modal } from "@mantine/core";
import axios from "axios";
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
import { policyAndPassword } from "../store/reducers/users.reducer";

const terminosycondiciones = () => {
  const [checked, setChecked] = useState(false);
  const route = useRouter();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const [modal, setModal] = useState(0);
  const [imageSign, setImageSign] = useState(null);
  const modalAppear = Cookies.get("t&c");

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (user?.policy) {
      return route.push("/dashboard");
    }

    if (modalAppear) {
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
        Cookies.set("t&c", true);
        return setOpened(true);
      }
    });
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return (
        <div className="w-full p-10 flex flex-col justify-center gap-10">
          <h2 className="font-medium text-center text-3xl">{t("tyc.title")}</h2>
          {/* <div className="flex justify-center">
            <button
              className="btn btn-primary w-max text-lg"
              onClick={() => setModal(1)}
            >
              {t("tyc.firmar")}
            </button>
          </div> */}
        </div>
      );
    }
  }, [modal]);

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
          size={modalSize}
          onClose={() => null}
          id="modalterminos"
        >
          {typeModal}
        </Modal>
        {!modalAppear && (
          <div className="flex flex-col items-center w-full gap-5">
            {/* <div className="m-6 flex flex-col gap-16">
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-3xl">
                {t("terminosycondiciones.TerminosyCondiciones")}
              </h1>
            </div>
          </div> */}
            {user?.person[0]?.languageId === 1 ? (
              <iframe
                title="TermsAndContidionsAdobeSign"
                src="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhC7aI-LuferMHhCONPt0QpIJZSCGvLbhKN8k8WfgJKG2DT4iaUuIHTunhYoE9z1fe8*https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhC7aI-LuferMHhCONPt0QpIJZSCGvLbhKN8k8WfgJKG2DT4iaUuIHTunhYoE9z1fe8*"
                className="iframeTandC"
              ></iframe>
            ) : (
              <iframe
                title="TermsAndContidionsAdobeSign"
                src="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhC7aI-LuferMHhCONPt0QpIJZSCGvLbhKN8k8WfgJKG2DT4iaUuIHTunhYoE9z1fe8*https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhC7aI-LuferMHhCONPt0QpIJZSCGvLbhKN8k8WfgJKG2DT4iaUuIHTunhYoE9z1fe8*"
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
            <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
              {t("terminosycondiciones.bienvenido")}
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default terminosycondiciones;
