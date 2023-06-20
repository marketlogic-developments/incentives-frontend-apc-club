import { Autocomplete, Modal } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const AgregarParticipante = ({ setParticipantes, participantes }) => {
  const [opened, setOpened] = useState(false);
  const [modal, setModal] = useState(0);
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const company = useSelector((state) => state.user.company);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    region: "",
    country: "",
  });
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

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

    function objectToFormData(obj) {
      const formData = new FormData();
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          formData.append(key, obj[key]);
        }
      }
      return formData;
    }

    const objAxios = {
      name: `${form.name} ${form.lastName}`,
      email: form.email,
      password: form.password,
      roleId: Number(form.role.split("-")[0]),
      policy: false,
      passwordReset: false,
      region: form.region,
      cpf: "N/A",
      companyId: company.id,
      countryId: form.country,
      names: form.name,
      lastName: form.lastName,
      position: form.role.split("-")[1],
      phoneNumber: form.phone,
      operationStatusId: 4,
      academicDegreeId: 1,
      languageId: form.region === "BRAZIL" ? 1 : 2,
    };

    const sendObj =
      user.companyId === null
        ? {
            ...objAxios,
            distributionChannelId: user.distributionChannel.soldToParty,
            companyId: null,
          }
        : {
            ...objAxios,
            companyId: user.company.resellerMasterId,
            distributionChannelId: null,
          };

    axios
      .post(
        `https://hooks.zapier.com/hooks/catch/666990/3ut1c6c/`,
        objectToFormData(sendObj)
      )
      .then((res) => {
        return Swal.fire({
          icon: "success",
          title: `${t("participantes.solSend")}`,
          text: `${t("participantes.solRes")}`,
          confirmButtonColor: "#eb1000",
          footer: `<p class="text-center">${t(
            "participantes.contact"
          )} <a href='mailto:info@adobepcclub.com' class="text-[#eb1000] font-bold text-center">info@adobepcclub.com</a></p>`,
        });
      })
      .catch((err) => {
        return Toast.fire({
          icon: "error",
          title: t("tabla.notiError"),
          background: "#000000",
          color: "#fff",
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

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return (
        <div>
          <div>
            <div className="w-full flex flex-col items-center">
              <h3 className="text-lg font-bold text-red-500">
                {t("tabla.addParticipante")}
              </h3>
              <form
                className="grid grid-cols-2 gap-5 w-11/12"
                onSubmit={handleSubmit}
              >
                <label className="inputCreateUser">
                  <span className="label-text"> {t("user.nombre")}</span>
                  <input
                    type="text"
                    placeholder={t("user.escriba")}
                    className="input input-bordered w-full"
                    name="name"
                    onChange={handleChange}
                  />
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">{t("user.apellido")}</span>
                  <input
                    type="text"
                    placeholder={t("user.escriba")}
                    className="input input-bordered w-full"
                    name="lastName"
                    onChange={handleChange}
                  />
                </label>

                <label className="inputCreateUser">
                  <span className="label-text">
                    {t("participantes.correo")}
                  </span>
                  <input
                    type="text"
                    placeholder={t("user.escriba")}
                    className="input input-bordered w-full"
                    name="email"
                    onChange={handleChange}
                  />
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">
                    {t("participantes.password")}
                  </span>
                  <input
                    type="text"
                    placeholder={t("user.escriba")}
                    className="input input-bordered w-full"
                    name="password"
                    onChange={handleChange}
                  />
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">{t("participantes.rol")}</span>
                  <select
                    className="select select-bordered w-full"
                    name="role"
                    onChange={handleChange}
                  >
                    <option value="">{t("user.seleccionarRol")}</option>
                    <option value="2-Partner Principal">
                      Partner Principal
                    </option>
                    <option value="5-Sales Rep">Sales Rep</option>
                  </select>
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">
                    {t("participantes.Region")}
                  </span>
                  <select
                    className="select select-bordered w-full"
                    name="region"
                    onChange={handleChange}
                  >
                    <option value="">{t("participantes.Region")}</option>
                    <option value="NOLA">NOLA</option>
                    <option value="SOLA">SOLA</option>
                    <option value="MÉXICO">MEXICO</option>
                    <option value="BRAZIL">BRAZIL</option>
                  </select>
                </label>
                <label className="inputCreateUser">
                  <span className="label-text">País</span>
                  <select
                    className="select select-bordered w-full"
                    name="country"
                    onChange={handleChange}
                  >
                    <option value="">País</option>
                    {paisesAmerica.map((e) => {
                      return <option value={e}>{e}</option>;
                    })}
                  </select>
                </label>

                <button
                  type="submit"
                  className="btn btn-primary w-max col-span-2 justify-self-center"
                >
                  {t("user.enviarSol")}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    if (modal === 2) {
      return (
        <div>
          <div>
            <h3 className="text-lg font-bold text-red-500">Usuario agregado</h3>
            <p className="py-4">Usuario agregado con exito.</p>
          </div>
        </div>
      );
    }
  }, [modal, form]);

  const isMobile = window.innerWidth <= 768;
  const modalSize = isMobile ? "100%" : "60%";

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        centered
        size={modalSize}
      >
        {typeModal}
      </Modal>
      <button
        onClick={() => {
          setOpened(true);
        }}
        className="btn bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-max"
      >
        {t("tabla.agregarP")}
      </button>
    </>
  );
};

export default AgregarParticipante;
