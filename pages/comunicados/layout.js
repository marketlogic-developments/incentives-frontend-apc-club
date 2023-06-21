import React from "react";
import ButtonBgOut from "../../components/buttons/ButtonBgOut";
import TitleWithIcon from "../../components/titles/TitleWithIcon";
import { Star } from "../../components/icons";
import SelectInput from "../../components/inputs/SelectInput";

const layout = () => {
  const fun = () => {
    console.log("Click dede layout");
  };
  return (
    <div className="grid w-full">
      <div className="flex gap-2 my-3">
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
      <div className="grid grid-rows-2 justify-items-center">
        <div className="font-bold text-4xl">
          Entérate de las noticias y beneficios más{" "}
        </div>
        <div className="flex justify-start gap-3">
          <p className="font-bold text-4xl">recientes que te brinda el </p>
          <p className="font-bold text-4xl text-red-600"> APC Club</p>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-items-center pt-8">
        <div className="grid grid-cols-2 gap-3">
          <TitleWithIcon
            icon={<Star width={40} height={40} />}
            title={"Promociones"}
          />
          <div className="grid justify-items-end">
            <SelectInput />
          </div>
        </div>
        <div>buscador</div>
      </div>
      <div>5</div>
    </div>
  );
};

export default layout;
