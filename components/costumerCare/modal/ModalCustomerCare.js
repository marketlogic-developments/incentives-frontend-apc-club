import React, { useMemo, useState } from "react";
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
  const [form, setForm] = useState({
    type: "",
    subject: "",
    description: "",
    contactEmail: false,
    contactWhatsApp: false,
  });
  const { user } = useSelector((state) => state.currentUser);
  const dataSelectOne = [
    t("formCustomerCare.option1"),
    t("formCustomerCare.option2"),
    t("formCustomerCare.option3"),
    t("formCustomerCare.option4"),
    t("formCustomerCare.option5"),
    t("formCustomerCare.option6"),
    t("formCustomerCare.option7"),
    t("formCustomerCare.option8"),
    t("formCustomerCare.option9"),
  ];

  const dataSelectTwo = useMemo(() => {
    if (form.subject === t("formCustomerCare.option1")) {
      return [
        t("formCustomerCare.option11"),
        t("formCustomerCare.option12"),
        t("formCustomerCare.option13"),
        t("formCustomerCare.option14"),
        t("formCustomerCare.option15"),
        t("formCustomerCare.option16"),
        t("formCustomerCare.option17"),
      ];
    }
    if (form.subject === t("formCustomerCare.option2")) {
      return [
        t("formCustomerCare.option21"),
        t("formCustomerCare.option22"),
        t("formCustomerCare.option23"),
        t("formCustomerCare.option24"),
        t("formCustomerCare.option25"),
      ];
    }
    if (form.subject === t("formCustomerCare.option3")) {
      return [
        t("formCustomerCare.option31"),
        t("formCustomerCare.option32"),
        t("formCustomerCare.option33"),
        t("formCustomerCare.option34"),
        t("formCustomerCare.option35"),
        t("formCustomerCare.option36"),
        t("formCustomerCare.option37"),
        t("formCustomerCare.option38"),
        t("formCustomerCare.option39"),
      ];
    }
    if (form.subject === t("formCustomerCare.option4")) {
      return [
        t("formCustomerCare.option41"),
        t("formCustomerCare.option42"),
        t("formCustomerCare.option43"),
        t("formCustomerCare.option44"),
        t("formCustomerCare.option45"),
        t("formCustomerCare.option46"),
        t("formCustomerCare.option47"),
        t("formCustomerCare.option48"),
        t("formCustomerCare.option49"),
        t("formCustomerCare.option410"),
      ];
    }
    if (form.subject === t("formCustomerCare.option5")) {
      return [
        t("formCustomerCare.option51"),
        t("formCustomerCare.option52"),
        t("formCustomerCare.option53"),
        t("formCustomerCare.option54"),
        t("formCustomerCare.option55"),
        t("formCustomerCare.option56"),
      ];
    }
    if (form.subject === t("formCustomerCare.option6")) {
      return [
        t("formCustomerCare.option61"),
        t("formCustomerCare.option62"),
        t("formCustomerCare.option63"),
        t("formCustomerCare.option64"),
        t("formCustomerCare.option65"),
        t("formCustomerCare.option66"),
        t("formCustomerCare.option67"),
        t("formCustomerCare.option68"),
        t("formCustomerCare.option69"),
        t("formCustomerCare.option610"),
      ];
    }
    if (form.subject === t("formCustomerCare.option7")) {
      return [
        t("formCustomerCare.option71"),
        t("formCustomerCare.option72"),
        t("formCustomerCare.option73"),
        t("formCustomerCare.option74"),
      ];
    }
    if (form.subject === t("formCustomerCare.option8")) {
      return [
        t("formCustomerCare.option81"),
        t("formCustomerCare.option82"),
        t("formCustomerCare.option83"),
      ];
    }
    if (form.subject === t("formCustomerCare.option9")) {
      return [t("formCustomerCare.option9")];
    }
  }, [form]);

  const handleChange = (type, info) => {
    if (type === "subject") {
      return setForm({ ...form, type: "", [type]: info });
    }

    setForm({ ...form, [type]: info });
  };

  const handleSubmit = () => {
    const { description, subject, type } = form;

    const objSend = {
      subject,
      type,
      description: `${form.description}`,
      email: user?.email,
      first_name: user?.profile?.first_name,
      last_name: user?.profile?.last_name,
      accept_contacted_mail: form.contactEmail === false ? "No" : "Si",
      accept_contacted_whatsapp: form.contactWhatsApp === false ? "No" : "Si"
    };

    const formData = new FormData();

    for (let property in objSend) {
      formData.append(property, objSend[property]);
    }

    return axios
      .post("https://marketlogic-automation-production.up.railway.app/webhook/send_mail_faq", formData)
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
    <div className="grid mr-8 ml-8 mb-8">
      <div className="flex justify-center pb-2">
        <CustomIcon />
      </div>
      <div className="flex justify-center font-bold text-xl pb-3">
        {t("modalCustomerCare.ayuda")}
      </div>
      <div className="text-center text-sm">
        <p>
          {t("modalCustomerCare.infoCero")}{" "}
          <a className="font-bold">{t("modalCustomerCare.apc")}</a>
          {t("modalCustomerCare.infoUno")}
        </p>
        <p>{t("modalCustomerCare.infoDos")}</p>
        <p>
          <a className="font-bold underline">
            {t("modalCustomerCare.infoTres")}
          </a>
          {t("modalCustomerCare.infoCuatro")}
        </p>
      </div>
      <div className="mt-2">
        <div className="font-bold mb-2">{t("modalCustomerCare.infoCinco")}</div>
        <div className="flex justify-start font-bold pb-2 text-sm">
          {t("modalCustomerCare.asunto")} <p className="text-red-600">*</p>
        </div>
        <SelectInput
          value={form.subject}
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
          value={form.type}
          name={"type"}
          disabled={form.subject === "" ? true : false}
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
            disabled={form.subject === "" || form.type === "" ? true : false}
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
