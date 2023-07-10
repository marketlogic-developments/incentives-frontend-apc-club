import { Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import TrackingProduct from "../components/market/TrackingProduct";
import ModalProducts from "../components/ModalStateProducts/ModalProducts";
import { getOrders, ordersPush } from "../store/reducers/orders.reducer";

const estadoProducto = () => {
  const [opened, setOpened] = useState(false);
  const [modalData, setModalData] = useState([]);
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    if (user) {
      dispatch(getOrders(token, user?.id));
    }
  }, [user]);

  const orderStatusNumber = (num) => {
    if (num === 13) {
      return num === 13 && "Recibida";
    }
    if (num === 14) {
      return num === 14 && "Aprobada";
    }
    if (num === 15) {
      return num === 15 && "Proceso de pago";
    }
    if (num === 16) {
      return num === 16 && "Enviada";
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size={"70%"}
        title={`ID de la orden: #${modalData.orderNumber}`}
      >
        <ModalProducts data={modalData} />
      </Modal>
      <ContainerContent pageTitle={"Estado de Tus Premios"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
            <div>
              <br></br>
              <div className="relative">
                <div className="absolute flex items-center ml-2 h-full">
                  <svg
                    className="w-4 h-4 fill-current text-primary-gray-dark"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                  </svg>
                </div>
                <div className="flex justify-between">
                  <input
                    type="text"
                    placeholder={t("tabla.buscar")}
                    className="px-8 py-3 w-10/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  />
                </div>
              </div>
            </div>
            <br></br>
            <div className="container">
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-black-500">
                  <thead className="text-xs text-black-500 uppercase">
                    <tr>
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
                  {orders.length > 0 &&
                    orders.map((data) => (
                      <tbody>
                        <tr
                          className="bg-white border-b dark:border-gray-500 hover:bg-accent cursor-pointer"
                          onClick={() => {
                            // setModalData(data);
                            // setOpened(true);
                          }}
                        >
                          <th
                            scope="row"
                            className="py-4 px-6 font-medium text-black"
                          >
                            #{data.orderNumber}
                          </th>
                          <td className="py-4 px-6">
                            {data.productsObject
                              .map((e) => Number(e.quantity))
                              .reduce(
                                (initialValue, current) =>
                                  initialValue + current
                              )}
                          </td>
                          <td className="py-4 px-6">
                            {data.digipointSubstract}
                          </td>
                          <td className="py-4 px-6">{data.CreatedAt}</td>
                          <td className="py-4 px-6">
                            {orderStatusNumber(data.operationStatusId)}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </ContainerContent>
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: [1, 3, 5],
    },
  };
}

export default estadoProducto;
