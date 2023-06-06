import { Modal } from "@mantine/core";
import axios from "axios";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ContainerContent from "../components/containerContent";
import AllParticipants from "../components/herramientas/AllParticipants";
import AllRedenciones from "../components/herramientas/AllRedenciones";
import Canales from "../components/herramientas/Canales";
import Distribuidores from "../components/herramientas/Distribuidores";

const allRedeem = () => {
    const [t, i18n] = useTranslation("global");
    const [content, setContent] = useState(0);


    return (
        <>
            <ContainerContent pageTitle={"Redenciones"}>
                <AllRedenciones />
            </ContainerContent>
        </>
    );
};

export default allRedeem;
