import React from "react";
import ButtonBgOut from "../../components/buttons/ButtonBgOut";
import TitleWithIcon from "../../components/titles/TitleWithIcon";
import { SearchIcon, Star } from "../../components/icons";
import SelectInput from "../../components/inputs/SelectInput";
import { SearchInput } from "../../components/inputs";

const comunicado = () => {
  const fun = () => {
    console.log("Click dede layout");
  };

  const dataSelectOne = [
    { image: "", value: "promo1", label: "Promoción 1" },
    { image: "", value: "promo2", label: "Promoción 2" },
    { image: "", value: "promo3", label: "Promoción 3" },
  ];

  return (
    <div className="grid w-full">
      <div className="gap-2 my-3 sm:flex sm:justify-start grid justify-items-center">
        <ButtonBgOut
          title={"Promociones"}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={fun}
        />
        <ButtonBgOut
          title={"Market place"}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
        />
        <ButtonBgOut
          title={"Novedades"}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
        />
        <ButtonBgOut
          title={"Eventos"}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
        />
      </div>
      <div className="grid justify-items-center items-center pt-8 pb-8">
        {" "}
        BIENVENIDO A NUESTRO BOARD DE COMUNICADOS
      </div>
      <div className="grid justify-items-center">
        <div className="font-bold sm:text-4xl text-xl text-center">
          Entérate de las noticias y beneficios más{" "}
        </div>
        <div className="font-bold sm:text-4xl text-xl text-center">
          recientes que te brinda el
        </div>
        <div className="font-bold sm:text-4xl text-xl text-center text-red-600">
          APC Club
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 justify-items-center pt-8">
        <div className="grid grid-cols-2 gap-3">
          <TitleWithIcon
            icon={<Star width={40} height={40} />}
            title={"Promociones"}
          />
          <div className="grid justify-items-end items-center">
            <SelectInput
              placeholder={"Mostrar todas"}
              size={"sm"}
              data={dataSelectOne}
            />
          </div>
        </div>
        <div className="grid items-center justify-items-center w-full">
          <SearchInput
            image={<SearchIcon />}
            placeHolder={"Buscar"}
            stylesContainer={""}
            stylesInput={
              "border-none pl-8 placeholder:text-sm rounded-full !w-full"
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center pt-10">
        <div className="grid grid-cols-3 gap-3 gap-y-6">
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
              Obtener y redimir tus DigiPoints es muy fácil. Te mostramos cómo
              es el proceso y la forma en la que llegan a tu cuenta para que
              puedas redimir tus premios en los establecimientos afiliados.
            </p>
            <a className="text-blue-500 font-bold cursor-pointer hover:text-blue-400 sm:text-sm text-xs">
              Leer más
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default comunicado;
