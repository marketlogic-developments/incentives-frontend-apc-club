import { Modal } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  modalCardState,
  productsPush,
} from "../../store/reducers/awards.reducer";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import Target from "./Target";
import { useMemo } from "react";
import ModalTargetInfo from "./ModalTargetInfo";

import { data } from "autoprefixer";
import ModalTyC from "./ModalsT&C/ModalTyC";
import ModalTyCProccess from "./ModalsT&C/ModalTyCProccess";

const CardMarket = ({ info }) => {
  const [counter, setCounter] = useState(0);
  const [opened, setOpened] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const itemsCar = useSelector((state) => state.awards.shoopingCar);
  const [t, i18n] = useTranslation("global");
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

  //Delete This after T&C has been accepted
  const [modal, setModal] = useState(0);

  const country =
    user.distributionChannel === null
      ? user.company.country
      : user.distributionChannel.country;

  //--------------

  const setGlobalStateAwards = () => {
    const awardFilter = itemsCar.filter(({ id }) => id !== info.id);
    const thisItem = itemsCar.find(({ id }) => id === info.id);

    if (thisItem === undefined) {
      return dispatch(
        productsPush([
          { ...info, quantity: counter === 0 ? 1 : counter },
          ...awardFilter,
        ])
      );
    }

    if (counter === 0) {
      return dispatch(
        productsPush([
          { ...info, quantity: thisItem.quantity + 1 },
          ...awardFilter,
        ])
      );
    }

    return dispatch(
      productsPush([
        { ...info, quantity: thisItem.quantity + counter },
        ...awardFilter,
      ])
    );
  };

  //Delete This After T&C has been accepted
  const modalTyC = useMemo(() => {
    if (user.policy_awards && user.cedula === null) {
      setModal(1);
    }

    if (modal === 0) {
      return <ModalTyC setModal={setModal} />;
    }
    if (modal === 1) {
      return (
        <ModalTyCProccess opened={setOpened} setModal={setModal} user={user} />
      );
    }
  }, [modal]);

  // -----------------

  return (
    <>
      <Modal
        size={modal === 1 ? "auto" : "50%"}
        centered
        opened={opened}
        onClose={() => modal !== 1 && setOpened(false)}
        withCloseButton={modal == 1 ? false : true}
        padding={modal === 1 && 0}
      >
        {(info.description === "COLOMBIA" && user.policy_awards !== true) ||
        (info.description === "COLOMBIA" && user.cedula === null) ? (
          modalTyC
        ) : (
          <ModalTargetInfo
            info={info}
            addItem={setGlobalStateAwards}
            setCounter={setCounter}
            setOpened={setOpened}
          />
        )}
      </Modal>
      <div className="w-full">
        <div className="w-full justify-center border rounded-md pb-3">
          <Target cardInfo={info} />
          <div className="flex flex-col p-6 mt-[-5px] bg-white">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                  <p className="2xl:!text-lg font-bold">
                    {info.name.split(" ")[0]} Gift Card
                  </p>
                  <div className="flex gap-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.75591 9.97835L8.1239 5.73559C8.09941 5.67193 8.0562 5.61717 7.99997 5.57855C7.94374 5.53993 7.87712 5.51926 7.8089 5.51926C7.74069 5.51926 7.67407 5.53993 7.61784 5.57855C7.5616 5.61717 7.51839 5.67193 7.4939 5.73559L5.8619 9.97835C5.84495 10.0224 5.81893 10.0625 5.78554 10.0959C5.75214 10.1293 5.71211 10.1553 5.66802 10.1722L1.42526 11.8042C1.36159 11.8287 1.30684 11.8719 1.26822 11.9282C1.2296 11.9844 1.20893 12.051 1.20893 12.1192C1.20893 12.1875 1.2296 12.2541 1.26822 12.3103C1.30684 12.3665 1.36159 12.4097 1.42526 12.4342L5.66802 14.0662C5.71211 14.0832 5.75214 14.1092 5.78554 14.1426C5.81893 14.176 5.84495 14.216 5.8619 14.2601L7.4939 18.5029C7.51839 18.5665 7.5616 18.6213 7.61784 18.6599C7.67407 18.6985 7.74069 18.7192 7.8089 18.7192C7.87712 18.7192 7.94374 18.6985 7.99997 18.6599C8.0562 18.6213 8.09941 18.5665 8.1239 18.5029L9.75591 14.2601C9.77286 14.216 9.79887 14.176 9.83227 14.1426C9.86567 14.1092 9.9057 14.0832 9.94978 14.0662L14.1925 12.4342C14.2562 12.4097 14.311 12.3665 14.3496 12.3103C14.3882 12.2541 14.4089 12.1875 14.4089 12.1192C14.4089 12.051 14.3882 11.9844 14.3496 11.9282C14.311 11.8719 14.2562 11.8287 14.1925 11.8042L9.94978 10.1722C9.9057 10.1553 9.86567 10.1293 9.83227 10.0959C9.79887 10.0625 9.77286 10.0224 9.75591 9.97835ZM4.05889 2.66921L3.30889 0.719208L2.55889 2.66921L0.608887 3.41921L2.55889 4.16922L3.30889 6.11922L4.05889 4.16922L6.0089 3.41921L4.05889 2.66921ZM16.009 4.51909L15.0089 1.91921L14.0088 4.51909L11.4089 5.51922L14.0088 6.51935L15.0089 9.11923L16.009 6.51935L18.6089 5.51922L16.009 4.51909Z"
                        stroke="#EB1000"
                        stroke-width="1.03964"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p className="font-thin xl:!text-sm lg:!text-xs">
                      {info.digipoints} DigiPoints
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 place-items-center w-1/4">
                  <button onClick={() => setCounter(counter + 1)}>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.8687 10.5C17.8687 6.35938 14.5093 3 10.3687 3C6.22803 3 2.86865 6.35938 2.86865 10.5C2.86865 14.6406 6.22803 18 10.3687 18C14.5093 18 17.8687 14.6406 17.8687 10.5Z"
                        stroke="#2C2C2C"
                        stroke-width="1.3125"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M10.3687 7.375V13.625M13.4937 10.5H7.24365"
                        stroke="#2C2C2C"
                        stroke-width="1.3125"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <p className="xl:!text-sm text-primary"> {counter} </p>
                  <button
                    onClick={() => counter !== 0 && setCounter(counter - 1)}
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.8687 10.5C17.8687 14.6406 14.5093 18 10.3687 18C6.22803 18 2.86865 14.6406 2.86865 10.5C2.86865 6.35938 6.22803 3 10.3687 3C14.5093 3 17.8687 6.35938 17.8687 10.5Z"
                        stroke="#2C2C2C"
                        stroke-width="1.25"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M13.4937 10.5H7.24365"
                        stroke="#2C2C2C"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <button
                  className="btn btn-sm btn-info w-full !btn-outline"
                  onClick={() => setOpened(true)}
                >
                  {t("adobeMarket.carrito")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardMarket;
