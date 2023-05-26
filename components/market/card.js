import { Modal } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { modalCardState } from "../../store/reducers/awards.reducer";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const CardMarket = ({ info, setAwards, awards, handleAdd }) => {
  const [counter, setCounter] = useState(0);
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  const setGlobalStateAwards = (counter) => {
    const awardFilter = awards.filter(({ id }) => id !== info.id);

    if (counter === 0) {
      return setAwards([...awardFilter]);
    }

    return setAwards([...awardFilter, { ...info, quantity: counter }]);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    <>
      <Modal
        className="modalCardCatalogo"
        size={"90%"}
        centered
        opened={opened}
        onClose={() => {
          setOpened(false);
          dispatch(modalCardState(false));
        }}
        title={"Detalles del Producto"}
      >
        <div className="my-[5%] mx-[5%] grid grid-cols-3 grid-rows-[minmax(0,12rem)]">
          <div className="flex">
            <figure className="w-full flex">
              <img
                src={info.imagePath}
                alt={info.name}
                className="w-full block object-contain object-left"
              />
            </figure>
          </div>
          <div className="px-[5%]">
            <div className="flex flex-col gap-2">
              <p className="text-[#eb1000] font-bold text-2xl">
                ${info.price} Virtual Card
              </p>
              <div className="flex justify-between items-center">
                <p className="font-bold text-2xl">
                  {info.digipoints} DigiPoints
                </p>
                <p className="text-sm">
                  Item ID:{" "}
                  {info.name.split(" ")[0] === "Visa"
                    ? `OP-POR${info.price}`
                    : info.name.split(" ")[0] === "MasterCard"
                    ? `BHN-ESP${info.price}`
                    : `CEN-ESP${info.price}`}
                </p>
              </div>
            </div>
            <hr className="my-[2%]" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex gap-5">
                  <p className="font-bold text-2xl">
                    {t("redenciones.cantidad")}
                  </p>
                  <div className="containerCounter flex justify-center">
                    <button
                      className="buttonminus"
                      onClick={() => {
                        counter <= 0
                          ? null
                          : (setCounter(counter - 1),
                            setGlobalStateAwards(counter - 1));
                      }}
                    >
                      -
                    </button>
                    <input
                      className="numberstyle text-black"
                      type="number"
                      id="counter"
                      name="counter"
                      min="0"
                      max="50"
                      placeholder="0"
                      value={counter > 0 && counter}
                      onChange={(e) => {
                        Number(e.currentTarget.value) <= -1
                          ? setCounter(0)
                          : setCounter(Number(e.currentTarget.value));
                      }}
                    ></input>
                    <button
                      className="buttonplus"
                      onClick={() => {
                        setCounter(counter + 1);
                        setGlobalStateAwards(counter + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <button
                  className="btn !btn-outline w-full"
                  onClick={() => {
                    if (counter === 0) {
                      return Toast.fire({
                        icon: "error",
                        title: "No tienes productos agregados",
                      });
                    }
                    return handleAdd();
                  }}
                >
                  {t("adobeMarket.carrito")}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[#eb1000] font-bold text-2xl">
              {t("modalEquipos.descripcion")}:
            </p>
            <p
              className="text-sm overflow-y-scroll"
              dangerouslySetInnerHTML={{
                __html:
                  info.name.split(" ")[0] === "Visa"
                    ? t("adobeMarket.visaDescription")
                    : info.name.split(" ")[0] === "MasterCard"
                    ? t("adobeMarket.masterCardDescription")
                    : t("adobeMarket.cencosudDescription"),
              }}
            ></p>
          </div>
        </div>
      </Modal>
      <div class="flip-card-market">
        <div class="flip-card-inner-market">
          <div class="flip-card-front-market">
            <div className="card-details justify-center">
              <figure
                onClick={() => {
                  dispatch(modalCardState(true));
                  setOpened(true);
                }}
                className="cursor-pointer"
              >
                <img
                  src={info.imagePath}
                  alt={info.name}
                  className="imgMarket"
                />
              </figure>

              <p className="text-title">
                {info.digipoints} <br /> DigiPoints
              </p>
              <button
                onClick={() => {
                  if (counter === 0) {
                  }
                  setOpened(true);
                }}
                className="btn !btn-outline btn-sm"
              >
                Seleccionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardMarket;
