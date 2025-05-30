import { NextRouter, useRouter } from "next/router";
import { NotiSwal } from "notifications/notifications";
import { ModalStructure } from "pages";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { GenericalPromise, HandleError } from "services/generical.service";
import { LoginFunc, ResponseLogin } from "services/Login/login.service";
import { setTokenSessionStorage } from "services/multifuncionToken.service";
import { changeLoadingData } from "store/reducers/loading.reducer";
import adobeConcept from "../../styles/CreativeConceptAdobe.json"

// Testing User Information
import { useDataUser } from "functions/SetDataUser";

interface Props {
  setRegister: React.SetStateAction<any>;
  setOpen: Dispatch<React.SetStateAction<ModalStructure>>;
}

const LoginTarget: React.FC<Props> = ({ setRegister, setOpen }) => {
  const [t, i18n] = useTranslation<string>("global");
  const listRedirect = ["bcrservicos.com.br", "bcrcx.com"];
  const route = useRouter();
  const dispatch = useDispatch();
  const { setDataUser } = useDataUser();

  //useState
  const [showpassword, setShowPassword] = useState<boolean>(false);

  //Form Inputs Login
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (
    e: React.FormEvent
  ): GenericalPromise<ResponseLogin> | void | Promise<boolean> => {
    e.preventDefault();
    dispatch(changeLoadingData(true));

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      console.error(
        "El correo electrónico o contraseña no pueden estar vacíos."
      );
      return;
    }

    if (listRedirect.includes(email.split("@")[1])) {
      return route.push("https://bcr.adobepcclub.net/");
    }

    getDataLogin(email, password);
  };

  const getDataLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const res = await LoginFunc({ email, password });

      if (res?.result?.token) {
        setTokenSessionStorage(res.result.token); // Guarda el token
      } else {
        throw new Error("Token no encontrado en la respuesta"); // Manejo explícito de errores
      }

      return setDataUser();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(changeLoadingData(false)); // Siempre desactivar el estado de carga
    }
  };

  return (
    <div
      className="flex flex-col justify-center place-items-center sm:w-2/6 w-full bg-white h-full rounded-r-xl shadow-lg p-14 py-6 max-h-[734px]"
      id="cardLogin"
    >
      <div className="flex flex-col justify-center items-center m-2 w-full">
        <div className="sm:my-4 my-2 lg:hidden">
          <figure className="w-full flex justify-center" id="apcLogo">
            <img
              src={"/assets/login/apcLogo.webp"}
              className="xl:w-32 lg:w-20 md:w-10 w-[60%]"
              alt="logoAPC"
            />
          </figure>
        </div>
        <div className="sm:my-4 my-2 w-full px-6">
          <h1 className="2xl:text-4xl lg:text-xl text-2xl text-black font-bold !text-left w-full">
            {t("login.Iniciar_Sesión")}
          </h1>
        </div>
      </div>
      <div className="flex flex-col w-full 2xl:gap-6 lg:gap-2">
        <form className="flex form-control w-auto px-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="label w-full items-start text-black font-bold lg:!text-xs xl:!text-sm">
              {t("login.Email")}
            </label>
            <input
              required
              type="email"
              placeholder={"email@example.com"}
              className="input lg:!input-xs xl:!input-sm w-full text-black bg-[#F4F4F4] hover:bg-blue-100 lg:!text-xs xl:!text-sm"
              ref={emailRef}
            />
          </div>
          <div className="mb-2">
            <label className="label w-full items-start text-black font-bold lg:!text-xs xl:!text-sm">
              {t("login.Password")}
            </label>
            <div className="flex flex-col w-full items-start relative">
              <input
                type={showpassword ? "text" : "password"}
                placeholder={"*******"}
                className="input lg:!input-xs xl:!input-sm w-full text-black bg-[#F4F4F4] hover:bg-blue-100 lg:!text-xs xl:!text-sm"
                required
                ref={passwordRef}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev): boolean => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-4 py-2 text-gray-700 hover:text-gray-600 focus:outline-none"
              >
                {showpassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5 fill-[#000]" />
                ) : (
                  <AiOutlineEye className="h-5 w-5 fill-[#000]" />
                )}
              </button>
            </div>
          </div>
          {/* <div className="mb-2">
            <div className="flex flex-col py-2">
              <p
                className="text-info font-bold w-full text-center decoration-solid cursor-pointer lg:!text-xs xl:!text-sm"
                onClick={() => setOpen((prev) => ({ ...prev, open: true }))}
              >
                {t("login.¿Has_olvidado_la_contraseña?")}
              </p>
            </div>
          </div> */}
          <div className="my-2 mt-4">
            <button
              className="btn btn-info w-full lg:!button-xs xl:!input-md lg:!text-xs xl:!text-sm"
              type="submit"
            >
              {t("login.continuar")}
            </button>
          </div>
        </form>
      </div>
      {/* <div className="flex flex-row mt-2 mb-2 gap-3">
        <p className="text-center !text-xs">{t("login.registro")}</p>
        <p
          className="cursor-pointer font-bold !text-xs text-info"
          onClick={() => setRegister(true)}
        >
          {t("login.linkRegistro")}
        </p>
      </div> */}
      <div className="flex py-2 px-5 w-full justify-center sm:mb-5 mb-3">
        <select
          className="select !select-xs select-bordered w-2/3 text-secondary"
          onChange={(e) => {
            i18n.changeLanguage(e.target.value);
          }}
          value={i18n.resolvedLanguage}
        >
          <option value="es">Español</option>
          <option value="por">Português</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
};

export default LoginTarget;
