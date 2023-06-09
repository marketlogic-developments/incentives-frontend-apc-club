import React from "react";
import { ArrowDown, RocketIcon } from "../../../components/icons";
import { useTranslation } from "react-i18next";
import { DropDownReport, TitleWithIcon } from "../../../components";

const SalesPerformance = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon
          icon={<RocketIcon />}
          title={t("Reportes.sales_performance")}
        />
      </div>
      <div className="grid grid-row-1 mt-8">
        <div className="grid sm:grid-cols-3 lg:grid-cols-9 grid-rows-1 items-center justify-items-center">
          <DropDownReport
            icon={<ArrowDown />}
            title={t("organizacion.organizacion")}
          >
            <li>
              <a>Organización 1</a>
            </li>
            <li>
              <a>Organización 2</a>
            </li>
          </DropDownReport>
          <DropDownReport
            icon={<ArrowDown />}
            title={t("organizacion.organizaciones")}
          >
            <li>
              <a>Organizacion 1</a>
            </li>
            <li>
              <a>Organización 2</a>
            </li>
          </DropDownReport>
          <DropDownReport icon={<ArrowDown />} title={t("Reportes.usuarios")}>
            <li>
              <a>Usuario 1</a>
            </li>
            <li>
              <a>Usuario 2</a>
            </li>
          </DropDownReport>
          <DropDownReport
            icon={<ArrowDown />}
            title={t("Reportes.tipos_usuarios")}
          >
            <li>
              <a>Tipo 1</a>
            </li>
            <li>
              <a>Tipo 2</a>
            </li>
          </DropDownReport>
          <DropDownReport icon={<ArrowDown />} title={t("Reportes.anios")}>
            <li>
              <a>Año 1</a>
            </li>
            <li>
              <a>Año 2</a>
            </li>
          </DropDownReport>
          <div className="col-span-2">6</div>
          <div className="col-span-2">7</div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div>Card 1</div>
        <div>Card 2</div>
      </div>
      <div className="grid grid-rows-1">
        <div className="grid grid-cols-2 justify-items-start">
          <div>Organización</div>
          <div>Option List</div>
        </div>
        <div className="grid grid-cols-2 justify-items-end">
          <div>Descarga</div>
          <div>Bucador</div>
        </div>
      </div>
      <div className="grid grid-rows-1 justify-items-center">
        <div>Table</div>
      </div>
    </div>
  );
};

export default SalesPerformance;
