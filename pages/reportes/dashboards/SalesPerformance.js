import React from "react";
import {
  ArrowDown,
  CloudDownload,
  RocketIcon,
  SearchIcon,
  VeticalPoints,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import {
  BarChar,
  BtnFilter,
  BtnWithImage,
  CardChart,
  DropDownReport,
  InputReporte,
  LineChart,
  TableSalePerformance,
  TitleWithIcon,
} from "../../../components";

const SalesPerformance = () => {
  const example = [
    {
      compania: "Adobe",
      region: "-",
      pais: "Colombia",
      membership_Id: "Adobe",
      tipo: "ML0001",
      nivel: "Gold certified",
      status: "Inactivo",
      registrado: "Sí",
      cc_renewal: "0",
      cc_new_business: "396,942",
      dc_renewal: "0",
    },
    {
      compania: "Adobe",
      region: "-",
      pais: "Guatemala",
      membership_Id: "Adobe",
      tipo: "ML0001",
      nivel: "Gold certified",
      status: "Activo",
      registrado: "Sí",
      cc_renewal: "0",
      cc_new_business: "396,942",
      dc_renewal: "0",
    },
  ];
  const dataOne = [
    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
  ];
  const dataTwo = [
    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
  ];
  const xValuesBar = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const data = [
    2.3, 6.0, 18.8, 48.7, 182.2, 175.6, 70.7, 28.7, 26.4, 9.0, 5.9, 2.6,
  ];
  const xValuesLine = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

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
        <div className="grid sm:grid-cols-3 lg:grid-cols-7 grid-rows-1 items-center justify-items-center">
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
          <BtnFilter
            text={t("Reportes.filtrar")}
            styles="bg-white !text-blue-500 hover:bg-white border-blue-500 hover:border-blue-600"
          />
          <BtnFilter
            text={t("Reportes.limpiar_filtros")}
            styles="bg-white !text-gray-400 hover:bg-white border-none hover:border-none m-1"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-rows-1 grid-rows-1 w-full gap-2">
        <CardChart title={t("Reportes.metas_vs_cumplimiento")} paragraph="">
          <BarChar
            title={t("Reportes.ventas_mensuales")}
            colorBarOne={"black"}
            colorBarTwo={"#2799F6"}
            dataLeyend={[
              t("Reportes.ingresos_esperados"),
              t("Reportes.ingreso_actual"),
            ]}
            dataOne={dataOne}
            dataTwo={dataTwo}
            xValues={xValuesBar}
          />
        </CardChart>
        <CardChart title={t("Reportes.digiponits")}>
          <LineChart
            title={t("Reportes.dp_cargados_mensualmente")}
            color={"red"}
            xValues={xValuesLine}
            data={data}
          />
        </CardChart>
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1">
        <div className="grid sm:grid-cols-3 grid-rows-1 sm:justify-items-start justify-items-center mt-3">
          <div className="font-bold flex items-center">
            <h2 className="lg:text-lg sm:text-xl">
              {t("organizacion.organizaciones")}
            </h2>
          </div>
          <div className="grid col-span-2 sm:w-[55%] w-[60%]">
            <DropDownReport icon={<ArrowDown />} title={t("Reportes.periodo")}>
              <li>
                <a>Período 1</a>
              </li>
              <li>
                <a>Período 2</a>
              </li>
            </DropDownReport>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-rows-1 sm:justify-items-end justify-items-center mt-3">
          <div className="grid sm:w-[55%]">
            <BtnWithImage
              text={t("Reportes.descargar")}
              icon={<CloudDownload />}
              styles={
                "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
              }
            />
          </div>
          <InputReporte
            image={<SearchIcon />}
            placeHolder={t("Reportes.buscar")}
            stylesContainer={"mt-2"}
            stylesInput={
              "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
            }
            stylesImage={"pb-0"}
          />
        </div>
      </div>
      <div className="grid grid-rows-1 justify-items-center">
        <TableSalePerformance
          containerStyles={"mt-5 rounded-tl-lg rounded-tr-lg"}
          tableStyles={"table-zebra !text-sm"}
          thStyles={"sticky text-white"}
          checkboxStyles={"!checkbox-xs mt-1 border-white bg-base-200"}
          cols={[
            t("Reportes.compania"),
            t("Reportes.region"),
            t("Reportes.pais"),
            t("Reportes.membership_Id"),
            t("Reportes.tipo"),
            t("Reportes.nivel"),
            t("Reportes.status"),
            t("Reportes.registrado"),
            t("Reportes.cc_Renewal"),
            t("Reportes.cc_New_business"),
            t("Reportes.dc_Renewal"),
          ]}
        >
          {example.length !== 0 &&
            example.map((data, index) => (
              <tr>
                <th>
                  <label className="text-left">
                    <input
                      type="checkbox"
                      className="!checkbox-xs mt-1 border-white bg-base-200"
                    />
                  </label>
                </th>
                <td className="text-left">{data.compania}</td>
                <td className="text-left">{data.region}</td>
                <td className="text-left">{data.pais}</td>
                <td className="text-left">{data.membership_Id}</td>
                <td className="text-left">{data.tipo}</td>
                <td className="text-left">{data.nivel}</td>
                <td className="text-left">
                  {data.status === t("Reportes.inactivo") ? (
                    <div class="badge bg-red-200 text-red-600 text-sm text-left">
                      {t("Reportes.inactivo")}
                    </div>
                  ) : (
                    <div class="badge bg-green-200 text-green-600 text-sm border-green-300 text-left">
                      {t("Reportes.activo")}
                    </div>
                  )}
                </td>
                <td className="text-left">{data.registrado}</td>
                <td className="text-left">{data.cc_renewal}</td>
                <td className="text-left">{data.cc_new_business}</td>
                <td className="text-left">
                  <div className="grid grid-cols-2">
                    <div className="grid text-left">
                      {data.dc_renewal}
                    </div>
                    <div
                      className="grid justify-items-end mr-3 cursor-pointer"
                      onClick={() => {
                        console.log("Opciones");
                      }}
                    >
                      <VeticalPoints />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </TableSalePerformance>
      </div>
    </div>
  );
};

export default SalesPerformance;
