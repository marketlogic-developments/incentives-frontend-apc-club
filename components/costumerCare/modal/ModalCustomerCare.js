import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowDown, CustomIcon, Question } from "../../icons";
import { SelectInput } from "../../inputs";

const ModalCustomerCare = () => {
  const [t, i18n] = useTranslation("global");
  const dataSelectOne = [
    { image: <Question />, value: "question", label: "Inquietud o pregunta" },
    { image: "", value: "report", label: "Reporte de error" },
    { image: "", value: "sug", label: "Sugerencia" },
    { image: "", value: "other", label: "Otros" },
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
        <SelectInput placeholder={"Nombre completo"} data={dataSelectOne} />
      </div>
      <div className="mt-2">
        <div className="flex justify-start font-bold pb-2 text-sm">
          Asociado
        </div>
        <SelectInput />
      </div>
      <div>
        <div className="flex justify-start">Descripcion</div>
        <div className="w-full">
          <textarea
            className="w-full textarea textarea-lg textarea-bordered min-h-[180px]"
            type="text"
            placeholder={t("user.escriba")}
          />
        </div>
      </div>
      <div>
        {/* <input type="checkbox" checked="checked" className="checkbox" /> */}
      </div>
      <div>
        {/* <input type="checkbox" checked="checked" className="checkbox" /> */}
      </div>
      <div className="flex justify-center">
        <button className="btn">Enviar solicitud</button>
      </div>
    </div>
  );
};

export default ModalCustomerCare;
