import React from "react";
import { Check, Circle, Upload, Redeem } from "../../../icons";
import { useTranslation } from "react-i18next";

const DigiPointsTotal = ({ dataLoaded, totalSaleGoal }) => {
  const [t, i18n] = useTranslation("global");

  const formattedNumber = (numero) => {
    // Redondear el número hacia abajo para eliminar la parte decimal
    numero = Math.floor(numero);

    // Convertir el número a cadena de texto
    let numeroStr = numero.toString();

    // Dividir la cadena en grupos de tres caracteres desde la derecha
    let grupos = [];
    while (numeroStr.length > 0) {
      grupos.unshift(numeroStr.slice(-3));
      numeroStr = numeroStr.slice(0, -3);
    }

    // Unir los grupos con comas y retornar el resultado
    return grupos.join(",");
  };
  return (
    <>
      <div className="p-3">
        <h1 className="text-black font-bold">DigiPoints</h1>
      </div>
      <div className="grid sm:grid-cols-3 grid-rows-1 sm:divide-x gap-2">
        {!dataLoaded && <div className="lds-dual-ring"></div>}
        <div className="flex sm:justify-center justify-start gap-3">
          <Upload />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Uploaded</h3>
            <h1 className="text-black font-bold">{formattedNumber(totalSaleGoal.expected)}</h1>
          </div>
        </div>
        <div className="flex sm:justify-center justify-start gap-3">
          <Check />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Assigned {totalSaleGoal.expected !== 0 ? ((totalSaleGoal.reached / totalSaleGoal.expected) * 100).toFixed(2) : 0 }%</h3>
            <h1 className="text-black font-bold">{formattedNumber(totalSaleGoal.reached)}</h1>
          </div>
        </div>
        <div className="flex sm:justify-center justify-start gap-3">
          <Redeem />
          <div className="grid">
            <h3 className="text-gray-400 font-bold">Redeemed {totalSaleGoal.reached !== 0 ? ((totalSaleGoal.progress / totalSaleGoal.reached) * 100).toFixed(2) : 0 }%</h3>
            <h1 className="text-black font-bold">{formattedNumber(totalSaleGoal.progress)}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigiPointsTotal;
