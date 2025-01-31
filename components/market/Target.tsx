import React from "react";
import { Award } from "services/Awards/awards.service";

const Target = ({ cardInfo }:{cardInfo:Award}) => {
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
      className={`flex flex-col w-full rounded-lg px-8 py-8 h-full gap-6`}
      style={{ backgroundImage: backgroundColorCard() }}
    >
      <div>
        <div className="flex justify-between">
          <div className="text-white flex flex-col gap-3">
            <p className="2xl:!text-5xl lg:!text-4xl xl:!text-5xl !text-2xl font-thin text-white">
              ${cardInfo.value}
            </p>
            <p className="2xl:!text-xl xl:!text-lg lg:!text-base !text-sm font-light px-1 text-white whitespace-nowrap">
              Gift Card
            </p>
          </div>
          <figure className="flex items-start">
            <img
              src={cardInfo.image}
              alt="apc_canales"
              className="w-[22%] ml-auto min-h-[34px] object-contain"
            />
          </figure>
        </div>
      </div>
      <div className="flex justify-between">
        <figure>
          <img
            src="/assets/login/adobe.webp"
            alt="apc_canales"
            className="w-1/3"
          />
        </figure>
        <figure>
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

export default Target;
