import React from "react";
import { Check, Circle, Upload, Redeem } from "../../icons";
import { useTranslation } from "react-i18next";

const DigiPointsTotalD = ({ dataLoaded, totalSaleGoal }) => {
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
    <div className="flex flex-col w-full card-body">
      <div className="p-3">
        <h2 className=" !text-xl text-black font-bold">DigiPoints</h2>
      </div>
      <div className="flex h-full justiy-center w-full items-center">
        <div className="grid sm:grid-cols-2 grid-rows-1 gap-6 w-full h-[90%">
          {!dataLoaded && <div className="lds-dual-ring"></div>}
          <div className="flex sm:justify-center justify-start gap-3 row-span-2 items-center">
            <Upload />
            <div className="grid">
              <h3 className="text-gray-400 font-bold">Uploaded</h3>
              <h1 className="text-black font-bold">
                {formattedNumber(totalSaleGoal.expected)}
              </h1>
            </div>
          </div>
          <div className="flex sm:justify-center justify-start gap-3 items-center h-[150px]">
            <Check width={50} height={50} />
            <div className="grid">
              <h3 className="text-gray-400 font-bold">
                Assigned{" "}
                {totalSaleGoal.expected !== 0
                  ? (
                      (totalSaleGoal.reached / totalSaleGoal.expected) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </h3>
              <p className="text-black font-bold text-xl">
                {formattedNumber(totalSaleGoal.reached)}
              </p>
            </div>
          </div>
          <div className="flex sm:justify-center justify-start gap-3 items-center h-[150px]">
            <Redeem width={50} height={50} />
            <div className="grid">
              <h3 className="text-gray-400 font-bold">
                Redeemed{" "}
                {totalSaleGoal.reached !== 0
                  ? (
                      (totalSaleGoal.progress / totalSaleGoal.reached) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </h3>
              <p className="text-black font-bold text-xl">
                {formattedNumber(totalSaleGoal.progress)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigiPointsTotalD;
