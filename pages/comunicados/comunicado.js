import React, { useState } from "react";
import ButtonBgOut from "../../components/buttons/ButtonBgOut";
import { Promociones } from "../../components/comunicados";
import { SearchIcon, Star } from "../../components/icons";

const comunicado = () => {
  const [content, setContent] = useState("Promociones");
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
            return <Promociones />;
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
