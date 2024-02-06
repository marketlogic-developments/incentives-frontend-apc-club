import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompany,
  setDigipoints,
  setDistribuitor,
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
import LoginTarget from "../components/login/LoginTarget";
import MaintenancePlataform from "../components/login/MaintenancePlataform";
import client from "../contentful";
import ClosePlataform from "../components/login/ClosePlataform";
import { mailsClosePlataform } from "../content/mails_close_plataform";

export default function Home({ maintenance }) {
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

  const [closePt, setClosePt] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("token")) {
      setShowPopup(true);
      setTokeNewPass(params.get("token"));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("documentKey")) {
      
      console.log("se firmo el documento");
      alert("se firmo el documento");
      route.push("/dashboard");
      // Almacenar el valor en sessionStorage
      sessionStorage.setItem("documentKey", "true");
      // if (result.isConfirmed) {
      //   axios
      //     .patch(
      //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user?.id}`,
      //       {
      //         cpf: "active colTC",
      //       },
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }
      //     )
      //     .then(() => {
      //       dispatch(userLogin({ ...user, cpf: "active" }));
      //       return setOpened(true);
      //     });
      // }
    }
  }, []);
  
  

  useEffect(() => {
    if (window.sessionStorage.getItem("infoDt") !== null) {
      route.push("/dashboard");
    }
  }, []);

  console.log(closePt, maintenance);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(changeLoadingData(true));

    if (listRedirect.includes(email.split("@")[1])) {
      return route.push("https://bcr.adobepcclub.net/");
    }

    // if (!mailsClosePlataform.includes(email)) {
    //   dispatch(changeLoadingData(false));
    //   return setClosePt(true);
    // }

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.user.operationStatusId === 5) {
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
    const compOrDist =
      userData.user.companyId === null
        ? {
            endpoint: "distribution-channel",
            byId: userData.user.distributionChannelId,
          }
        : {
            endpoint: "companies",
            byId: userData.user.companyId,
          };

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${compOrDist.endpoint}/${compOrDist.byId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${userData.token}`,
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
        if (userData.user.policy) {
          const params = new URLSearchParams(window.location.search);

          params.get("redirect")
            ? route.push(`/${params.get("redirect")}`)
            : route.push("/dashboard");
        } else {
          route.push("/terminosycondiciones");
        }

        dispatch(changeLoadingData(false));
      });

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/digipoints-redeem-status/${userData.user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${userData.token}`,
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
  };

  const handleSubmitNewPass = (data) => {
    data.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`, {
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
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/recovery`, {
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
      {maintenance[0].maintenance && closePt ? (
        <ClosePlataform data={maintenance[0]} />
      ) : (
        <main className="mainIndex bg-primary flex flex-col w-full z-40 relative overflow-x-hidden overflow-y-hidden min-h-screen">
          <Recovery opened={opened} setOpened={setOpened} t={t} />
          <Registro close={setRegister} register={register} />
          <div className="max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:justify-center max-sm:mt-10 max-h-[100px] max-sm:max-h-[150px] flex w-full justify-between mt-10">
            <figure className="ml-10 max-sm:m-auto">
              <img
                src="assets/login/adobe.webp"
                className="max-w-[250px] max-sm:m-auto lg:w-[60%] 2xl:w-[80%]"
                alt="Principal-Adobe-Logo"
              />
            </figure>
            <div className="flex gap-6 mr-6 items-center">
              <figure>
                <img
                  src="assets/login/pcc.webp"
                  className="max-w-[400px] max-sm:m-auto ml-auto lg:w-[60%] 2xl:w-[80%]"
                  alt="10years-Logo"
                />
              </figure>
            </div>
          </div>
          <div className="container flex flex-row justify-center max-w-full max-h-full sm:my-auto">
            <LoginTarget
              handleSubmit={handleSubmit}
              viewLogin={viewLogin}
              setViewLogin={setViewLogin}
              setEmail={setEmail}
              setPassword={setPassword}
              setRegister={setRegister}
              setOpen={setOpen}
            />
          </div>
          <figure className="absolute w-full z-[-1] opacity-25">
            <img
              src="/assets/login/bbapc.webp"
              className="min-w-full min-h-screen"
            ></img>
          </figure>
        </main>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const maintenance = await client.getEntries({
    content_type: "maintenance",
  });

  return {
    props: {
      maintenance: maintenance.items.map(({ fields }) => fields),
    },
  };
}
