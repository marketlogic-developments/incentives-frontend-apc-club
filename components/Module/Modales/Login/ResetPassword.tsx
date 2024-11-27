import { Modal } from "@mantine/core";
import { useQueryParam } from "hooks/useQueryParam";
import { NotiSwal } from "notifications/notifications";
import React, { SetStateAction, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { ResetPasswordService } from "services/Login/login.service";

interface Props {}

interface Checks {
  lenght: boolean;
  lowercase: boolean;
  uppercase: boolean;
  specialChar: boolean;
  number: boolean;
  allValid: boolean;
}

const ResetPassword = ({}: Props) => {
  const [t, i18n] = useTranslation<string>("global"); //Traducción
  //useState
  const [showpassword, setShowPassword] = useState<boolean>(false);
  const [checks, setChecks] = useState<Checks>({
    lenght: false,
    lowercase: false,
    number: false,
    specialChar: false,
    uppercase: false,
    allValid: false,
  });
  const queryToken=useQueryParam("token")

  //inputs
  const passwordRef = useRef<HTMLInputElement>(null);

  const validatePassword = (password: string): void => {
    const validations = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    };

    // Actualiza el estado con los checks individuales
    return setChecks((prev) => ({
      ...prev,
      allValid: Object.values(validations).every(Boolean),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const password = passwordRef?.current?.value;

      if (!password) {
        throw new Error("Password no valid");
      }

      ResetPasswordService({
        newPassword: password,
        token: queryToken,
      });

      NotiSwal({ text: String(t("login.donechangepass")) });
    } catch (err: any) {
      NotiSwal({ text: String(t("login.errorchangepass")) });
    }
  };

  return (
    <div className="flex flex-col w-full items-center text-center gap-10">
      <p className="text-3xl text-primary">{t("dashboard.bienvenido")}</p>
      <p className="text-xl">{t("dashboard.continuar")}</p>

      <form
        className="flex flex-col items-center gap-5 w-full"
        onSubmit={handleSubmit}
      >
        <div className="relative w-2/4 max-sm:w-full">
          <input
            type={showpassword ? "text" : "password"}
            placeholder={String(t("dashboard.digitar"))}
            className="input input-bordered input-primary w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            onChange={(e) => validatePassword(e.target.value)}
            ref={passwordRef}
          />
          <button
            type="button"
            title="viewPassword"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-4 py-2 text-gray-700 hover:text-gray-600 focus:outline-none"
          >
            {showpassword ? (
              <AiOutlineEyeInvisible className="h-5 w-5 fill-[#000]" />
            ) : (
              <AiOutlineEye className="h-5 w-5 fill-[#000]" />
            )}
          </button>
        </div>
        <div className="w-auto flex flex-col justify-center items-center">
          <div className="item-icon">
            <AiOutlineCheckCircle
              className={`h-5 w-5 fill-[${
                checks.uppercase ? "#047857" : "#000"
              }]`}
            />
            <p className="checkitem">{t("dashboard.contieneUL")}</p>
          </div>
          {/* {containsLL ? (
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
          )} */}
        </div>
        <button
          className={`btn ${
            checks.allValid
              ? "btn-primary"
              : "btn-active btn-ghost pointer-events-none"
          }`}
        >
          {t("dashboard.cambiarpass")}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
