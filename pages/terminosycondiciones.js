import { Modal } from "@mantine/core";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (user?.policy === false) {
      return route.push("/dashboard");
    }
  }, []);

  const handleSubmit = () => {
    const userToken = JSON.parse(Cookies.get("infoDt"));
    console.log(userToken);
    axios
      .patch(
        `${process.env.BACKURL}/users/${userToken.id}`,
        { policy: false },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      )
      .then((res) => {
        dispatch(policyAndPassword({ ...user, policy: false }));
        route.push("/dashboard");
      });
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return (
        <div className="w-full p-10 flex flex-col justify-center gap-10">
          <h2 className="font-medium text-center text-3xl">
            Acepta los Términos y Condiciones <br /> del programa APC Club FY23
          </h2>
          <div className="flex justify-center">
            <button
              className="btn btn-primary w-max text-lg"
              onClick={() => setModal(1)}
            >
              Firmar
            </button>
          </div>
        </div>
      );
    }
    if (modal === 1) {
      return (
        <SignModal
          setOpened={setOpened}
          setImageSign={setImageSign}
          setChecked={setChecked}
        />
      );
    }
  }, [modal]);

  return (
    <>
      <Head>
        <title>Terminos y Condiciones</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      <main
        className="flex justify-center"
        style={{ maxWidth: "100%", marginTop: "5vh" }}
      >
        <Modal opened={opened} centered size={"40%"}>
          {typeModal}
        </Modal>
        <div className="flex flex-col items-center w-full gap-5">
          <div className="m-6 flex flex-col gap-16">
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-3xl">
                {t("terminosycondiciones.TerminosyCondiciones")}
              </h1>
            </div>
          </div>
          {user?.user?.person[0]?.languageId === 1 ? <Tycpor /> : <Tyces />}

          <div className="flex flex-col gap-10 items-center">
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
          </div>
        </div>
      </main>
    </>
  );
};

export default terminosycondiciones;
