import Link from "next/link";
import React from "react";

const ModalTCETLA = ({ onClose }) => {
  return (
    <div className="flex flex-col gap-6 items-center p-6">
      <h2 className="font-bold text-primary">
        Terminos y Condiciones Enterprise
      </h2>
      <p>
        Queremos darte la bienvenida al programa, para continuar, por favor
        firma los teérminos y condiciones del programa
      </p>
      <Link href={"/etla/terminosycondiciones"}>
        <button className="btn btn-primary">
          Ir a los Términos y Condiciones
        </button>
      </Link>
    </div>
  );
};

export default ModalTCETLA;
