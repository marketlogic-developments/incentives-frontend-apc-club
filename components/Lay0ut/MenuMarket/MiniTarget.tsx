import React from "react";
import { ShoppingCarProduct } from "services/Awards/awards.service";

const MiniTarget = ({ cardInfo }:{cardInfo:ShoppingCarProduct}) => {
  const backgroundColorCard = () => {
    const colorbg: any = {
      "50": "#FF709F-#FF4885",
      "60": "#E44E40-#F0382A",
      "100": "#A65CE7-#8925E0",
      "150": "#30A7FE-#3B62FB",
      "200": "#27CAD8-#0FB1C0",
      "300": "#10CFA9-#0DB595",
      "400": "#6ECE2A-#4BAD05",
      "500": "#FFC15E-#FF9B00",
    };

     // Verifica si cardInfo.value existe en el objeto colorbg
     if (cardInfo.value && colorbg[cardInfo.value]) {
      const [color1, color2] = colorbg[cardInfo.value].split("-");
      return `linear-gradient(77deg, ${color1} 0%, ${color2} 100%)`;
    }
  
    // Si no existe, devuelve un gradiente por defecto o un color sólido
    return "linear-gradient(77deg, #FFFFFF 0%, #CCCCCC 100%)"; // Gradiente por defecto
  };

  return (
    <div
      className={`w-[102.52px] lg:h-[59px] h-[70px] rounded-lg p-2`}
      style={{ backgroundImage: backgroundColorCard() }}
    >
      <div>
        <div className="flex justify-between">
          <div className="text-white flex flex-col">
            <p className="!text-base font-thin">${cardInfo?.value}</p>
            <p
              className="!text-[5px] font-light px-1"
              style={{ whiteSpace: "nowrap" }}
            >
              Gift Card
            </p>
          </div>
          <figure className="flex items-center">
            <img
              src={cardInfo?.image}
              alt="apc_canales"
              className="w-[60%] ml-auto"
            />
          </figure>
        </div>
      </div>
      <div className="flex justify-around place-items-center gridMiniCards">
        <figure className="p-1">
          <img
            src="/assets/login/adobe.webp"
            alt="apc_canales"
            className="w-1/2"
          />
        </figure>
        <figure className="p-1">
          <img
            src="/assets/login/pcc.webp"
            alt="apc_canales"
            className="w-full"
          />
        </figure>
      </div>
    </div>
  );
};

export default MiniTarget;
