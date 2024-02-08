import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginTarget = ({
  handleSubmit,
  viewLogin,
  setViewLogin,
  setEmail,
  setPassword,
  setRegister,
  setOpen,
}) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div
      className="flex flex-col justify-center place-items-center sm:w-2/6 w-72 bg-white h-full m-4 rounded-xl shadow-lg py-6"
      id="cardLogin"
    >
      <div className="flex flex-col justify-center items-center m-2">
        <div className="sm:my-4 my-2 lg:hidden">
          <figure className="w-full" id="apcLogo">
            <img
              src="/assets/login/apcLogo.webp"
              className="xl:w-32 lg:w-20 md:w-10 w-28"
              alt="logoAPC"
            />
          </figure>
        </div>
        <div className="sm:my-4 my-2">
          <h1 className="2xl:text-3xl lg:text-xl text-xl text-black font-bold text-center w-auto">
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-2">
            <label className="label w-full items-start text-black font-bold lg:!text-xs xl:!text-sm">
              {t("login.Password")}
            </label>
            <div className="flex flex-col w-full items-start relative">
              <input
                type={viewLogin}
                placeholder={"*******"}
                className="input lg:!input-xs xl:!input-sm w-full text-black bg-[#F4F4F4] hover:bg-blue-100 lg:!text-xs xl:!text-sm"
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
            </div>
          </div>
          <div className="mb-2">
            <div className="flex flex-col py-2">
              <p
                className="text-info font-bold w-full text-center decoration-solid cursor-pointer lg:!text-xs xl:!text-sm"
                onClick={() => setOpen(true)}
              >
                {t("login.¿Has_olvidado_la_contraseña?")}
              </p>
            </div>
          </div>
          <div className="my-2">
            <button
              className="btn btn-info w-full lg:!button-xs xl:!input-md lg:!text-xs xl:!text-sm"
              type="submit"
            >
              {t("login.continuar")}
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-row mt-2 mb-2 gap-3">
        <p className="text-center !text-xs">{t("login.registro")}</p>
        <p
          className="cursor-pointer font-bold !text-xs text-info"
          onClick={() => setRegister(true)}
        >
          {t("login.linkRegistro")}
        </p>
      </div>
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
        </select>
      </div>
    </div>
  );
};

export default LoginTarget;
