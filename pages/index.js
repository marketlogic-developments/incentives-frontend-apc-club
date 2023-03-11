import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  setDigipoints,
  userLogin,
  userToken,
} from "../store/reducers/users.reducer";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Recovery from "../components/dashboard/recovery";
import Swal from "sweetalert2";
import Registro from "../components/dashboard/registro";

export default function Home() {
  const [t, i18n] = useTranslation("global");

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const [opened, setOpened] = useState(false);
  const [register, setRegister] = useState(false);

  const listRedirect = ["bcrservicos.com.br", "bcrcx.com"];

  useEffect(() => {
    if (Cookies.get("infoDt") !== undefined) {
      route.push("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (listRedirect.includes(email.split("@")[1])) {
      return route.push("https://bcr.adobepcclub.net/");
    }

    axios
      .post(`${process.env.BACKURL}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        email: email,
        password: password,
      })
      .then((res) => {
        Cookies.set(
          "infoDt",
          JSON.stringify({
            token: res.data.token,
            id: res.data.user.id,
            roleId: res.data.user.roleId,
          }),
          { expires: 365 }
        );
        dispatch(userLogin(res.data.user));
        dispatch(userToken(res.data.token));
        handleDigipoints(res.data);
      })
      .catch(() => {
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
          title: t("login.errorLogin"),
        });
      });
  };

  const handleDigipoints = (userData) => {
    axios
      .get(
        `${process.env.BACKURL}/reporters/digipoints-redeem-status/2/1/${userData.user.id}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      )
      .then((res) => {
        const [digipoints] = res.data;

        if (res.data.length === 0) {
          dispatch(
            setDigipoints({
              assigned_points: 0,
              cart_points: 0,
            })
          );
        } else {
          dispatch(setDigipoints(digipoints));
        }

        if (userData.user.policy) {
          return route.push("/dashboard");
        } else {
          return route.push("/terminosycondiciones");
        }
      });
  };

  return (
    <>
      <Head>
        <title title="true">Adobe APC Club</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      <main className="mainIndex bg-primary flex flex-col w-full z-50 relative overflow-x-hidden">
        <Recovery opened={opened} setOpened={setOpened} t={t} />
        <div className="max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:justify-center max-sm:mt-10 max-h-[100px] flex absolute w-full justify-between mt-10">
          <figure className="ml-10">
            <img src="assets/login/adobe.png" className="max-w-[250px]" />
          </figure>
          <figure>
            <img src="assets/login/pcc.png" className="max-w-[400px]" />
          </figure>
        </div>
        <div className="container flex flex-col justify-center items-center h-screen w-full max-w-full relative">
          <div className="flex items-center max-sm:justify-start max-sm:flex-col justify-center w-full max-sm:w-full h-[90%] containerLogin">
            <div className="w-fit h-full max-sm:h-auto max-sm:mb-5 flex justify-center items-center ">
              <figure id="apcLogo">
                <img
                  src="/assets/login/apcLogo.png"
                  className="logoAPC w-5/6"
                />
              </figure>
            </div>
            <Registro close={setRegister} register={register} />
            <div className="gap-5 flex flex-col containerCard">
              <div
                className="card w-[35rem] text-primary-content"
                style={{ backgroundColor: "#e4ddd8" }}
                id="cardLogin"
              >
                <div className="card-body items-center justify-between max-sm:justify-center flex px-20 max-sm:px-5 internalCard">
                  <div className="w-full">
                    <div className="flex justify-between max-sm:text-center max-sm:justify-center card-login">
                      <h1
                        className="card-title text-black font-bold max-sm:text-center py-5 w-full justify-center"
                        style={{ color: "#00405d", fontSize: "2.00rem" }}
                      >
                        {t("login.Iniciar_Sesión")}
                      </h1>
                    </div>
                  </div>
                  <div className="w-full gap-5 flex flex-col">
                    <form
                      className="form-control w-full flex items-center gap-5"
                      onSubmit={handleSubmit}
                    >
                      <div className="w-full">
                        <label className="label flex flex-col w-full items-start">
                          <input
                            required
                            type="email"
                            placeholder={t("login.Email")}
                            className="input w-full text-black"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </label>
                        <label className="label flex flex-col w-full items-start">
                          <input
                            type="password"
                            placeholder={t("login.Password")}
                            className="input w-full text-black"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </label>
                      </div>

                      <button
                        className="btn btn-secondary w-full"
                        type="submit"
                      >
                        {t("login.continuar")}
                      </button>
                    </form>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-between w-full none">
                        <p
                          className="text-secondary text-center underline decoration-solid cursor-pointer"
                          onClick={() => setOpened(true)}
                        >
                          {t("login.¿Has_olvidado_la_contraseña?")}
                        </p>
                      </div>
                      <div className="w-full flex flex-col justify-center items-center text-secondary">
                        <p className="text-center">
                          ¿Quieres unirte a APC Club?
                        </p>
                        <p
                          className="underline decoration-solid cursor-pointer font-bold"
                          onClick={() => setRegister(true)}
                        >
                          Regístrate Aquí
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ backgroundColor: "#e4ddd8" }}
                className="w-full flex max-sm:items-center max-sm:text-center idioma-card rounded-xl p-3 justify-center"
              >
                <div className="flex items-center w-full justify-around">
                  <p className="text-secondary">
                    <strong>{t("login.language")}</strong>
                  </p>
                  <select
                    className="select w-1/2 text-secondary"
                    onChange={(e) => {
                      i18n.changeLanguage(e.target.value);
                    }}
                    value={i18n.resolvedLanguage}
                  >
                    <option value="es">Español</option>
                    <option value="por">Português</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
