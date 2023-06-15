import { Modal } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ButtonAddUser = () => {
  const [opened, setOpened] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [t, i18n] = useTranslation("global");
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    region: "",
    country: "",
  });
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
  const paisesAmerica = [
    "Antigua y Barbuda",
    "Argentina",
    "Bahamas",
    "Barbados",
    "Belice",
    "Bolivia",
    "Brasil",
    "Canadá",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Dominica",
    "Ecuador",
    "El Salvador",
    "Estados Unidos",
    "Granada",
    "Guatemala",
    "Guyana",
    "Haití",
    "Honduras",
    "Jamaica",
    "México",
    "Nicaragua",
    "Panamá",
    "Paraguay",
    "Perú",
    "República Dominicana",
    "San Cristóbal y Nieves",
    "Santa Lucía",
    "San Vicente y las Granadinas",
    "Surinam",
    "Trinidad y Tobago",
    "Uruguay",
    "Venezuela",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmationForm = Object.values(form);

    if (confirmationForm.some((value) => value.length === 0)) {
      return Toast.fire({
        icon: "error",
        title: "Faltan elementos por completar",
      });
    }

    function objectToFormData(obj) {
      const formData = new FormData();
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          formData.append(key, obj[key]);
        }
      }
      return formData;
    }

    const sendObj =
      user.companyId === null
        ? {
            ...form,
            distributionChannelId: user.distributionChannel.soldToParty,
            companyId: null,
          }
        : {
            ...form,
            companyId: user.company.resellerMasterId,
            distributionChannelId: null,
          };

    axios
      .post(
        `https://hooks.zapier.com/hooks/catch/666990/3ut1c6c/`,
        objectToFormData(sendObj)
      )
      .then(() => {
        return Swal.fire({
          icon: "success",
          title: `${t("participantes.solSend")}`,
          text: `${t("participantes.solRes")}`,
          confirmButtonColor: "#eb1000",
          footer: `<p class="text-center">${t(
            "participantes.contact"
          )} <a href='mailto:info@adobepcclub.com' class="text-[#eb1000] font-bold text-center">info@adobepcclub.com</a></p>`,
        }).then((result) => {
          if (result.isConfirmed) {
            setForm({
              name: "",
              lastName: "",
              email: "",
              password: "",
              role: "",
              region: "",
              country: "",
            });
            setOpened(false);
          }
        });
      })
      .catch((err) => {
        return Toast.fire({
          icon: "error",
          title: t("tabla.notiError"),
        });
      });

    return;
  };

  const handleChange = (e) => {
    return setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Modal
        className="modal100"
        onClose={() => setOpened(false)}
        opened={opened}
        size={"100%"}
      >
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-6 h-[90vh]">
            <div className="flex flex-col gap-6 items-center">
              <p className="!text-2xl font-bold">
                Solicitud para creación de usuario
              </p>
              <p className="!text-sm ">
                Agrega personas y crea un equipo de trabajo.
              </p>
            </div>
            <div>
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label className="label">
                    <span className="label-text">Nombre</span>
                  </label>
                  <input
                    className="input input-bordered"
                    type="text"
                    onChange={handleChange}
                    name="name"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="label">
                    <span className="label-text">Apellido</span>
                  </label>
                  <input
                    className="input input-bordered"
                    type="text"
                    onChange={handleChange}
                    name="lastName"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">Correo</span>
                </label>
                <input
                  className="input input-bordered"
                  type="email"
                  onChange={handleChange}
                  name="email"
                  autocomplete="off"
                  required
                />
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label className="label">
                    <span className="label-text">Región</span>
                  </label>
                  <select
                    className="select select-bordered"
                    onChange={handleChange}
                    name="region"
                    required
                  >
                    <option disabled selected>
                      Selecciona la región
                    </option>
                    <option value="NOLA">NOLA</option>
                    <option value="SOLA">SOLA</option>
                    <option value="BRAZIL">Brasil</option>
                    <option value="MEXICO">México</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="label">
                    <span className="label-text">País</span>
                  </label>
                  <select
                    className="select select-bordered"
                    onChange={handleChange}
                    name="country"
                    required
                  >
                    <option disabled selected>
                      Selecciona el país
                    </option>
                    {paisesAmerica.map((value) => (
                      <option value={value}>{value}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">Rol</span>
                </label>
                <select
                  className="select select-bordered"
                  onChange={handleChange}
                  name="role"
                  required
                >
                  <option disabled selected>
                    Selecciona el rol
                  </option>
                  <option value="2">Partner Principal</option>
                  <option value="5">Sales Rep</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">Contraseña temporal</span>
                </label>
                <input
                  className="input input-bordered"
                  type="password"
                  onChange={handleChange}
                  name="password"
                  autocomplete="off"
                  required
                />
              </div>
            </div>
            <div className="flex justify-around mt-auto">
              <button
                className="btn btn-cancel w-48"
                onClick={() => setOpened(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-info w-48" onClick={handleSubmit}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <button className="btn btn-primary w-1/2" onClick={() => setOpened(true)}>
        Agregar Usuario
      </button>
    </>
  );
};

export default ButtonAddUser;
