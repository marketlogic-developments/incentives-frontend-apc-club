import { Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import TrackingProduct from "../components/market/TrackingProduct";
import ModalProducts from "../components/ModalStateProducts/ModalProducts";
import { getOrders, ordersPush } from "../store/reducers/orders.reducer";
import Gift from "../components/market/iconsEstadoProductos/Gift";
import { RootState } from "store/store";
import OrdersFunction from "functions/Orders/OrdersFunction";
import { Order, OrderStatus } from "services/Orders/orders.service";
import { MultipleElements } from "services/generical.service";
import { ShoppingCarProduct } from "services/Awards/awards.service";
import {
  OrderApprove,
  OrderImpress,
  OrderRecievedUser,
  OrderSendMail,
} from "public/assets/Icons/MarketplaceIcons/MarketplaceIcons";

const estadoProducto = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Order | null>(null);
  const [orders, setOrders] = useState<MultipleElements<Order>>();
  const { user } = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const [screen, setScreen] = useState<number>();
  const { getAllOrder } = OrdersFunction();
  const [params, setParams] = useState({
    page: 1,
    limit: 6,
    search: "",
  });

  useEffect(() => {
    setScreen(window.innerWidth);
    const handleWindowResize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const getOrder = async () => {
    const { limit, page, search } = params;
    await getAllOrder(
      `page=${page}&limit=${limit}&search=${search}&search_fields=name`
    )
      .then((res) => setOrders(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) getOrder();
  }, [user]);

  const validateStatus = (status: OrderStatus) => {
    Object.values(status).some((bool) => bool);
  };

  const orderStatus = (status: OrderStatus) => {
    if (status.DELIVERED) {
      const res = {
        bg: "bg-[#B3D3FA] text-[#1473E6]",
        text: String(t("estadoProducto.status4")),
      };
      return res;
    }
    if (status.ON_PROCESS) {
      const res = {
        bg: "bg-[#FFE0C5] text-[#E9740A]",
        text: String(t("estadoProducto.status3")),
      };
      return res;
    }
    if (status.ON_REVIEW) {
      const res = {
        bg: "bg-[#C0F0D2] text-[#009C3B]",
        text: String(t("estadoProducto.status2")),
      };
      return res;
    }
    if (status.ORDER_RECIEVED) {
      const res = {
        bg: "bg-[#BEEEED] text-[#21A5A2]",
        text: String(t("estadoProducto.status1")),
      };
      return res;
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size={(screen as number) < 768 ? "100%" : "70%"}
        title={t("estadoProducto.detalleOrden")}
        className={`modalStatusProducts ${(screen as number) < 768 && "modal100"
          }`}
      >
        <ModalProducts data={modalData} />
      </Modal>
      <ContainerContent pageTitle={"Estado de Tus Premios"}>
        <div className="m-6 flex flex-col gap-16 responsiveSections">
          <div className="flex lg:flex-row flex-col justify-around lg:gap-0 gap-6">
            <div className="flex gap-6">
              <Gift />
              <h2
                className="font-bold !text-2xl"
                dangerouslySetInnerHTML={{
                  __html: String(t("estadoProducto.titleEstadoPremios")),
                }}
              />
            </div>
            <div className="lg:flex lg:justify-between grid grid-cols-2 lg:w-[60%] w-full  gap-3">
              <div className="flex justify-between gap-3 items-center">
                <OrderRecievedUser />
                <p className="!text-xs">{t("estadoProducto.recibir")}</p>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <OrderApprove />
                <p className="!text-xs">{t("estadoProducto.aprobar")}</p>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <OrderSendMail />
                <p className="!text-xs">{t("estadoProducto.recibirCorreo")}</p>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <OrderImpress />
                <p className="!text-xs">{t("estadoProducto.imprimir")}</p>
              </div>
            </div>
          </div>
          <table className="w-full text-sm text-left text-black-500 table-fixed tableJustify overflow-hidden rounded-md">
            <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5">
              <tr>
                <th scope="col" className="py-3 px-6">
                  {t("tabla.idsol")}
                </th>
                <th scope="col" className="py-3 px-6">
                  {t("tabla.fechasol")}
                </th>
                <th scope="col" className="py-3 px-6">
                  {t("tabla.nproductos")}
                </th>
                <th scope="col" className="py-3 px-6">
                  {t("tabla.valordigipoints")}
                </th>
                <th scope="col" className="py-3 px-6">
                  {t("tabla.estado")}
                </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders?.content.map((data, index) => (
                  <tr
                    className={`${(index + 1) % 2 === 0 && "bg-[#F5F5F5]"
                      } w-full hover:bg-[#F9F9F9] hover:!text-info cursor-pointer`}
                    key={index}
                    onClick={() => {
                      setModalData(data);
                      setOpened(true);
                    }}
                  >
                    <th scope="row" className="py-4 px-6 font-medium">
                      #{data.order_id.split("-")[0]}
                    </th>
                    <td className="py-4 px-6">
                      {(() => {
                        const date = new Date(data.created_at.replace(' ', 'T'));
                        const dd = String(date.getDate()).padStart(2, '0');
                        const mm = String(date.getMonth() + 1).padStart(2, '0');
                        const yyyy = date.getFullYear();
                        return `${dd}/${mm}/${yyyy}`;
                      })()}
                    </td>
                    <td className="py-4 px-6">
                      {data.products
                        .map((e: ShoppingCarProduct) => Number(e.quantity))
                        .reduce(
                          (initialValue: number, current: number) =>
                            initialValue + current
                        )}
                    </td>
                    <td className="py-4 px-6">
                      {data.products
                        .map((e: ShoppingCarProduct) => Number(e.price))
                        .reduce(
                          (initialValue: number, current: number) =>
                            initialValue + current
                        )}
                    </td>
                    <td className="py-2 px-3">
                      <p
                        className={`lg:w-1/2 w-max py-2 px-3 font-semibold rounded-md !text-xs ${orderStatus(data.status)?.bg
                          }`}
                      >
                        {orderStatus(data.status)?.text}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </ContainerContent>
    </>
  );
};

export default estadoProducto;
