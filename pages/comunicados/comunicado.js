import React, { useState } from "react";
import ButtonBgOut from "../../components/buttons/ButtonBgOut";
import { MarkertPlace, Promociones } from "../../components/comunicados";
import { SearchIcon, Star } from "../../components/icons";
import { exampleDataPromociones as data } from "../../components/example/dataComunicado";

const comunicado = () => {
  const [content, setContent] = useState("Promociones");

  const exampleDataPromociones = data;

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
            return <MarkertPlace />;
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
