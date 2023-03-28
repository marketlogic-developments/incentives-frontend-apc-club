import React from "react";
import { useTranslation } from "react-i18next";

const CardProduct = ({ info, index }) => {
  const [t, i18n] = useTranslation("global");

  return (
    <>
      <div key={index} class="flip-card-market justify-self-center">
        <div class="flip-card-inner-market">
          <div class="flip-card-front-market">
            <div className="card-details justify-center">
              <figure className="cursor-pointer">
                <img src={info.imagePath} alt={info.name} className="w-1/4" />
              </figure>
              <p className="text-title">
                {t("redenciones.cantidad")} <br /> {info.quantity}
              </p>
              <p className="text-title">
                {t("redenciones.precio")} <br />
                {`${info.price * info.quantity} DigiPoints`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
