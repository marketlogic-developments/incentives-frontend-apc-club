import { NotiSwal } from "notifications/notifications";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RequestNewPasswordService } from "services/Login/login.service";
import Swal from "sweetalert2";

const RequestNewPassword = () => {
  const [t, i18n] = useTranslation<string>("global"); //Traducción
  const emailRef = useRef<HTMLInputElement>(null);

  const handleRequestNewPass = (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const email = emailRef?.current?.value;

      if (!email) {
        throw new Error("Please, typing a valid email");
      }

      RequestNewPasswordService({ email: email, lang: i18n.language });

      NotiSwal({ text: String(t("login.correoenviado")) });
    } catch (err: any) {
      console.error(err);
      NotiSwal({ text: String(t("login.correonotfound")) });
    }
  };

  return (
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
            placeholder={String(t("login.Email"))}
            className="input w-full text-black border-gray-500"
          />
        </label>
        <button className="btn btn-primary">
          {t("dashboard.cambiarpass")}
        </button>
      </form>
    </div>
  );
};

export default RequestNewPassword;
