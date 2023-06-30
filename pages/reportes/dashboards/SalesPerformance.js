import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalesPerformance } from "../../../store/reducers/sales.reducer";
import {
  ArrowDown,
  CloudDownload,
  RocketIcon,
  SearchIcon,
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
import { Menu, Button } from "@mantine/core";
import * as XLSX from "xlsx";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SalesPerformance = () => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const products = useSelector((state) => state.sales.products);
  const [data, setData] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);

  const importFile = (data) => {
    // const workbook = XLSX.utils.book_new();
    // const sheet = XLSX.utils.json_to_sheet(data);
    // XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    // XLSX.writeFile(workbook, "Productos_Participantes.xlsx");

    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Productos Participantes.csv");
    });
  };
  const example = [
    {
      id: 1,
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
      id: 2,
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
  const datas = [
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getSalesPerformance(token))
        .then((response) => {
          setLoading(false);
          setData(response.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded]);

  function Table({ currentItems }) {
    return (
      <>
        <table className="w-full text-sm text-left text-black-500 table-fixed tableJustify overflow-x-auto rounded-md">
          <thead className="rounded h-12 bg-[#232B2F] text-xs text-[#F5F5F5] gap-5">
            <tr>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Country</th>
              <th scope="col" className="py-3 px-6">Region</th>
              <th scope="col" className="py-3 px-6">Company ID</th>
              <th scope="col" className="py-3 px-6">Company Name</th>
              <th scope="col" className="py-3 px-6">Company Level</th>
              <th scope="col" className="py-3 px-6">Company Type</th>
              <th scope="col" className="py-3 px-6">VIP CC Renewal</th>
              <th scope="col" className="py-3 px-6">VIP CC New business</th>
              <th scope="col" className="py-3 px-6">VIP DC Renewal</th>
              <th scope="col" className="py-3 px-6">VIP DC New Business</th>
              <th scope="col" className="py-3 px-6">VMP CC Renewal</th>
              <th scope="col" className="py-3 px-6">VMP CC New business</th>
              <th scope="col" className="py-3 px-6">VMP DC Renewal</th>
              <th scope="col" className="py-3 px-6">VMP DC New Business</th>
              <th scope="col" className="py-3 px-6">VIP Revenue Q1</th>
              <th scope="col" className="py-3 px-6">VIP Revenue Q2</th>
              <th scope="col" className="py-3 px-6">VIP Revenue Q3</th>
              <th scope="col" className="py-3 px-6">VIP Revenue Q4</th>
              <th scope="col" className="py-3 px-6">VMP Revenue Q1</th>
              <th scope="col" className="py-3 px-6">VMP Revenue Q2</th>
              <th scope="col" className="py-3 px-6">VMP Revenue Q3</th>
              <th scope="col" className="py-3 px-6">VMP Revenue Q4</th>
              <th scope="col" className="py-3 px-6">Revenue Q1</th>
              <th scope="col" className="py-3 px-6">Revenue Q2</th>
              <th scope="col" className="py-3 px-6">Revenue Q3</th>
              <th scope="col" className="py-3 px-6">Revenue Q4</th>
              <th scope="col" className="py-3 px-6">Actual Revenue</th>
              <th scope="col" className="py-3 px-6">Sales DigiPoints</th>
              <th scope="col" className="py-3 px-6">Company</th>
              <th scope="col" className="py-3 px-6">Company</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((product, index) => (
                <tr
                  className={`${
                    (index + 1) % 2 === 0 && "bg-[#F5F5F5]"
                  } w-full`}
                  key={index}
                >
                  <th scope="col" className="py-3 px-6">Email</th>
                  <th scope="col" className="py-3 px-6">Name</th>
                  <th scope="col" className="py-3 px-6">Country</th>
                  <th scope="col" className="py-3 px-6">Region</th>
                  <th scope="col" className="py-3 px-6">Company ID</th>
                  <th scope="col" className="py-3 px-6">Company Name</th>
                  <th scope="col" className="py-3 px-6">Company Level</th>
                  <th scope="col" className="py-3 px-6">Company Type</th>
                  <th scope="col" className="py-3 px-6">VIP CC Renewal</th>
                  <th scope="col" className="py-3 px-6">VIP CC New business</th>
                  <th scope="col" className="py-3 px-6">VIP DC Renewal</th>
                  <th scope="col" className="py-3 px-6">VIP DC New Business</th>
                  <th scope="col" className="py-3 px-6">VMP CC Renewal</th>
                  <th scope="col" className="py-3 px-6">VMP CC New business</th>
                  <th scope="col" className="py-3 px-6">VMP DC Renewal</th>
                  <th scope="col" className="py-3 px-6">VMP DC New Business</th>
                  <th scope="col" className="py-3 px-6">VIP Revenue Q1</th>
                  <th scope="col" className="py-3 px-6">VIP Revenue Q2</th>
                  <th scope="col" className="py-3 px-6">VIP Revenue Q3</th>
                  <th scope="col" className="py-3 px-6">VIP Revenue Q4</th>
                  <th scope="col" className="py-3 px-6">VMP Revenue Q1</th>
                  <th scope="col" className="py-3 px-6">VMP Revenue Q2</th>
                  <th scope="col" className="py-3 px-6">VMP Revenue Q3</th>
                  <th scope="col" className="py-3 px-6">VMP Revenue Q4</th>
                  <th scope="col" className="py-3 px-6">Revenue Q1</th>
                  <th scope="col" className="py-3 px-6">Revenue Q2</th>
                  <th scope="col" className="py-3 px-6">Revenue Q3</th>
                  <th scope="col" className="py-3 px-6">Revenue Q4</th>
                  <th scope="col" className="py-3 px-6">Actual Revenue</th>
                  <th scope="col" className="py-3 px-6">Sales DigiPoints</th>
                  <th scope="col" className="py-3 px-6">Company</th>
                  <th scope="col" className="py-3 px-6">Company</th>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return data.slice(itemOffset, endOffset);
  }, [itemOffset, data]);

  const pageCount = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  };
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
            data={datas}
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
      <div className="w-full pt-5">
          {loading && <div className="lds-dual-ring"></div>}
          {!loading && (
            <>
              <Table currentItems={currentItems} />
              <ReactPaginate
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                nextClassName={"item next "}
                previousClassName={"item previous"}
                activeClassName={"item active "}
                breakClassName={"item break-me "}
                breakLabel={"..."}
                disabledClassName={"disabled-page"}
                pageClassName={"item pagination-page "}
                nextLabel={
                  <FaChevronRight style={{ color: "#000", fontSize: "20" }} />
                }
                previousLabel={
                  <FaChevronLeft style={{ color: "#000", fontSize: "20" }} />
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesPerformance;
