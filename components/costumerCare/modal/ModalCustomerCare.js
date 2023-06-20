import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowDown, CustomIcon } from "../../icons";
import { SelectInput } from "../../inputs";
import { Select } from "@mantine/core";

const ModalCustomerCare = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="grid grid-rows-9">
      <div className="flex justify-center pb-2">
        <CustomIcon />
        {/* Colocar junto con la x o por lo menos lo mas cerca posible */}
      </div>
      <div className="flex justify-center font-bold text-xl pb-3">
        ¿Cómo podemos ayudar?
      </div>
      <div className="text-center text-sm">
          Si tienes alguna solicitud o sugerencia compártela con nosotros,
          nuestros expertos se pondrán en contacto contigo lo más pronto posible
          o escríbenos a
        <p className="font-bold">info@adobepcclub.com</p>
      </div>
      <div className="mt-2">
        <div className="flex justify-start font-bold pb-2 text-sm">
          Asunto <p className="text-red-600">*</p>
        </div>
        <SelectInput placeholder={"Nombre completo"}/>
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
