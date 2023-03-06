import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CardProduct from "./CardProduct";

const ModalProducts = ({ data }) => {
  const [t, i18n] = useTranslation("global");
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);

  useEffect(() => {
    if (Number(data.operationStatusId) === 13) {
      setState1(true);
      return;
    }
    if (Number(data.operationStatusId) === 14) {
      setState1(true);
      setState2(true);
      return;
    }
    if (Number(data.operationStatusId) === 15) {
      setState1(true);
      setState2(true);
      setState3(true);
      return;
    }
    if (Number(data.operationStatusId) === 16) {
      setState1(true);
      setState2(true);
      setState3(true);
      setState4(true);
      return;
    }
  });

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="font-bold text-2xl py-5">{t("redenciones.rastrear")}</p>
        <div className="w-full flex h-full">
          <div className="row w-full">
            <div className="col-12 col-md-10 pt45 pb20 h-full flex">
              <div className="flex w-full items-center">
                <div className={`order-tracking ${state1 && "completed"} `}>
                  <span className="is-complete"></span>
                  <p>
                    {t("redenciones.recibido")}
                    <br />
                  </p>
                </div>
                <div
                  className={`order-tracking ${
                    (state1, state2) && "completed"
                  } `}
                >
                  <span className="is-complete"></span>
                  <p>
                    {t("redenciones.aprobado")}
                    <br />
                  </p>
                </div>
                <div
                  className={`order-tracking ${
                    (state1, state2, state3) && "completed"
                  } `}
                >
                  <span className="is-complete"></span>
                  <p>
                    {t("redenciones.proceso")}
                    <br />
                  </p>
                </div>
                <div
                  className={`order-tracking ${
                    (state1, state2, state3, state4) ? "completed" : null
                  } `}
                >
                  <span className="is-complete"></span>
                  <p>
                    {t("redenciones.enviar")}
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold text-2xl py-5">{t("redenciones.solicitado")}</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {data.productsObject.map((info, index) => {
          return <CardProduct info={info} index={index} />;
        })}
      </div>
    </div>
  );
};

export default ModalProducts;
