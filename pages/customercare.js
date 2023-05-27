import { Modal } from "@mantine/core";
import axios from "axios";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import AllParticipants from "../components/costumerCare/AllParticipants";
import AllRedenciones from "../components/costumerCare/AllRedenciones";
import Canales from "../components/costumerCare/Canales";
import Distribuidores from "../components/costumerCare/Distribuidores";

const customercare = () => {
  const [t, i18n] = useTranslation("global");
  const [content, setContent] = useState(2);

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
  }, [content]);

  return (
    <>
      <ContainerContent pageTitle={"Customer Care"}>
        <div className="m-6 flex flex-col gap-16">
          <div className="grid grid-flow-col auto-cols-fr place-items-center text-center border-b ">
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
          </div>
          <div>{typeContent}</div>
        </div>
      </ContainerContent>
    </>
  );
};

export default customercare;
