import React, { useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ContainerContent from "../../components/containerContent";
import AllParticipants from "../../components/herramientas/AllParticipants";
import AllRedenciones from "../../components/herramientas/AllRedenciones";
import Canales from "../../components/herramientas/Canales";
import Distribuidores from "../../components/herramientas/Distribuidores";

const canalesyDistribuidores = () => {
  const [t, i18n] = useTranslation("global");
  const [content, setContent] = useState(0);

  const typeContent = useMemo(() => {
    if (content === 0) {
      return <Canales />;
    }
    if (content === 1) {
      return <Distribuidores />;
    }
    if (content === 2) {
      return <AllParticipants />;
    }
    if (content === 3) {
      return <AllRedenciones />;
    }
  }, [content]);

  return (
    <>
      <ContainerContent pageTitle={"Herramientas administrativas"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="grid grid-cols-4 place-items-center text-center border-b">
            <p
              className={`h-full w-full p-3 cursor-pointer ${
                content === 0 && "border-b-2 border-[#eb1000] text-[#eb1000]"
              }`}
              onClick={() => setContent(0)}
            >
              Canales
            </p>
            <p
              className={`h-full w-full p-3 cursor-pointer ${
                content === 1 && "border-b-2 border-[#eb1000] text-[#eb1000]"
              }`}
              onClick={() => setContent(1)}
            >
              Distribuidores
            </p>
            <p
              className={`h-full w-full p-3 cursor-pointer ${
                content === 2 &&
                "border-b-2 border-[#eb1000] text-[#eb1000] cursor-pointer"
              }`}
              onClick={() => setContent(2)}
            >
              Todos los Participantes
            </p>
            <p
              className={`h-full w-full p-3 cursor-pointer ${
                content === 3 &&
                "border-b-2 border-[#eb1000] text-[#eb1000] cursor-pointer"
              }`}
              onClick={() => setContent(3)}
            >
              Redenciones
            </p>
          </div>
          <div>{typeContent}</div>
        </div>
      </ContainerContent>
    </>
  );
};

export default canalesyDistribuidores;
