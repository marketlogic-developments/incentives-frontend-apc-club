import React from "react";
import { useTranslation } from "react-i18next";

const CardProduct = ({ info, index }) => {
  const [t, i18n] = useTranslation("global");
  console.log(info);

  return (
    <>
      <div key={index} class="flip-card-market justify-self-center !h-[400px]">
        <div class="flip-card-inner-market">
          <div class="flip-card-front-market overflow-hidden py-6">
            <div className="card-details justify-center">
              <figure className="cursor-pointer bg-[#333333] p-6">
                <img src={info.imagePath} alt={info.name} className="w-1/4" />
              </figure>
              <p className="text-title">
                Valor de la tarjeta: <br />
                {`$${info.price}`}
              </p>
              <p className="text-title">
                {t("redenciones.cantidad")} <br /> {info.quantity}
              </p>
              <p className="text-title">
                {t("redenciones.precio")} <br />
                {`${info.digipoints * info.quantity} DigiPoints`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
