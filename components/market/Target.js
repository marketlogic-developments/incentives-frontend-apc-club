import React from "react";

const Target = ({ cardInfo }) => {
  const backgroundColorCard = () => {
    const colorbg = {
      60: "#EB1000",
      100: "#1473E6",
      150: "#009C3B",
      200: "#000000",
      300: "#21A5A2",
      400: "#E9740A",
      500: "#6349E0",
    };

    return colorbg[cardInfo.price];
  };

  return (
    <div
      className={`w-full rounded-lg px-4 pt-6 h-full`}
      style={{ backgroundColor: backgroundColorCard() }}
    >
      <div>
        <div className="flex justify-between">
          <div className="text-white flex flex-col gap-3">
            <p className="2xl:!text-7xl lg:!text-5xl xl:!text-6xl font-bold text-white">
              ${cardInfo.price}
            </p>
            <p className="2xl:!text-xl xl:!text-lg lg:!text-base font-light px-1 text-white">
              Gift Card
            </p>
          </div>
          <figure className="flex items-center">
            <img
              src={cardInfo.imagePath}
              alt="apc_canales"
              className="w-[40%] ml-auto"
            />
          </figure>
        </div>
      </div>
      <div className="grid grid-cols-3 place-items-center">
        <figure className="p-6">
          <img
            src="/assets/login/adobe.webp"
            alt="apc_canales"
            className="w-full"
          />
        </figure>
        <figure className="p-2">
          <img
            src="/assets/login/pcc.webp"
            alt="apc_canales"
            className="w-full"
          />
        </figure>
        <figure className="flex p-2">
          <img
            src="/assets/dashboard/logoapc.webp"
            alt="apc_canales"
            className="w-[30%]"
          />
        </figure>
      </div>
    </div>
  );
};

export default Target;
