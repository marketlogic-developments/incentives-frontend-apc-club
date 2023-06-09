import React from "react";
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
      className="card w-[35%] text-primary-content bg-white !rounded-lg"
      id="cardLogin"
    >
      <div className="flex flex-col items-center lg:gap-2 2xl:gap-6 max-sm:justify-center flex px-10 lg:py-6 2xl:py-12 max-sm:px-5 internalCard my-auto">
        <div className="w-full">
          <div className="flex flex-col lg:gap-2 2xl:gap-6">
            <figure id="apcLogo">
              <img
                src="/assets/login/apcLogo.webp"
                className="logoAPC xl:w-[31%] lg:w-[25%]"
                alt="logoAPC"
              />
            </figure>
            <h1 className="2xl:text-2xl lg:text-xl text-black font-bold text-center w-full">
              {t("login.Iniciar_Sesión")}
            </h1>
          </div>
        </div>
        <div className="w-full 2xl:gap-6 lg:gap-2 flex flex-col">
          <form
            className="form-control w-full flex items-center lg:gap-3 2xl:gap-6"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col lg:gap-3 xl:gap-6">
              <div>
                <label className="label w-full items-start text-black font-bold lg:!text-xs xl:!text-sm">
                  {t("login.Email")}
                </label>
                <input
                  required
                  type="email"
                  placeholder={"email@example.com"}
                  className="input lg:!input-xs xl:!input-sm w-full text-black bg-[#F4F4F4] lg:!text-xs xl:!text-sm"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="label w-full items-start text-black font-bold lg:!text-xs xl:!text-sm">
                  {t("login.Password")}
                </label>
                <div className="flex flex-col w-full items-start relative">
                  <input
                    type={viewLogin}
                    placeholder={"*******"}
                    className="input lg:!input-xs xl:!input-sm w-full text-black bg-[#F4F4F4] lg:!text-xs xl:!text-sm"
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
            </div>
            <div>
              <p
                className="text-info font-bold w-full text-center decoration-solid cursor-pointer lg:!text-xs xl:!text-sm"
                onClick={() => setOpen(true)}
              >
                {t("login.¿Has_olvidado_la_contraseña?")}
              </p>
            </div>
            <button
              className="btn btn-info w-full lg:!button-xs xl:!input-md lg:!text-xs xl:!text-sm"
              type="submit"
            >
              {t("login.continuar")}
            </button>
          </form>
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-center gap-3 items-center text-secondary">
              <p className="text-center !text-xs">{t("login.registro")}</p>
              <p
                className="cursor-pointer font-bold !text-xs text-info"
                onClick={() => setRegister(true)}
              >
                {t("login.linkRegistro")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
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
    </div>
  );
};

export default LoginTarget;
