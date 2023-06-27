import React, { useState } from "react";
import { Checkbox } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  AlertCircule,
  ArrowDown,
  ArrowRedo,
  BrushOutline,
  ChatBox,
  CustomIcon,
  GiftOutline,
  Laptop,
  Pricetag,
  Question,
  SparklesOutline,
} from "../../icons";
import { SelectInput } from "../../inputs";
import { alert } from "../../alert/Alert";
import { useSelector } from "react-redux";
import axios from "axios";

const ModalCustomerCare = ({ closeModal }) => {
  const [t, i18n] = useTranslation("global");
  const user = useSelector((state) => state.user.user);
  const dataSelectOne = [
    {
      image: <Question />,
      value: "Inquietud o pregunta",
      label: "Inquietud o pregunta",
    },
    {
      image: <AlertCircule />,
      value: "Reporte de error",
      label: "Reporte de error",
    },
    { image: <ChatBox />, value: "Sugerencia", label: "Sugerencia" },
    { image: <BrushOutline />, value: "Otros", label: "Otros" },
  ];
  const dataSelectTwo = [
    { image: <GiftOutline />, value: "Redenciones", label: "Redenciones" },
    { image: <SparklesOutline />, value: "DigiPoints", label: "DigiPoints" },
    {
      image: <ArrowRedo />,
      value: "Distribución de DigiPointsSugerencia",
      label: "Distribución de DigiPointsSugerencia",
    },
    { image: <Pricetag />, value: "Ventas", label: "Ventas" },
    { image: <Laptop />, value: "Plataforma web", label: "Plataforma web" },
  ];
  const [form, setForm] = useState({
    type: "",
    subject: "",
    description: "",
    contactEmail: false,
    contactWhatsApp: false,
  });

  const handleChange = (type, info) => {
    setForm({ ...form, [type]: info });
  };

  const handleSubmit = () => {
    const { description, subject, type } = form;

    const country =
      user.companyId === null
        ? user.distributionChannel.country
        : user.company.country;

    const objSend = {
      subject,
      type,
      description: `${form.description} | ${
        form.contactEmail && "Autorización para contactar por correo"
      } | ${
        form.contactWhatsApp && "Autorización para contactar por WhatsApp"
      }`,
      email: user.email,
      region: user.region,
      country: country === null ? "-None-" : country,
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
          contactEmail: false,
          contactWhatsApp: false,
        });
        closeModal();
        alert({
          position: "top-end",
          icon: "success",
          title:
            "Hemos recibido tu solicitud exitosamente, nos pondremos en contacto contigo lo más pronto posible.",
          width: "30%",
        });
      });
  };

  return (
    <div className="grid grid-rows-9 mr-8 ml-8 mb-8">
      <div className="flex justify-center pb-2">
        <CustomIcon />
      </div>
      <div className="flex justify-center font-bold text-xl pb-3">
        {t("modalCustomerCare.ayuda")}
      </div>
      <div className="text-center text-sm">
        <p>{t("modalCustomerCare.infoUno")}</p>
        <p>{t("modalCustomerCare.infoDos")}</p>
        <p className="font-bold">{t("modalCustomerCare.infoTres")}</p>
      </div>
      <div className="mt-2">
        <div className="flex justify-start font-bold pb-2 text-sm">
          {t("modalCustomerCare.asunto")} <p className="text-red-600">*</p>
        </div>
        <SelectInput
          placeholder="Asunto"
          data={dataSelectOne}
          icon={<ArrowDown />}
          onChange={handleChange}
          name={"subject"}
        />
      </div>
      <div className="mt-2">
        <div className="flex justify-start font-bold pb-2 text-sm">
          {t("modalCustomerCare.asociado")}
        </div>
        <SelectInput
          placeholder={t("modalCustomerCare.relacionAsunto")}
          data={dataSelectTwo}
          icon={<ArrowDown />}
          onChange={handleChange}
          name={"type"}
        />
      </div>
      <div className="mt-2">
        <div className="flex justify-start font-bold pb-2 text-sm">
          {t("modalCustomerCare.descripcion")}
          <p className="text-red-600">*</p>
        </div>
        <div className="w-full">
          <textarea
            className="w-full textarea bg-gray-100 textarea-lg textarea-bordered min-h-[180px]"
            type="text"
            placeholder={t("user.escriba")}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            name="description"
          />
        </div>
      </div>
      <div className="flex justify-start items-center text-sm mb-3">
        <Checkbox
          className="mr-4"
          onChange={(e) => handleChange("contactEmail", e.target.checked)}
        />
        {t("modalCustomerCare.aceptoCorreo")}
        <p className="text-red-600">*</p>
      </div>
      <div className="flex justify-start items-center text-sm mb-3">
        <Checkbox
          className="mr-4"
          onChange={(e) => handleChange("contactWhatsApp", e.target.checked)}
        />
        {t("modalCustomerCare.aceptoMovil")}
      </div>
      <div className="flex justify-center">
        <button
          className="btn btn-md min-h-full bg-blue-600 hover:bg-blue-500 border-none min-w-[290px]"
          onClick={handleSubmit}
        >
          {t("modalCustomerCare.enviar")}
        </button>
      </div>
    </div>
  );
};

export default ModalCustomerCare;
