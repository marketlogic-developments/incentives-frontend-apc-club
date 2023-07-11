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
  Table,
  TitleWithIcon,
  SelectInputValue,
} from "../../../components";
import { Menu, Button } from "@mantine/core";
import * as XLSX from "xlsx";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";

const SalesPerformance = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [filters, setFilters] = useState({
    company: "",
    level: "",
    region: "",
  });
  const [selectOne, setSelectOne] = useState("");
  const [searchByInvoice, setSearchByInvoice] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const products = useSelector((state) => state.sales.products);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const numberToMoney = (quantity = 0) => {
    return `$ ${Number(quantity)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
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
  const dataOnew = [
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

  /* Download */
  const importFile = (data) => {
    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Sales Performance.csv");
    });
  };

  /* Selects */
  const handleFilters = (name, value) => {
    if (name === "company") {
      return setFilters({ level: "", region: "", company: value });
    }

    return setFilters({ ...filters, [name]: value });
  };

  const setRegion = [...new Set(data.map(({ region }) => region))];

  const setLevel = [...new Set(data.map(({ level }) => level))];

  /* Filter */
  const filteredUsers = data.filter((user) => {
    if (
      selectOne &&
      !user.reseller_or_dist_name
        .toString()
        .toLowerCase()
        .includes(selectOne.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const dataTable = useMemo(() => {
    return filteredUsers.filter((item) => {
      if (filters.company !== "") {
        return item.company_name === filters.company;
      }

      if (filters.level !== "" && filters.region !== "") {
        return item.level === filters.level && item.region === filters.region;
      }

      if (filters.level !== "") {
        return item.level === filters.level;
      }
      if (filters.region !== "") {
        return item.region === filters.region;
      }

      return item;
    });
  }, [filters, filteredUsers]);

  console.log(dataTable);

  /* Clear Filter */
  const clearSelects = () => {
    setFilters({
      company: "",
      level: "",
      region: "",
    });
  };

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(itemOffset, endOffset);

    if (dataTable.length === 1) {
      return dataTable;
    }

    return dataTable.slice(itemOffset, endOffset);
  }, [itemOffset, dataTable]);

  /* Paginate */
  const pageCount = useMemo(
    () => Math.ceil(dataTable.length / itemsPerPage),
    [dataTable, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;

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
      <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
        <AiOutlineHome
          className="cursor-pointer"
          onClick={() => {
            router.push("/dashboard");
          }}
        />
        <span>
          <AiOutlineRight />
        </span>
        <span
          className="cursor-pointer"
          onClick={() => {
            router.push("/reportesDashboard");
          }}
        >
          My Reports
        </span>
        <span>
          <AiOutlineRight />
        </span>
        <span className="font-bold text-[#1473E6]">
          {t("Reportes.sales_performance")}
        </span>
      </div>
      {/* <div className="grid grid-row-1 mt-8">
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
      </div> */}
      {/* <div className="grid sm:grid-cols-2 md:grid-rows-1 grid-rows-1 w-full gap-2">
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
      </div> */}
      <div className="grid sm:grid-cols-2 grid-rows-1">
        <div className="grid sm:grid-cols-3 sm:justify-items-start justify-items-center mt-3">
          <div className="sm:w-[90%] w-[60%]">
            <SelectInputValue
              placeholder={"Company Name"}
              value={filters.company}
              data={filteredUsers.map(({ company_name }) => company_name)}
              icon={<ArrowDown />}
              onChange={handleFilters}
              name={"company"}
            />
          </div>
          <div className="sm:w-[90%] w-[60%]">
            <SelectInputValue
              placeholder={"Level"}
              value={filters.level}
              data={setLevel.map((item) => item)}
              icon={<ArrowDown />}
              onChange={handleFilters}
              name={"level"}
              disabled={filters.company !== "" ? true : false}
            />
          </div>
          <div className="sm:w-[90%] w-[60%]">
            <SelectInputValue
              placeholder={"Region"}
              value={filters.region}
              data={setRegion.map((item) => item)}
              icon={<ArrowDown />}
              onChange={handleFilters}
              name={"region"}
              disabled={filters.company !== "" ? true : false}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-rows-1 sm:justify-items-end justify-items-center mt-3">
          <div
            className="grid sm:w-[45%]"
            onClick={() => importFile(dataTable)}
          >
            <BtnWithImage
              text={t("Reportes.descargar")}
              icon={<CloudDownload />}
              styles={
                "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
              }
            />
          </div>
          <div className="grid sm:w-[45%]" onClick={clearSelects}>
            <p className="bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2 cursor-pointer font-bold">
              Reset Filters
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-1 justify-items-center pt-5">
        {loading && <div className="lds-dual-ring"></div>}
        {!loading && (
          <>
            <Table
              containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
              tableStyles={"table-zebra !text-sm"}
              colStyles={"p-2"}
              thStyles={"sticky text-white"}
              cols={[
                "Membership ID",
                "Company Name",
                "Region",
                // "Country",
                // "Company Type",
                "Company Level",
                "Company Status",
                "Company Active Users",
                "VIP CC Renewal (USD)",
                "VIP CC New Business (USD)",
                "VIP DC Renewal (USD)",
                "VIP DC New Business (USD)",
                "VMP CC Renewal (USD)",
                "VMP CC New Business (USD)",
                "VMP DC Renewal (USD)",
                "VMP DC New Business",
                "VIP Revenue Q1 (USD)",
                "VIP Revenue Q2 (USD)",
                "VIP Revenue Q3 (USD)",
                "VIP Revenue Q4 (USD)",
                "VMP Revenue Q1 (USD)",
                "VMP Revenue Q2 (USD)",
                "VMP Revenue Q3 (USD)",
                "VMP Revenue Q4 (USD)",
                "Revenue Q1 (USD)",
                "Revenue Q2 (USD)",
                "Revenue Q3 (USD)",
                "Revenue Q4 (USD)",
                "Actual Revenue",
                "Sales DigiPoints",
              ]}
            >
              {currentItems &&
                [...currentItems].map((data, index) => (
                  <tr key={index}>
                    <th className="text-left py-3 mx-7">{data.company_id}</th>
                    <th className="text-left py-3 mx-7">{data.company_name}</th>
                    <th className="text-left py-3 mx-7">{data.region}</th>
                    {/* <th className="text-left py-3 mx-7">{data.country_id}</th> */}
                    <th className="text-left py-3 mx-7">{data.level}</th>
                    <th className="text-left py-3 mx-7">{data.active}</th>
                    <th className="text-left py-3 mx-7">{data.usuarios}</th>
                    <th className="text-left py-3 mx-7">
                      {numberToMoney(data.vip_cc_renewal)}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vip_cc_newbusiness}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vip_dc_renewal}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vip_dc_newbusiness}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vmp_cc_renewal}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vmp_cc_newbusiness}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vmp_dc_renewal}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vmp_dc_newbusiness}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vip_revenue_q1}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vip_revenue_q2}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vip_revenue_q3}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vip_revenue_q4}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vmp_revenue_q1}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vmp_revenue_q2}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vmp_revenue_q3}
                    </th>
                    <th className="text-left py-3 mx-7">
                      $ {data.vmp_revenue_q4}
                    </th>
                    <th className="text-left py-3 mx-7">{data.revenue_q1}</th>
                    <th className="text-left py-3 mx-7">{data.revenue_q2}</th>
                    <th className="text-left py-3 mx-7">{data.revenue_q3}</th>
                    <th className="text-left py-3 mx-7">{data.revenue_q4}</th>
                    <th className="text-left py-3 mx-7">
                      {data.actual_revenue}
                    </th>
                    <th className="text-left py-3 mx-7">{data.puntos}</th>
                  </tr>
                ))}
            </Table>
          </>
        )}
      </div>
      <div className="w-full pt-5">
        {!loading && (
          <>
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
  );
};

export default SalesPerformance;
