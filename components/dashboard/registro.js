import axios from "axios";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Registro = ({ close, register }) => {
  const [t, i18n] = useTranslation("global");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("https://hooks.zapier.com/hooks/catch/666990/3bgdttq/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleChange = (e) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`bg-base-100 h-screen max-sm:h-full w-[50%] max-sm:w-full absolute z-50 right-0 rounded-l-3xl ${
        register ? "register" : "registerDisappear"
      } border-l-2 max-sm:rounded-none border-primary shadow-3xl px-10 py-10 flex flex-col max-sm:items-start items-center registerGlobal`}
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
                  Registrate
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
                    Nombre Completo
                    <input
                      required
                      type="text"
                      placeholder="Escribe tu nombre"
                      className="input input-bordered input-warning w-full text-black"
                      name="name"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="label flex flex-col w-full items-start">
                    Email
                    <input
                      required
                      type="email"
                      placeholder="Ingresa tu email"
                      className="input w-full text-black input-bordered input-warning"
                      name="email"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="label flex flex-col w-full items-start">
                    Número telefónico
                    <input
                      type="number"
                      minLength={6}
                      maxLength={20}
                      placeholder="Ingresa tu número telefónico"
                      className="input w-full text-black input-bordered input-warning"
                      name="phone"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="label flex flex-col w-full items-start">
                    Nombre de la compañía
                    <input
                      required
                      type="text"
                      placeholder="Ingresa el nombre de tu compañía"
                      className="input w-full text-black input-bordered input-warning"
                      name="companyName"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="label flex flex-col w-full items-start">
                    Escribe tu comentario (opcional)
                    <textarea
                      type="text"
                      placeholder="Escribe un mensaje..."
                      cols={33}
                      className="input w-full text-black max-h-[300px] min-h-[80px] input-bordered input-warning"
                      name="message"
                      onChange={handleChange}
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
