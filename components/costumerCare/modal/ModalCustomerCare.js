import React from "react";
import { useTranslation } from "react-i18next";

const ModalCustomerCare = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="grid grid-rows-9">
      <div className="flex justify-center">HeadSetOutline</div>
      <div className="flex justify-center">Como podemos ayudar</div>
      <div className="flex justify-center">Texto</div>
      <div className="">
        <div className="flex justify-start">Asunto</div>
        <div>
          <select>hola</select>
        </div>
      </div>
      <div>
        <div className="flex justify-start">Asociado</div>
        <div>
          <select>hola</select>
        </div>
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
        <input type="checkbox" checked="checked" className="checkbox" />
      </div>
      <div>
        <input type="checkbox" checked="checked" className="checkbox" />
      </div>
      <div className="flex justify-center">
        <button className="btn">Enviar solicitud</button>
      </div>
    </div>
  );
};

export default ModalCustomerCare;
