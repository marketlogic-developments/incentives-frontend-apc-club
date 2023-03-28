import { Modal } from "@mantine/core";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ContainerContent from "../components/containerContent";
import CardShoppingCard from "../components/market/cardShoppingCard";
import {
  productsPush,
  shoopingCarPush,
} from "../store/reducers/awards.reducer";
import { ordersPush } from "../store/reducers/orders.reducer";
import { setDigipoints } from "../store/reducers/users.reducer";

const shoppingCar = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const digipoints = useSelector((state) => state.user.digipoints);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const route = useRouter();
  const [myProducts, setMyProducts] = useState([]);
  const [opened, setOpened] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    if (Cookies.get("shoppCar") !== undefined) {
      const productsToCookies = JSON.parse(Cookies.get("shoppCar"));
      setMyProducts(productsToCookies);
      dispatch(productsPush(productsToCookies));
    }
  }, []);

  const testModal = () => {
    setTimeout(() => setLoading(false), 5000);

    if (loading === true) {
      return (
        <>
          <h3 className="font-bold text-lg text-red-700">
            Procesando orden...
          </h3>
          <p className="py-4">Tu orden está siendo procesada</p>
        </>
      );
    }

    return (
      <>
        <h3 className="font-bold text-lg text-red-700">
          {t("shoopingcar.recibida")}
        </h3>
        <p className="py-4">{t("shoopingcar.exito")}</p>
        <p>
          {t("shoopingcar.norden")} <strong>{orderId}</strong>
        </p>
        <div className="modal-action">
          <label
            htmlFor="my-modal"
            className="btn btn-primary"
            onClick={() => route.push("/estadoProducto")}
          >
            {t("shoopingcar.ir")}
          </label>
        </div>
      </>
    );
  };

  const handleOrder = () => {
    const digipointSubstract = myProducts
      .map(({ digipoints, quantity }) => Number(digipoints) * quantity)
      .reduce((initialValue, current) => initialValue + current);

    if (digipoints?.assigned_points === undefined) {
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

      return Toast.fire({
        icon: "error",
        title:
          "No cuentas con los DigiPoints suficientes para hacer esta redención",
      });
    }

    if (digipointSubstract < digipoints?.assigned_points) {
      setOpened(true);
      setLoading(true);
      return axios
        .post(
          `${process.env.BACKURL}/order-carts`,
          {
            employeeId: user.id,
            productsObject: myProducts,
            digipointSubstract: digipointSubstract,
          },
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          Cookies.remove("shoppCar");
          Cookies.remove("dp");
          Cookies.set(
            "dp",
            JSON.stringify({
              ...digipoints,
              cart_points:
                Number(digipoints.cart_points) + Number(digipointSubstract),
            }),
            { expires: 365 }
          );
          dispatch(shoopingCarPush([]));
          dispatch(ordersPush(res.data));
          dispatch(
            setDigipoints({
              ...digipoints,
              cart_points:
                Number(digipoints.cart_points) + Number(digipointSubstract),
            })
          );
          setOrderId(res.data.orderNumber);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    if (digipointSubstract > digipoints?.assigned_points) {
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

      return Toast.fire({
        icon: "error",
        title: "No tienes digipoints suficientes para hacer esta compra",
      });
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          route.push("/estadoProducto");
          setOpened(false);
        }}
        centered
      >
        {testModal()}
      </Modal>
      <ContainerContent pageTitle={"Carrito"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">{t("shoopingcar.carrito")}</h1>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-5 w-8/12">
              {myProducts.length > 0 ? (
                myProducts
                  .sort((a, b) => a.id - b.id)
                  .map((info) => (
                    <CardShoppingCard
                      info={info}
                      arrProducts={myProducts}
                      setProducts={setMyProducts}
                    />
                  ))
              ) : (
                <p>{t("shoopingcar.notienes")}.</p>
              )}
            </div>
            {myProducts.length > 0 && (
              <div className="grid grid-cols-2 w-3/12 h-fit border-red-500 border rounded-lg p-5 gap-y-5">
                <p className="text-xl">
                  <strong className="text-xl font-bold">
                    {t("shoopingcar.cantidad")}
                  </strong>
                </p>
                <p className="text-center">
                  {myProducts.length > 0 &&
                    myProducts
                      .map(({ quantity }) => quantity)
                      .reduce(
                        (initialValue, current) => initialValue + current
                      )}
                </p>
                <p className="text-xl font-bold">Subtotal: </p>
                <p className="text-center font-bold text-red-500">
                  {myProducts.length > 0 &&
                    myProducts
                      .map(
                        ({ digipoints, quantity }) =>
                          Number(digipoints) * quantity
                      )
                      .reduce(
                        (initialValue, current) => initialValue + current
                      )}{" "}
                  DigiPoints
                </p>

                <label
                  htmlFor="my-modal"
                  className="btn btn-primary col-span-2"
                  onClick={handleOrder}
                >
                  {t("shoopingcar.procesar")}
                </label>
              </div>
            )}
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

export default shoppingCar;
