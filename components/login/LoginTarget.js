import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginTarget = ({
  handleSubmit,
  viewLogin,
  setViewLogin,
  setEmail,
  setPassword,
}) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="card w-[45%] text-primary-content bg-white" id="cardLogin">
      <div className="flex flex-col items-center gap-6 max-sm:justify-center flex px-10 py-20 max-sm:px-5 internalCard">
        <div className="w-full">
          <div className="flex flex-col gap-6">
            <figure id="apcLogo">
              <img
                src="/assets/login/apcLogo.webp"
                className="logoAPC w-[27%]"
                alt="logoAPC"
              />
            </figure>
            <h1 className="text-2xl text-black font-bold text-center w-full">
              {t("login.Iniciar_Sesión")}
            </h1>
          </div>
        </div>
        <div className="w-full gap-5 flex flex-col">
          <form
            className="form-control w-full flex items-center gap-6"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col gap-6">
              <div>
                <label className="label w-full items-start text-black font-bold !text-sm">
                  {t("login.Email")}
                </label>
                <input
                  required
                  type="email"
                  placeholder={"email@example.com"}
                  className="input w-full text-black bg-[#F4F4F4]"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="label w-full items-start text-black font-bold !text-sm">
                  {t("login.Password")}
                </label>
                <div className="flex flex-col w-full items-start relative">
                  <input
                    type={viewLogin}
                    placeholder={"*******"}
                    className="input w-full text-black bg-[#F4F4F4]"
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
                className="text-secondary w-full text-center decoration-solid cursor-pointer"
                onClick={() => setOpen(true)}
              >
                {t("login.¿Has_olvidado_la_contraseña?")}
              </p>
            </div>
            <button
              className="btn btn-secondary w-full lg:button-sm 2xl:input-md"
              type="submit"
            >
              {t("login.continuar")}
            </button>
          </form>
          <div className="flex flex-col items-center">
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
  );
};

export default LoginTarget;
