import axios from "axios";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const Registro = ({ close, register }) => {
  const [t, i18n] = useTranslation("global");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
  });

  const [firstname, setFirstname] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [textarea, setTextarea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("First_Name", firstname);
    formData.append("Email", email);
    formData.append("Phone", phone);
    formData.append("Company", company);
    formData.append("textArea", textarea);

    axios
      .post("https://hooks.zapier.com/hooks/catch/666990/3bgdttq/", formData)
      .then(() => {
        setFirstname("");
        setCompany("");
        setPhone("");
        setEmail("");
        setTextarea("");
        close(false);

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
          title: t("login.doneregister"),
        });
      })
      .catch((error) => {
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
          title: t("login.notregister"),
        });
      });
  };

  return (
    <div
      className={`bg-base-100 h-screen max-sm:h-full w-[50%] max-sm:w-full absolute z-50 right-0 rounded-l-3xl ${
        register === null ? "none" : register ? "register" : "registerDisappear"
      }  border-l-2 max-sm:rounded-none border-primary shadow-xl-3xl px-10 py-10 flex flex-col max-sm:items-start items-center registerGlobal`}
    >
      {register && (
        <div className="w-full">
          <button onClick={() => close(false)}>
            <svg
              width="46"
              height="46"
              fill="none"
              stroke="#cccccc"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m18.75 5.25-13.5 13.5"></path>
              <path d="M18.75 18.75 5.25 5.25"></path>
            </svg>
          </button>
        </div>
      )}

      <div
        className={`h-full flex items-center ${
          register ? "registerForm" : "registerFormDis"
        } w-full`}
      >
        <div
          className="card w-full text-primary-content margin-auto"
          id="cardLogin"
        >
          <div className="card-body items-center justify-between max-sm:justify-center flex px-20 max-sm:px-5 internalCard">
            <div className="w-full">
              <div className="flex justify-between max-sm:text-center max-sm:justify-center card-login">
                <h1
                  className="card-title text-black font-bold max-sm:text-center py-5 w-full justify-center"
                  style={{ color: "#00405d", fontSize: "2.00rem" }}
                >
                  Regístrate
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
                    {t("login.nombreC")}
                    <input
                      required
                      type="text"
                      placeholder={t("login.esNombre")}
                      className="input input-bordered input-warning w-full text-black"
                      name="name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </label>
                  <label className="label flex flex-col w-full items-start">
                    {t("login.email")}
                    <input
                      required
                      type="email"
                      placeholder={t("login.esEmail")}
                      className="input w-full text-black input-bordered input-warning"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label className="label flex flex-col w-full items-start">
                    {t("login.telefono")}
                    <input
                      type="number"
                      minLength={6}
                      maxLength={20}
                      placeholder={t("login.ingresa")}
                      className="input w-full text-black input-bordered input-warning"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                  <label className="label flex flex-col w-full items-start">
                    {t("login.empresa")}
                    <input
                      required
                      type="text"
                      placeholder={t("login.esEmpresa")}
                      className="input w-full text-black input-bordered input-warning"
                      name="companyName"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </label>
                  <label className="label flex flex-col w-full items-start">
                    {t("login.comentario")}
                    <textarea
                      type="text"
                      placeholder={t("login.esComentario")}
                      cols={33}
                      className="input w-full text-black max-h-[300px] min-h-[80px] input-bordered input-warning"
                      name="message"
                      value={textarea}
                      onChange={(e) => setTextarea(e.target.value)}
                    />
                  </label>
                </div>

                <button className="btn btn-secondary w-full" type="submit">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
