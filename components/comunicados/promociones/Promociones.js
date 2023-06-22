import React from "react";

const Promociones = () => {
  return (
    <>
      <div className="sm:ml-14 col-span-1 object-contain flex justify-center items-center">
        <img
          src="/assets/dashboard/banners/prom.webp"
          className="object-contain rounded-md"
          alt=""
        />
      </div>
      <div className="grid col-span-2 justify-items-start sm:pr-56 md:pr-3 pr-3">
        <p className="sm:text-sm text-xs">
          Publicado el 24 de mayo 2023 a las 14:00 horas.
        </p>
        <p className="font-bold sm:text-2xl text-sm">
          ¿Sabes cómo llegan los DigiPoints a tu cuenta?
        </p>
        <p>
          Obtener y redimir tus DigiPoints es muy fácil. Te mostramos cómo es el
          proceso y la forma en la que llegan a tu cuenta para que puedas
          redimir tus premios en los establecimientos afiliados.
        </p>
        <a className="text-blue-500 font-bold cursor-pointer hover:text-blue-400 sm:text-sm text-xs">
          Leer más
        </a>
      </div>
    </>
  );
};

export default Promociones;
