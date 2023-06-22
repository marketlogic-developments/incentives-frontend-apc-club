import React, { useState } from "react";
import ButtonBgOut from "../../components/buttons/ButtonBgOut";
import { Promociones } from "../../components/comunicados";
import { SearchIcon, Star } from "../../components/icons";

const comunicado = () => {
  const [content, setContent] = useState("Promociones");
  const fun = () => {
    console.log("Click dede layout");
  };

  const exampleDataPromociones = [
    {
      image:"/assets/dashboard/logoapc.webp",
      publishedDate: "Publicado el 24 de mayo 2023 a las 14:00 horas.",
      title: "¿Sabes cómo llegan los DigiPoints a tu cuenta?",
      summary:
        "Obtener y redimir tus DigiPoints es muy fácil. Te mostramos cómoes el proceso y la forma en la que llegan a tu cuenta para que puedas redimir tus premios en los establecimientos afiliados.",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ",
    },
    {
      image:"/assets/dashboard/logoapc.webp",
      publishedDate: "Publicado el 24 de mayo 2023 a las 14:00 horas.",
      title: "¡Tus DigiPoints valen doble en Junio 2023!",
      summary:
        "Obtener y redimir tus DigiPoints es muy fácil. Te mostramos cómo es el proceso y la forma en la que llegan a tu cuenta para que puedas redimir tus premios en los establecimientos afiliados.",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ",
    },
    {
      image:"/assets/dashboard/logoapc.webp",
      publishedDate: "Publicado el 24 de mayo 2023 a las 14:00 horas.",
      title: "Gana el doble de DigiPoints en licencias Creative Cloud ",
      summary:
        "Obtener y redimir tus DigiPoints es muy fácil. Te mostramos cómo es el proceso y la forma en la que llegan a tu cuenta para que puedas redimir tus premios en los establecimientos afiliados.",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ",
    },
  ];

  const dataSelectOne = [
    { image: "", value: "promo1", label: "Promoción 1" },
    { image: "", value: "promo2", label: "Promoción 2" },
    { image: "", value: "promo3", label: "Promoción 3" },
  ];

  return (
    <div className="grid w-full">
      <div className="gap-2 my-3 flex justify-start">
        <ButtonBgOut
          title={"Promociones"}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={() => setContent("Promociones")}
        />
        <ButtonBgOut
          title={"Market place"}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={() => setContent("Market place")}
        />
        <ButtonBgOut
          title={"Novedades"}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={() => setContent("Novedades")}
        />
        <ButtonBgOut
          title={"Eventos"}
          styles={"hover:bg-red-100 hover:!text-red-500 hover:!text-sm"}
          onClick={() => setContent("Eventos")}
        />
      </div>
      {(() => {
        switch (content) {
          case "Promociones":
            return (
              <Promociones
                selectData={dataSelectOne}
                datas={exampleDataPromociones}
              />
            );
          case "Market place":
            return <Star />;
          case "Novedades":
            return <SearchIcon />;
          case "Eventos":
            return <Star />;
          default:
            return <Promociones />;
        }
      })()}
    </div>
  );
};

export default comunicado;
