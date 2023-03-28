import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompany,
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
import { Modal } from "@mantine/core";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { changeLoadingData } from "../store/reducers/loading.reducer";

export default function Home() {
  const [t, i18n] = useTranslation("global");

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const [opened, setOpened] = useState(false);
  const [register, setRegister] = useState(null);

  const listRedirect = ["bcrservicos.com.br", "bcrcx.com"];
  const [open, setOpen] = useState("");
  const [view, setView] = useState("password");
  const [viewLogin, setViewLogin] = useState("password");
  const [tokeNewPass, setTokeNewPass] = useState("");

  const [passwordMatch, setPasswordMatch] = useState(""); // passwords match
  // booleans for password validations
  const [containsUL, setContainsUL] = useState(false); // uppercase letter
  const [containsLL, setContainsLL] = useState(false); // lowercase letter
  const [containsN, setContainsN] = useState(false); // number
  const [containsSC, setContainsSC] = useState(false); // special character
  const [contains8C, setContains8C] = useState(false); // min 8 characters

  // checks all validations are true
  const [allValid, setAllValid] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("token")) {
      setShowPopup(true);
      setTokeNewPass(params.get("token"));
    }
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem("infoDt") !== null) {
      route.push("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(changeLoadingData(true));

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
        if (res.data.user.person[0]?.operationStatusId === 5) {
          Swal.fire({
            title: t("login.sorry"),
            html:
              t("login.userNoActivo1") +
              '<a href="mailto:info@adobepcclub.com" class="text-[#eb1000] font-bold text-center">info@adobepcclub.com</a><br/>' +
              t("login.userNoActivo2"),
            icon: "warning",
            confirmButtonColor: "#eb1000",
            confirmButtonText: t("terminosycondiciones.aceptarBtn"),
          });
          return dispatch(changeLoadingData(false));
        }

        window.sessionStorage.setItem(
          "infoDt",
          JSON.stringify({
            token: res.data.token,
            id: res.data.user.id,
            roleId: res.data.user.roleId,
          })
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

        Toast.fire({
          icon: "error",
          title: t("login.errorLogin"),
        });

        return dispatch(changeLoadingData(false));
      });
  };

  const handleDigipoints = async (userData) => {
    const urls = [
      `companies/${userData.user.companyId}`,
      `reporters/digipoints-redeem-status/2/1/${userData.user.id}`,
    ];

    const res = urls.map((item) =>
      axios.get(`${process.env.BACKURL}/${item}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Authorization: `Bearer ${userData.token}`,
        },
      })
    );

    return Promise.all(res)
      .then((res) => {
        dispatch(setCompany(res[0].data));

        const [digipoints] = res[1].data;

        if (res[1].data.length === 0) {
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
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(changeLoadingData(false));
      });
  };

  const handleSubmitNewPass = (data) => {
    data.preventDefault();
    axios
      .post(`${process.env.BACKURL}/auth/change-password`, {
        token: tokeNewPass,
        newPassword: data.target[0].value,
      })
      .then((res) => {
        setShowPopup(false);
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
          title: t("login.errorchangepass"),
        });
      });
  };

  const handleRequestNewPass = (data) => {
    data.preventDefault();

    axios
      .post(`${process.env.BACKURL}/auth/recovery`, {
        email: data.target[0].value,
        lang: i18n.language,
      })
      .then((res) => {
        setOpen(false);
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
          title: t("login.correoenviado"),
        });
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
          title: t("login.correonotfound"),
        });
      });
  };

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

  return (
    <>
      {showPopup && (
        <Modal
          opened={showPopup}
          onClose={() => setShowPopup(false)}
          centered
          size={"50%"}
        >
          <div className="flex flex-col w-full items-center text-center gap-10">
            <p className="text-3xl text-primary">{t("dashboard.bienvenido")}</p>
            <p className="text-xl">{t("dashboard.continuar")}</p>

            <form
              className="flex flex-col items-center gap-5 w-full"
              onSubmit={(data) => {
                allValid ? handleSubmitNewPass(data) : handleError(data);
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
                  title="viewPassword"
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
        </Modal>
      )}
      <Modal opened={open} onClose={() => setOpen(false)} centered size={"50%"}>
        <div className="flex flex-col w-full items-center text-center gap-10">
          <p className="text-xl">{t("login.changepass")}</p>

          <form
            className="flex flex-col items-center gap-5 w-full"
            onSubmit={(data) => handleRequestNewPass(data)}
          >
            <label className="label">
              <input
                required
                type="email"
                placeholder={t("login.Email")}
                className="input w-full text-black border-gray-500"
              />
            </label>
            <button className="btn btn-primary">
              {t("dashboard.cambiarpass")}
            </button>
          </form>
        </div>
      </Modal>
      <Head>
        <title title="true">Adobe APC Club</title>
        <link rel="icon" href="/favicon.png"></link>
      </Head>
      <main className="mainIndex bg-primary flex flex-col w-full z-40 relative overflow-x-hidden overflow-y-hidden h-screen 2xl:gap-16 xl:gap-1">
        <Recovery opened={opened} setOpened={setOpened} t={t} />
        <Registro close={setRegister} register={register} />
        <div className="max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:justify-center max-sm:mt-10 max-h-[100px] max-sm:max-h-[150px] flex w-full justify-between mt-10">
          <figure className="ml-10 max-sm:m-auto">
            <img
              src="assets/login/adobe.webp"
              className="max-w-[250px] max-sm:m-auto "
              alt="Principal-Adobe-Logo"
            />
          </figure>
          <figure>
            <img
              src="assets/login/pcc.webp"
              className="max-w-[400px] max-sm:m-auto"
              alt="10years-Logo"
            />
          </figure>
        </div>
        <div className="container flex flex-col justify-center items-center w-full max-w-full relative">
          <div className="flex items-center max-sm:justify-start max-sm:flex-col justify-center w-full max-sm:w-full h-[90%] containerLogin">
            <div className="w-fit h-full max-sm:h-auto max-sm:mb-5 flex justify-center items-center ">
              <figure id="apcLogo">
                <img
                  src="/assets/login/apcLogo.webp"
                  className="logoAPC w-5/6"
                  alt="logoAPC"
                />
              </figure>
            </div>

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
                        <label className="label flex flex-col w-full items-start relative">
                          <input
                            type={viewLogin}
                            placeholder={t("login.Password")}
                            className="input w-full text-black"
                            required
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              viewLogin === "password"
                                ? setViewLogin("text")
                                : setViewLogin("password");
                            }}
                            className="absolute inset-y-0 right-0 flex items-center px-4 py-2 text-gray-700 hover:text-gray-600 focus:outline-none"
                          >
                            {viewLogin === "text" ? (
                              <AiOutlineEyeInvisible className="h-5 w-5 fill-[#000]" />
                            ) : (
                              <AiOutlineEye className="h-5 w-5 fill-[#000]" />
                            )}
                          </button>
                        </label>
                      </div>

                      <button
                        className="btn btn-secondary w-full lg:button-sm 2xl:input-md"
                        type="submit"
                      >
                        {t("login.continuar")}
                      </button>
                    </form>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-between w-full">
                        <p
                          className="text-secondary text-center decoration-solid cursor-pointer"
                          onClick={() => setOpen(true)}
                        >
                          {t("login.¿Has_olvidado_la_contraseña?")}
                        </p>
                      </div>
                      <div className="border-separate border border-[#00405d] w-full mt-4 mb-4"></div>
                      <div className="w-full flex flex-col justify-center items-center text-secondary">
                        <p className="text-center">{t("login.registro")}</p>
                        <p
                          className="underline decoration-solid cursor-pointer font-bold"
                          onClick={() => setRegister(true)}
                        >
                          {t("login.linkRegistro")}
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
                    className="select w-1/2 text-secondary lg:select-sm 2xl:select-md"
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
