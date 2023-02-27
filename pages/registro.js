import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setDigipoints, userLogin } from "../store/reducers/users.reducer";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function Home() {
  const [t, i18n] = useTranslation("global");

  const user = useSelector((state) => state.user.user.user);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  useEffect(() => {
    if (Cookies.get("userDt") !== undefined) {
      route.push("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        Cookies.set("userDt", JSON.stringify(res.data), { expires: 365 });
        dispatch(userLogin(res.data));
        handleDigipoints(res.data);
      })
      .catch(() => alert("no se pudo procesar la información"));
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
        Cookies.set("digipoints", JSON.stringify(digipoints), { expires: 365 });
        dispatch(setDigipoints(digipoints));
        if (!userData.user.policy) {
          return route.push("/dashboard");
        } else {
          return route.push("/terminosycondiciones");
        }
      });
  };

  return (
    <>
      <Head>
        <title title="true">Adobe APC</title>
      </Head>
      <main className="mainIndex bg-primary fixed w-full z-10">
        <div className="container flex flex-col justify-center items-center h-screen w-full max-w-full">
          <div className="flex items-center justify-center w-full max-sm:w-4/5 h-[90%] relative">
            <div className="w-fit h-full flex justify-center items-center">
              <figure>
                <img
                  src="/assets/login/apclogo.png"
                  className="logoAPC w-5/6"
                />
              </figure>
            </div>
            <div className="gap-5 flex flex-col">
              <div
                className="card w-[35rem] text-primary-content"
                style={{ backgroundColor: "#e4ddd8" }}
              >
                <div className="card-body items-center justify-between max-sm:justify-center flex px-20 max-sm:px-5">
                  <div className="w-full">
                    <div className="flex justify-between max-sm:text-center max-sm:justify-center card-login">
                      <h2
                        className="card-title text-black font-bold max-sm:text-center py-5"
                        style={{ color: "#00405d", fontSize: "2.00rem" }}
                      >
                        <figure>
                          <img
                            src="/assets/login/fraseapc.png"
                            className="w-5/6"
                          ></img>
                        </figure>
                      </h2>
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
                        className="btn btn-outline btn-secondary w-full"
                        type="submit"
                      >
                        {t("login.Iniciar_Sesión")}
                      </button>
                    </form>
                    <div className="flex">
                      <div className="flex items-center justify-between w-6/12">
                        <p className="text-secondary text-center underline decoration-solid cursor-pointer">
                          ¿Olvidaste tu contraseña?
                        </p>
                      </div>
                      <div className="w-1/2 flex flex-col justify-center items-center text-secondary border-l-2">
                        <p className="text-center">
                          ¿Quieres unirte a APC Club?
                        </p>
                        <p className="underline decoration-solid cursor-pointer">
                          <Link href={"/registro"}>
                            <strong>Regístrate Aquí</strong>
                          </Link>
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
                    <strong>Language</strong>
                  </p>
                  <select
                    className="select w-1/2 text-secondary"
                    onChange={(e) => {
                      i18n.changeLanguage(e.target.value);
                    }}
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
