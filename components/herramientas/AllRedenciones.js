import { Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../containerContent";
import { getOrdersAll, ordersPush } from "../../store/reducers/orders.reducer";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import { useMemo } from "react";
import ModalProductsR from "../ModalStateProducts/ModalProductsR";

const AllRedenciones = () => {
  const [opened, setOpened] = useState(false);
  const [modalData, setModalData] = useState([]);
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInvoice, setSearchInvoice] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getOrdersAll(token));
    }
  }, [isLoaded, token]);

  useEffect(() => {
    setData(orders);
  }, [orders]);

  const orderStatusNumber = (num) => {
    if (num === 13) {
      return num === 13 && t("redenciones.recibido");
    }
    if (num === 14) {
      return num === 14 && t("redenciones.aprobado");
    }
    if (num === 15) {
      return num === 15 && t("redenciones.proceso");
    }
    if (num === 16) {
      return num === 16 && t("redenciones.enviar");
    }
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(dateString);
    return date.toLocaleString("es-GT", options);
  };

  const importFile = (data) => {
    const filteredData = data.map((item) => {
      const cantidadproductos = item.productsobject.reduce((total, product) => {
        return total + Number(product.quantity);
      }, 0);

      const productos = item.productsobject
        .map((product) => {
          return (
            product.name +
            `(Q:${product.quantity},DP:${
              product.quantity * product.digipoints
            })`
          );
        })
        .join(", ");

      console.log(productos);

      return {
        nombre: item.name,
        email: item.email,
        rol: item.role_name,
        orden: item.ordernumber,
        digipoints: item.digipoint_substract,
        estatus: orderStatusNumber(item.operationstatusid),
        cantidadproductos: cantidadproductos,
        nombres: productos,
        fecha: formatDate(item.created_at),
      };
    });

    // Convertir la matriz filtrada en un archivo CSV
    jsonexport(filteredData, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Lista_Redenciones.csv");
    });
  };

  const search = useMemo(() => {
    if (searchInvoice !== "") {
      return setData(
        orders.filter(({ ordernumber }) => {
          return ordernumber.startsWith(searchInvoice.toLocaleLowerCase());
        })
      );
    }
  }, [searchInvoice]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size={"70%"}
        title={`${t("redenciones.idOrden")}: #${modalData.ordernumber}`}
      >
        <ModalProductsR data={modalData} />
      </Modal>

      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white flex flex-col gap-5">
        <div className="grid grid-cols-3">
          <div className="flex justify-evenly items-center col-span-2">
            <p>#</p>
            <input
              type="text"
              onChange={(e) => {
                if (e.target.value === "") {
                  setData(orders);
                }

                return setSearchInvoice(e.target.value);
              }}
              placeholder={"Buscar por numero de factura"}
              className="px-8 py-3 w-10/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            />
          </div>

          <button
            className="btn btn-primary text-white rounded-full justify-self-end"
            onClick={() => importFile(orders)}
          >
            Exportar
          </button>
        </div>
        <div className="container">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-black-500">
              <thead className="text-xs text-black-500 uppercase">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    {t("participantes.nombre")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("login.Email")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("participantes.rol")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.idsol")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.nproductos")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.valordigipoints")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.fechasol")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.estado")}
                  </th>
                </tr>
              </thead>
              {data.map((data, index) => (
                <tbody>
                  <tr
                    key={index}
                    className="bg-white border-b dark:border-gray-500 hover:bg-accent cursor-pointer"
                    onClick={() => {
                      setModalData(data);
                      setOpened(true);
                    }}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-black"
                    >
                      {data.name}
                    </th>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-black"
                    >
                      {data.email}
                    </th>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-black"
                    >
                      {data.role_name}
                    </th>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-black"
                    >
                      #{data.ordernumber}
                    </th>
                    <td className="py-4 px-6">
                      {data.productsobject
                        .map((e) => Number(e.quantity))
                        .reduce(
                          (initialValue, current) => initialValue + current
                        )}
                    </td>
                    <td className="py-4 px-6">{data.digipoint_substract}</td>
                    <td className="py-4 px-6">{formatDate(data.created_at)}</td>
                    <td className="py-4 px-6">
                      {orderStatusNumber(data.operationstatusid)}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRedenciones;
