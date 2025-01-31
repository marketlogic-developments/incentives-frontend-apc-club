import { useRouter } from "next/router";
import React, { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { setMenuMarket } from "../../../store/reducers/awards.reducer";
import { useTranslation } from "react-i18next";
import { TYSvgOrder } from "public/assets/Icons/MarketplaceIcons/MarketplaceIcons";

const ModalTY = ({ setOpened }:{setOpened:Dispatch<React.SetStateAction<boolean>>}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  return (
    <div className="flex flex-col p-6 gap-6 justify-center" >
      <div className="w-full justify-center flex">
        <TYSvgOrder />
      </div>
      <div className="w-full">
        <p className="!text-2xl font-bold text-center">
          {t("adobeMarket.felicitaciones")}
        </p>
      </div>
      <div className="w-full">
        <p className="!text-xs text-center">
          {t("adobeMarket.descFelicitaciones")}
        </p>
      </div>
      <div className="w-full flex justify-center">
        <button
          className="btn btn-info w-1/2"
          onClick={() => {
            router.push("/estadoProducto");
            setOpened(false);
            dispatch(setMenuMarket(false));
          }}
        >
          {t("shoopingcar.ir")}
        </button>
      </div>
    </div>
  );
};

export default ModalTY;
