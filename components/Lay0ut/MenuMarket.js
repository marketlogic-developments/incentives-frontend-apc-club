import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productsPush,
  setMenuMarket,
} from "../../store/reducers/awards.reducer";
import CardMenuMarket from "./MenuMarket/CardMenuMarket";
import { useMemo } from "react";
import { setDigipoints } from "../../store/reducers/currentUser.reducer";
import axios from "axios";
import { ordersPush } from "../../store/reducers/orders.reducer";
import { Modal } from "@mantine/core";
import ModalTY from "./MenuMarket/ModalTY";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Triangle } from "react-loader-spinner";

const MenuMarket = () => {
  const dispatch = useDispatch();
  const digipoints = useSelector((state) => state.user.digipoints);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const car = useSelector((state) => state.awards.shoopingCar);
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const componenteRef = useRef(null);
  const [t, i18n] = useTranslation("global");
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState();

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

  const digipointsTotal = useMemo(
    () =>
      car
        .map((e) => Number(e.digipoints) * e.quantity)
        .reduce((prev, current) => prev + current, 0),
    [car]
  );

  const myDigipoints = useMemo(
    () =>
      typeof digipoints?.assigned_points !== "undefined" &&
      typeof digipoints?.cart_points !== "undefined"
        ? digipoints?.assigned_points - digipoints?.cart_points
        : typeof digipoints?.assigned_points !== "undefined"
        ? digipoints?.assigned_points
        : 0,
    [digipoints]
  );

  const handleOrder = () => {
    setLoading(true);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/order-carts`,
        {
          employeeId: user.id,
          productsObject: car,
          digipointSubstract: digipointsTotal,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(productsPush([]));
        dispatch(ordersPush(res.data));
        dispatch(
          setDigipoints({
            ...digipoints,
            cart_points:
              Number(digipoints.cart_points) + Number(digipointsTotal),
          })
        );
        setLoading(false);
        setOpened(true);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const handleClickFuera = (event) => {
      if (
        componenteRef.current &&
        !componenteRef.current.contains(event.target)
      ) {
        if (opened) {
          null;
        } else {
          // El clic se hizo fuera del componente
          dispatch(setMenuMarket(false));
        }
      }
    };

    document.addEventListener("mousedown", handleClickFuera);

    return () => {
      document.removeEventListener("mousedown", handleClickFuera);
    };
  }, []);

  return (
    <>
      <Modal
        size={screen < 768 ? "100%" : "35%"}
        centered
        opened={opened}
        onClose={() => {
          router.push("/estadoProducto");
          dispatch(setMenuMarket(false));
          setOpened(false);
        }}
        withCloseButton={false}
      >
        <ModalTY setOpened={setOpened} ref={componenteRef} />
      </Modal>
      <div
        className="w-[31.7%] bg-[#ffff] border right-0 h-screen fixed top-0 p-6 flex flex-col gap-6 z-[2] menuShoppingCar"
        ref={componenteRef}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <svg
              width="37"
              height="36"
              viewBox="0 0 37 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18.2401" cy="18" r="18" fill="#FFEEED" />
              <path
                d="M13.8366 26.1C14.5822 26.1 15.1866 25.4956 15.1866 24.75C15.1866 24.0044 14.5822 23.4 13.8366 23.4C13.091 23.4 12.4866 24.0044 12.4866 24.75C12.4866 25.4956 13.091 26.1 13.8366 26.1Z"
                fill="#FFC8C5"
              />
              <path
                d="M23.2865 26.1C24.0321 26.1 24.6365 25.4956 24.6365 24.75C24.6365 24.0044 24.0321 23.4 23.2865 23.4C22.5409 23.4 21.9365 24.0044 21.9365 24.75C21.9365 25.4956 22.5409 26.1 23.2865 26.1Z"
                fill="#FFC8C5"
              />
              <path
                d="M25.6828 12.2954C25.588 12.1794 25.4685 12.086 25.3331 12.0219C25.1977 11.9578 25.0497 11.9247 24.8998 11.925H12.0601L11.8015 10.4577C11.7739 10.3014 11.6921 10.1598 11.5705 10.0578C11.4489 9.95585 11.2953 9.89996 11.1366 9.89999H8.4366C8.25758 9.89999 8.08589 9.97111 7.9593 10.0977C7.83271 10.2243 7.7616 10.396 7.7616 10.575C7.7616 10.754 7.83271 10.9257 7.9593 11.0523C8.08589 11.1789 8.25758 11.25 8.4366 11.25H10.5704L12.4967 22.1673C12.5243 22.3236 12.6061 22.4651 12.7277 22.5671C12.8492 22.6691 13.0029 22.725 13.1616 22.725H23.9616C24.1406 22.725 24.3123 22.6539 24.4389 22.5273C24.5655 22.4007 24.6366 22.229 24.6366 22.05C24.6366 21.871 24.5655 21.6993 24.4389 21.5727C24.3123 21.4461 24.1406 21.375 23.9616 21.375H13.7278L13.4898 20.025H23.6848C23.9189 20.0247 24.1457 19.9435 24.3269 19.7952C24.508 19.6469 24.6323 19.4406 24.6788 19.2112L25.8938 13.1362C25.9231 12.9892 25.9193 12.8375 25.8828 12.6921C25.8464 12.5467 25.7781 12.4112 25.6828 12.2954Z"
                fill="#EB1000"
              />
            </svg>
            <p className="xl:!text-xl font-bold">{t("adobeMarket.micar")}</p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => dispatch(setMenuMarket(false))}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6294 9.88042L17.9824 3.52746C18.2839 3.22648 18.4535 2.81805 18.4539 2.39203C18.4543 1.96601 18.2854 1.55728 17.9844 1.25577C17.6834 0.954261 17.275 0.784663 16.849 0.784286C16.423 0.78391 16.0142 0.952786 15.7127 1.25376L9.35976 7.60673L3.0068 1.25376C2.70529 0.952254 2.29635 0.782867 1.86995 0.782867C1.44355 0.782867 1.03461 0.952254 0.733104 1.25376C0.431594 1.55528 0.262207 1.96421 0.262207 2.39061C0.262207 2.81701 0.431594 3.22595 0.733104 3.52746L7.08607 9.88042L0.733104 16.2334C0.431594 16.5349 0.262207 16.9438 0.262207 17.3702C0.262207 17.7966 0.431594 18.2056 0.733104 18.5071C1.03461 18.8086 1.44355 18.978 1.86995 18.978C2.29635 18.978 2.70529 18.8086 3.0068 18.5071L9.35976 12.1541L15.7127 18.5071C16.0142 18.8086 16.4232 18.978 16.8496 18.978C17.276 18.978 17.6849 18.8086 17.9864 18.5071C18.2879 18.2056 18.4573 17.7966 18.4573 17.3702C18.4573 16.9438 18.2879 16.5349 17.9864 16.2334L11.6294 9.88042Z"
                fill="#BABABA"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="2xl:!text-base font-bold">{car.length} Gift Cards</p>
          <div className="flex flex-col gap-6">
            {car.map((item, index) => (
              <CardMenuMarket cardData={item} index={index} />
            ))}
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex gap-6 items-center">
              <svg
                width="43"
                height="44"
                viewBox="0 0 43 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="21.5" cy="22" r="21.5" fill="#FFEEED" />
                <path
                  d="M20.001 36.5C19.764 36.5012 19.5323 36.43 19.3368 36.296C19.1413 36.162 18.9914 35.9716 18.907 35.7501L17.0397 30.8944C17.0019 30.7965 16.9441 30.7076 16.8699 30.6335C16.7957 30.5593 16.7068 30.5014 16.609 30.4636L11.7519 28.5949C11.5306 28.51 11.3403 28.36 11.2061 28.1647C11.0719 27.9694 11 27.738 11 27.501C11 27.264 11.0719 27.0326 11.2061 26.8373C11.3403 26.642 11.5306 26.492 11.7519 26.407L16.6076 24.5397C16.7054 24.5019 16.7943 24.4441 16.8685 24.3699C16.9427 24.2957 17.0005 24.2069 17.0383 24.109L18.907 19.2519C18.9919 19.0306 19.142 18.8403 19.3373 18.7061C19.5326 18.5719 19.764 18.5 20.001 18.5C20.238 18.5 20.4694 18.5719 20.6647 18.7061C20.86 18.8403 21.01 19.0306 21.0949 19.2519L22.9622 24.1076C23 24.2055 23.0579 24.2943 23.132 24.3685C23.2062 24.4427 23.2951 24.5005 23.3929 24.5383L28.2205 26.3958C28.4508 26.4811 28.6491 26.6354 28.7886 26.8375C28.9281 27.0396 29.0019 27.2798 29 27.5254C28.9964 27.7582 28.923 27.9846 28.7893 28.1753C28.6556 28.366 28.4677 28.5122 28.25 28.5949L23.3943 30.4622C23.2965 30.5 23.2076 30.5579 23.1335 30.6321C23.0593 30.7062 23.0014 30.7951 22.9636 30.8929L21.0949 35.7501C21.0106 35.9716 20.8606 36.162 20.6652 36.296C20.4697 36.43 20.238 36.5012 20.001 36.5Z"
                  fill="#EB1000"
                />
                <path
                  d="M30 24.5C29.8267 24.4999 29.6576 24.4474 29.5148 24.3493C29.372 24.2512 29.2622 24.1121 29.2001 23.9504L27.9764 20.7699C27.9548 20.7139 27.9218 20.663 27.8793 20.6205C27.8369 20.5781 27.786 20.545 27.7299 20.5235L24.549 19.3C24.3874 19.2377 24.2485 19.128 24.1505 18.9852C24.0525 18.8424 24 18.6733 24 18.5002C24 18.327 24.0525 18.1579 24.1505 18.0151C24.2485 17.8724 24.3874 17.7626 24.549 17.7004L27.7299 16.4768C27.786 16.4553 27.8369 16.4222 27.8793 16.3798C27.9218 16.3373 27.9548 16.2864 27.9764 16.2304L29.191 13.0724C29.2464 12.9231 29.3413 12.7916 29.4656 12.6919C29.5898 12.5922 29.7388 12.528 29.8966 12.5062C30.0862 12.4833 30.2781 12.5243 30.4417 12.6228C30.6054 12.7213 30.7315 12.8716 30.7999 13.0499L32.0236 16.2304C32.0452 16.2864 32.0782 16.3373 32.1207 16.3798C32.1631 16.4222 32.214 16.4553 32.2701 16.4768L35.451 17.7004C35.6126 17.7626 35.7515 17.8724 35.8495 18.0151C35.9475 18.1579 36 18.327 36 18.5002C36 18.6733 35.9475 18.8424 35.8495 18.9852C35.7515 19.128 35.6126 19.2377 35.451 19.3L32.2701 20.5235C32.214 20.545 32.1631 20.5781 32.1207 20.6205C32.0782 20.663 32.0452 20.7139 32.0236 20.7699L30.7999 23.9504C30.7378 24.1121 30.628 24.2512 30.4852 24.3493C30.3424 24.4474 30.1733 24.4999 30 24.5Z"
                  fill="#FFC8C5"
                />
                <path
                  d="M14.5 19.5C14.3484 19.5 14.2004 19.4541 14.0754 19.3682C13.9504 19.2824 13.8544 19.1608 13.7999 19.0193L12.9378 16.7775C12.9191 16.7284 12.8902 16.6839 12.8531 16.6468C12.816 16.6097 12.7715 16.5809 12.7225 16.5622L10.4806 15.7C10.3391 15.6455 10.2175 15.5495 10.1317 15.4245C10.0459 15.2995 10 15.1515 10 14.9999C10 14.8483 10.0459 14.7003 10.1317 14.5754C10.2175 14.4504 10.3391 14.3543 10.4806 14.2999L12.7225 13.4377C12.7714 13.4189 12.8159 13.39 12.853 13.353C12.8901 13.3159 12.919 13.2714 12.9378 13.2224L13.7923 11.0005C13.8404 10.8697 13.9234 10.7545 14.0321 10.6673C14.1409 10.5801 14.2713 10.5241 14.4095 10.5055C14.5754 10.4853 14.7432 10.5211 14.8864 10.6072C15.0296 10.6932 15.14 10.8246 15.2001 10.9805L16.0623 13.2224C16.081 13.2714 16.1099 13.3159 16.147 13.353C16.1841 13.39 16.2286 13.4189 16.2775 13.4377L18.5194 14.2999C18.6609 14.3543 18.7825 14.4504 18.8683 14.5754C18.9541 14.7003 19 14.8483 19 14.9999C19 15.1515 18.9541 15.2995 18.8683 15.4245C18.7825 15.5495 18.6609 15.6455 18.5194 15.7L16.2775 16.5622C16.2285 16.5809 16.184 16.6097 16.1469 16.6468C16.1098 16.6839 16.0809 16.7284 16.0623 16.7775L15.2001 19.0193C15.1456 19.1608 15.0496 19.2824 14.9246 19.3682C14.7996 19.4541 14.6516 19.5 14.5 19.5Z"
                  fill="#FFC8C5"
                />
              </svg>
              <div className="flex flex-col h-full justify-between">
                <p className="font-bold lg:!text-sm 2xl:!text-xl">
                  {myDigipoints}
                </p>
                <p className="!text-xs">{t("adobeMarket.tuSaldo")}</p>
              </div>
            </div>
            <div className="flex flex-col h-full justify-between">
              <p
                className={`font-bold lg:!text-sm 2xl:!text-xl text-end ${
                  digipointsTotal > myDigipoints && "digipointsExpensive"
                }`}
              >
                {digipointsTotal}
              </p>
              <p className="!text-xs">Total DigiPoints</p>
            </div>
          </div>
          {digipointsTotal > myDigipoints && (
            <p className="text-primary !text-xs">{t("adobeMarket.noDP")}</p>
          )}
          <div>
            <button
              className="btn btn-primary w-full"
              disabled={
                digipointsTotal > myDigipoints || car.length === 0 || loading
                  ? true
                  : false
              }
              onClick={handleOrder}
            >
              {loading ? (
                <Triangle
                  height="30"
                  width="30"
                  color="#ffff"
                  ariaLabel="triangle-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                t("dashboard.redimir")
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuMarket;
