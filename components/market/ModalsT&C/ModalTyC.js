import React from "react";
import PersonModalTyC from "./ilustrations/PersonModalTyC";

const ModalTyC = ({ setModal }) => {
  return (
    <div className="flex flex-col gap-6 px-10 py-20 items-center">
      <div>
        <PersonModalTyC />
      </div>
      <div className="text-center">
        <p className="font-bold !text-xl">Términos y Condiciones</p>
        <p className="text-[#828282] !text-base">Actualización el dd/mm/yy</p>
      </div>
      <div>
        <p className="text-center !text-xs">
          Se actualizaron los términos y condiciones del uso de la plataforma
          Adobe APC Club para <br /> poder seguir utilizándola debes leer y
          firmar la actualización.
        </p>
      </div>
      <button className="btn btn-info w-fit" onClick={() => setModal(1)}>
        Conocer nuevos términos y condiciones
      </button>
    </div>
  );
};

export default ModalTyC;
