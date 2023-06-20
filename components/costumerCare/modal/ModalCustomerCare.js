import React from "react";
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

const ModalCustomerCare = () => {
  const [t, i18n] = useTranslation("global");
  const dataSelectOne = [
    { image: <Question />, value: "question", label: "Inquietud o pregunta" },
    { image: <AlertCircule />, value: "report", label: "Reporte de error" },
    { image: <ChatBox />, value: "sug", label: "Sugerencia" },
    { image: <BrushOutline />, value: "other", label: "Otros" },
  ];
  const dataSelectTwo = [
    { image: <GiftOutline />, value: "redention", label: "Redenciones" },
    { image: <SparklesOutline />, value: "digipoints", label: "DigiPoints" },
    {
      image: <ArrowRedo />,
      value: "distri",
      label: "Distribución de DigiPointsSugerencia",
    },
    { image: <Pricetag />, value: "sales", label: "Ventas" },
    { image: <Laptop />, value: "platform", label: "Plataforma web" },
  ];
  return (
    <div className="grid grid-rows-9 mr-8 ml-8 mb-8">
      <div className="flex justify-center pb-2">
        <CustomIcon />
      </div>
      <div className="flex justify-center font-bold text-xl pb-3">
        ¿Cómo podemos ayudar?
      </div>
      <div className="text-center text-sm">
        <p>Si tienes alguna solicitud o sugerencia compártela con nosotros,</p>
        <p>
          nuestros expertos se pondrán en contacto contigo lo más pronto posible
          o escríbenos a
        </p>
        <p className="font-bold">info@adobepcclub.com</p>
      </div>
      <div className="mt-2">
        <div className="flex justify-start font-bold pb-2 text-sm">
          Asunto <p className="text-red-600">*</p>
        </div>
        <SelectInput
          placeholder={"Nombre completo"}
          data={dataSelectOne}
          icon={<ArrowDown />}
        />
      </div>
      <div className="mt-2">
        <div className="flex justify-start font-bold pb-2 text-sm">
          Asociado
        </div>
        <SelectInput
          placeholder={"Selecciona con qué está relacionado el asunto"}
          data={dataSelectTwo}
          icon={<ArrowDown />}
        />
      </div>
      <div className="mt-2">
        <div className="flex justify-start font-bold pb-2 text-sm">
          Descripcion<p className="text-red-600">*</p>
        </div>
        <div className="w-full">
          <textarea
            className="w-full textarea bg-gray-100 textarea-lg textarea-bordered min-h-[180px]"
            type="text"
            placeholder={t("user.escriba")}
          />
        </div>
      </div>
      <div className="flex justify-start items-center text-sm mb-3">
        <Checkbox className="mr-4" />
        Acepto ser contactado por correo <p className="text-red-600">*</p>
      </div>
      <div className="flex justify-start items-center text-sm mb-3">
        <Checkbox className="mr-4" />
        Acepto ser contactado por WhatsApp o vía telefónica
      </div>
      <div className="flex justify-center">
        <button className="btn btn-md min-h-full bg-blue-600 hover:bg-blue-500 border-none min-w-[290px]">
          Enviar solicitud
        </button>
      </div>
    </div>
  );
};

export default ModalCustomerCare;
