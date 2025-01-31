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

const estadoProducto = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState([]);
  const [orders,setOrders]=useState<Array<any>>([])
  const { user }= useSelector((state:RootState) => state.currentUser);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const [screen, setScreen] = useState<number>();
  const {getAllOrder} = OrdersFunction()

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

  const getOrder= async() =>{
    await getAllOrder("")
  }

  useEffect(() => {
    if (user) {
      getOrder()
    }
  }, [user]);

  const orderStatusNumber = (num:number) => {
    if (num === 13) {
      return num === 13 && t("estadoProducto.status1");
    }
    if (num === 14) {
      return num === 14 && t("estadoProducto.status2");
    }
    if (num === 15) {
      return num === 15 && t("estadoProducto.status3");
    }
    if (num === 16) {
      return num === 16 && t("estadoProducto.status4");
    }
  };

  const backgroundColor = (num:number) => {
    if (num === 13) {
      return "bg-[#BEEEED] text-[#21A5A2]";
    }
    if (num === 14) {
      return "bg-[#C0F0D2] text-[#009C3B]";
    }
    if (num === 15) {
      return "bg-[#FFE0C5] text-[#E9740A]";
    }
    if (num === 16) {
      return "bg-[#B3D3FA] text-[#1473E6]";
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size={screen as number < 768 ? "100%" : "70%"}
        title={t("estadoProducto.detalleOrden")}
        className={`modalStatusProducts ${screen as number < 768 && "modal100"}`}
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
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.89746 7.92188V20.4219C4.89901 20.9394 5.10528 21.4353 5.47123 21.8012C5.83717 22.1672 6.33306 22.3735 6.85059 22.375H20.1318C20.6494 22.3735 21.1452 22.1672 21.5112 21.8012C21.8771 21.4353 22.0834 20.9394 22.085 20.4219V7.92188"
                    stroke="#1473E6"
                    stroke-width="1.83628"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22.2803 3.625H4.70215C3.94707 3.625 3.33496 4.23711 3.33496 4.99219V6.16406C3.33496 6.91914 3.94707 7.53125 4.70215 7.53125H22.2803C23.0354 7.53125 23.6475 6.91914 23.6475 6.16406V4.99219C23.6475 4.23711 23.0354 3.625 22.2803 3.625Z"
                    stroke="#1473E6"
                    stroke-width="1.83628"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.6162 15.3437L13.4912 18.4687L10.3662 15.3437M13.4912 17.3892V11.4375"
                    stroke="#1473E6"
                    stroke-width="1.83628"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="!text-xs">{t("estadoProducto.recibir")}</p>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6162 12.8906L12.2412 18.3594L10.3662 16.168"
                    stroke="#1473E6"
                    stroke-width="1.73963"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.80371 8.59375V7.03125C8.80371 5.78805 9.29757 4.59576 10.1766 3.71669C11.0557 2.83761 12.248 2.34375 13.4912 2.34375C14.7344 2.34375 15.9267 2.83761 16.8058 3.71669C17.6849 4.59576 18.1787 5.78805 18.1787 7.03125V8.59375M4.89746 8.59375C4.69026 8.59375 4.49155 8.67606 4.34503 8.82257C4.19852 8.96909 4.11621 9.1678 4.11621 9.375V19.9219C4.11621 21.3984 5.37402 22.6562 6.85059 22.6562H20.1318C21.6084 22.6562 22.8662 21.4595 22.8662 19.9829V9.375C22.8662 9.1678 22.7839 8.96909 22.6374 8.82257C22.4909 8.67606 22.2922 8.59375 22.085 8.59375H4.89746Z"
                    stroke="#1473E6"
                    stroke-width="1.73963"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="!text-xs">{t("estadoProducto.aprobar")}</p>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <svg
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3121 1.30182H3.68557C2.19752 1.30182 0.991211 2.50812 0.991211 3.99618V14.0038C0.991211 15.4919 2.19752 16.6982 3.68557 16.6982H18.3121C19.8001 16.6982 21.0065 15.4919 21.0065 14.0038V3.99618C21.0065 2.50812 19.8001 1.30182 18.3121 1.30182Z"
                    stroke="#1473E6"
                    stroke-width="1.73963"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M0.991211 5.92072H21.0065M4.8403 11.117H7.14975V12.0793H4.8403V11.117Z"
                    stroke="#1473E6"
                    stroke-width="3.26181"
                    stroke-linejoin="round"
                  />
                </svg>

                <p className="!text-xs">{t("estadoProducto.recibirCorreo")}</p>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <svg
                  width="46"
                  height="24"
                  viewBox="0 0 46 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.0063 17.25H19.1313C19.6282 17.2485 20.1042 17.0505 20.4555 16.6992C20.8068 16.3479 21.0049 15.8718 21.0063 15.375V7.875C21.0049 7.37818 20.8068 6.90212 20.4555 6.55081C20.1042 6.1995 19.6282 6.00148 19.1313 6H4.88135C4.38452 6.00148 3.90847 6.1995 3.55716 6.55081C3.20585 6.90212 3.00783 7.37818 3.00635 7.875V15.375C3.00783 15.8718 3.20585 16.3479 3.55716 16.6992C3.90847 17.0505 4.38452 17.2485 4.88135 17.25H6.00635"
                    stroke="#1473E6"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.8663 11.25H7.14635C6.51674 11.25 6.00635 11.7604 6.00635 12.39V19.86C6.00635 20.4896 6.51674 21 7.14635 21H16.8663C17.496 21 18.0063 20.4896 18.0063 19.86V12.39C18.0063 11.7604 17.496 11.25 16.8663 11.25Z"
                    stroke="#1473E6"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.0063 6V4.875C18.0049 4.37818 17.8068 3.90212 17.4555 3.55081C17.1042 3.1995 16.6282 3.00148 16.1313 3H7.88135C7.38452 3.00148 6.90847 3.1995 6.55716 3.55081C6.20585 3.90212 6.00783 4.37818 6.00635 4.875V6"
                    stroke="#1473E6"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3813 9.75C19.0027 9.75 19.5063 9.24632 19.5063 8.625C19.5063 8.00368 19.0027 7.5 18.3813 7.5C17.76 7.5 17.2563 8.00368 17.2563 8.625C17.2563 9.24632 17.76 9.75 18.3813 9.75Z"
                    fill="#1473E6"
                  />
                  <g clip-path="url(#clip0_654_8080)">
                    <path
                      d="M39.7188 3.5625H34.0938C33.1618 3.5625 32.4062 4.31802 32.4062 5.25V18.75C32.4062 19.682 33.1618 20.4375 34.0938 20.4375H39.7188C40.6507 20.4375 41.4062 19.682 41.4062 18.75V5.25C41.4062 4.31802 40.6507 3.5625 39.7188 3.5625Z"
                      stroke="#1473E6"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M34.0938 3.5625H34.9375C35.0121 3.5625 35.0836 3.59213 35.1364 3.64488C35.1891 3.69762 35.2188 3.76916 35.2188 3.84375C35.2188 3.99293 35.278 4.13601 35.3835 4.2415C35.489 4.34699 35.6321 4.40625 35.7812 4.40625H38.0312C38.1804 4.40625 38.3235 4.34699 38.429 4.2415C38.5345 4.13601 38.5938 3.99293 38.5938 3.84375C38.5938 3.76916 38.6234 3.69762 38.6761 3.64488C38.7289 3.59213 38.8004 3.5625 38.875 3.5625H39.7188"
                      stroke="#1473E6"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_654_8080">
                      <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(27.0063 3)"
                      />
                    </clipPath>
                  </defs>
                </svg>

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
              {orders?.length > 0 &&
                orders?.map((data, index) => (
                  <tr
                    className={`${
                      (index + 1) % 2 === 0 && "bg-[#F5F5F5]"
                    } w-full hover:bg-[#F9F9F9] hover:!text-info cursor-pointer`}
                    key={index}
                    onClick={() => {
                      setModalData(data);
                      setOpened(true);
                    }}
                  >
                    <th scope="row" className="py-4 px-6 font-medium">
                      #{data.orderNumber}
                    </th>
                    <td className="py-4 px-6">
                      {data.CreatedAt.split("T")[0]}
                    </td>
                    <td className="py-4 px-6">
                      {data.productsObject
                        .map((e:any) => Number(e.quantity))
                        .reduce(
                          (initialValue:number, current:number) => initialValue + current
                        )}
                    </td>
                    <td className="py-4 px-6">{data.digipointSubstract}</td>
                    <td className="py-2 px-3">
                      <p
                        className={`lg:w-1/2 w-max py-2 px-3 font-semibold rounded-md !text-xs ${backgroundColor(
                          data.operationStatusId
                        )}`}
                      >
                        {orderStatusNumber(data.operationStatusId)}
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
