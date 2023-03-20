import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CardProduct from "./CardProduct";

const ModalProductsR = ({ data }) => {
  const [statusId, setStatusId] = useState(data.operationstatusid);
  const user = useSelector((state) => state.user.user);
  const [t, i18n] = useTranslation("global");
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);

  useEffect(() => {
    if (Number(statusId) === 13) {
      setState1(true);
      setState2(false);
      setState3(false);
      setState4(false);
      return;
    }
    if (Number(statusId) === 14) {
      setState1(true);
      setState2(true);
      setState3(false);
      setState4(false);
      return;
    }
    if (Number(statusId) === 15) {
      setState1(true);
      setState2(true);
      setState3(true);
      setState4(false);
      return;
    }
    if (Number(statusId) === 16) {
      setState1(true);
      setState2(true);
      setState3(true);
      setState4(true);
      return;
    }
  }, [statusId]);

  console.log(data);

  const handleChangeStatus = (num) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    axios
      .patch(
        `${process.env.BACKURL}/order-carts/${data.id}`,
        {
          operationStatusId: Number(num),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then(() => {
        setStatusId(num);
        return Toast.fire({
          icon: "success",
          title: `El estado de la orden ha cambiado a \n ${
            num === 13
              ? "Orden Recibida"
              : num === 14
              ? "Aprobada"
              : num === 15
              ? "En proceso de pago"
              : "Enviada"
          }`,
        });
      })
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: "Hubo un error al hacer la solicitud",
        });
      });
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="font-bold text-2xl py-5">{t("redenciones.rastrear")}</p>
        <div className="w-full flex h-full">
          <div className="row w-full">
            <div className="col-12 col-md-10 pt45 pb20 h-full flex">
              <div className="flex w-full items-center">
                <div
                  className={`order-tracking ${
                    state1 && "completed"
                  } cursor-pointer`}
                  onClick={() => handleChangeStatus(13)}
                >
                  <span className="is-complete"></span>
                  <p>
                    {t("redenciones.recibido")}
                    <br />
                  </p>
                </div>
                <div
                  className={`order-tracking ${
                    (state1, state2) && "completed"
                  } cursor-pointer`}
                  onClick={() => handleChangeStatus(14)}
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
                  } cursor-pointer`}
                  onClick={() => handleChangeStatus(15)}
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
                  } cursor-pointer`}
                  onClick={() => handleChangeStatus(16)}
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
        {data.productsobject.map((info, index) => {
          return <CardProduct info={info} index={index} />;
        })}
      </div>
    </div>
  );
};

export default ModalProductsR;
