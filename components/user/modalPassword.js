import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { policyAndPassword } from "../../store/reducers/users.reducer";

const ModalPassword = ({ setOpened }) => {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [view, setView] = useState("password");
  const [view2, setView2] = useState("password");
  const [t, i18n] = useTranslation("global");

  const [passwordMatch, setPasswordMatch] = useState(""); // passwords match
  const [confirmPasswordMatch, setconfirmPasswordMatch] = useState(""); // passwords match
  const [borderPassword, setborderPassword] = useState(""); // passwords match
  // booleans for password validations
  const [containsUL, setContainsUL] = useState(false); // uppercase letter
  const [containsLL, setContainsLL] = useState(false); // lowercase letter
  const [containsN, setContainsN] = useState(false); // number
  const [containsSC, setContainsSC] = useState(false); // special character
  const [contains8C, setContains8C] = useState(false); // min 8 characters

  // checks all validations are true
  const [allValid, setAllValid] = useState(false);

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

  const handleSubmit = (data) => {
    data.preventDefault();

    axios
      .patch(
        `${process.env.BACKURL}/users/${user?.id}`,
        { password: data.target[0].value },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(policyAndPassword(res.data));
        setOpened(false);
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
      });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-10">
      <form
        className="flex flex-col items-center gap-5 w-full"
        onSubmit={(data) => {
          allValid ? handleSubmit(data) : handleError(data);
        }}
      >
        <div className="relative w-2/4 max-sm:w-full">
          <input
            type={view}
            placeholder={t("dashboard.digitar")}
            className={`input input-bordered input-primary w-full border ${
              allValid
                ? "border-green-600"
                : passwordMatch.length === 0
                ? "border-gray-300"
                : "border-red-300"
            } rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            required
            onChange={(data) => setPasswordMatch(data.target.value)}
            onKeyUp={() => validatePassword(passwordMatch)}
          />
          <button
            type="button"
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
        <div className="relative w-2/4 max-sm:w-full">
          <input
            type={view2}
            placeholder={"Confirma tu contraseña"}
            className={`input input-bordered input-primary w-full border ${
              confirmPasswordMatch.length === 0
                ? "border-gray-300"
                : borderPassword
            } rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            required
            onChange={(data) => setconfirmPasswordMatch(data.target.value)}
            onBlur={() =>
              confirmPasswordMatch === passwordMatch
                ? setborderPassword("border-green-600")
                : setborderPassword("border-red-300")
            }
          />

          <button
            type="button"
            onClick={() => {
              view2 === "password" ? setView2("text") : setView2("password");
            }}
            className="absolute inset-y-0 right-0 flex items-center px-4 py-2 text-gray-700 hover:text-gray-600 focus:outline-none"
          >
            {view2 === "text" ? (
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
            allValid && passwordMatch === confirmPasswordMatch
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

export default ModalPassword;
