import axios from "axios";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ModalFormCustomer = () => {
  const [t, i18n] = useTranslation("global");
  const user = useSelector((state) => state.user.user);
  const [form, setForm] = useState({
    type: "",
    subject: "",
    description: "",
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const objSend = {
      ...form,
      email: user.email,
      region: user.region,
      country: user.countryId.length === 0 ? "-None-" : user.countryId,
      company:
        user.companyId === null
          ? user.distributionChannel.nameDist
          : user.company.name,
      userName: user.name,
      userLastName: user.lastName,
    };

    const formData = new FormData();

    for (let property in objSend) {
      formData.append(property, objSend[property]);
    }

    return axios
      .post("https://hooks.zapier.com/hooks/catch/666990/34yutk3/", formData)
      .then(() => {
        setForm({
          type: "",
          subject: "",
          description: "",
        });
        return Toast.fire({
          icon: "success",
          title: t("notifications.ticketZoho"),
          background: "#000000",
          color: "#fff",
        });
      });
  };

  return (
    <div>
      <div className="flex w-full justify-center flex-col gap-5">
        <h2 className="text-xl text-[#eb1000] font-bold text-center">
          {t("dashboard.titleTickets")}
        </h2>
        <p className="text-md font-bold text-center">
          {t("dashboard.descripcionTickets")}
        </p>
      </div>
      <div className="w-full flex flex-col items-center gap-5">
        <div className="form-control w-9/12">
          <label className="label">
            <span className="label-text">{t("tabla.typeSolicitud")}</span>
          </label>
          <select
            className="input input-bordered w-full"
            name="type"
            onChange={handleChange}
            value={form.type}
          >
            <option value={""}>{t("tabla.elegirSol")}</option>
            <option value={"Tarjetas"}>{t("tabla.tarjetasSolicitud")}</option>
            <option value={"Cambio de rol"}>
              {t("tabla.cambioRolSolicitud")}
            </option>
            <option value={"Cambio de correo"}>
              {t("tabla.cambioEmailSolicitud")}
            </option>
            <option value={"DigiPoints"}>DigiPoints</option>
            <option value={"Otro"}>{t("tabla.otroSolicitud")}</option>
          </select>
          <label className="label">
            <span className="label-text">Subject</span>
          </label>
          <input
            className="input input-bordered w-full"
            type="text"
            name="subject"
            placeholder={t("user.escriba")}
            required
            value={form.subject}
            onChange={handleChange}
          />
          <label className="label">
            <span className="label-text">{t("modalEquipos.descripcion")}</span>
          </label>
          <textarea
            className="textarea textarea-lg textarea-bordered min-h-[180px]"
            type="text"
            placeholder={t("user.escriba")}
            name="description"
            required
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          {t("user.enviarSol")}
        </button>
      </div>
    </div>
  );
};

export default ModalFormCustomer;
