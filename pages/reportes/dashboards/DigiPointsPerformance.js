import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDigiPointsPerformance,
} from "../../../store/reducers/sales.reducer";
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
import SortedTable from "../../../components/table/SortedTable";
import {
  importCsvFunction,
  importExcelFunction,
  digiPointsPerformanceColumnsCsv,
  digiPointsPerformanceColumnsExcel,
} from "../../../components/functions/reports";
const DigiPointsPerformance = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [filters, setFilters] = useState({
    company: "",
    level: "",
    region: "",
  });
  const [selectOne, setSelectOne] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [loadingBarChart, setLoadingBarChart] = useState(true);
  const router = useRouter();
  const sortedData = {};

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getDigiPointsPerformance(token))
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
  const importFile = async (data) => {
    const columns = digiPointsPerformanceColumnsCsv(data);
    const csvConfig = {
      data: data,
      columns: columns,
      downloadTitle: "DigiPoints Performance",
    };

    await importCsvFunction(csvConfig);
  };

  const importFileExcel = async (data) => {
    const excelConfig = {
      data: data,
      columns: digiPointsPerformanceColumnsExcel,
      downloadTitle: "DigiPoints Performance",
    };

    await importExcelFunction(excelConfig);
  };

  /* Selects */
  const handleFilters = (name, value) => {
    if (name === "company") {
      return setFilters({ level: "", region: "", company: value });
    }

    return setFilters({ ...filters, [name]: value });
  };

  const setRegion = [...new Set(data.map(({ region }) => region))];

  const setLevel = [...new Set(data.map(({ company_level }) => company_level))];

  /* Filter */
  const filteredUsers = data.filter((user) => {
    if (
      selectOne &&
      !user.company_name
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
      const companyFilter = filters.company === "" || item.company_name === filters.company;
      const levelFilter = filters.level === "" || item.company_level === filters.level;
      const regionFilter = filters.region === "" || item.region === filters.region;
  
      return companyFilter && levelFilter && regionFilter;
    });
  }, [filters, filteredUsers]);
  
  

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
          title={"DigiPoints Performance"}
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
          {"DigiPoints Performance"}
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
        <CardChart title={"Goals vs. Sales"} paragraph="">
          <BarChar
            title={"Monthly sales"}
            colorBarOne={"black"}
            colorBarTwo={"#2799F6"}
            dataLeyend={["Goals", "Current sales"]}
            dataOne={goalAmount}
            dataTwo={totalSales}
            xValues={xValuesLine}
          />
        </CardChart>
        <CardChart title={t("Reportes.digiponits")}>
          <LineChart
            title={"Monthly loaded DigiPoints"}
            color={"red"}
            xValues={xValuesLine}
            data={totalPointsAssigned}
          />
        </CardChart>
      </div> */}
      <div className="grid sm:grid-cols-2 grid-rows-1 mt-5">
        <div className="grid sm:grid-cols-3 sm:justify-items-start justify-items-center mt-3">
          <div className="sm:w-[90%] w-[60%]">
            <SelectInputValue
              placeholder={"Company Name"}
              value={filters.company}
              data={filteredUsers.map(({ company_name }) => company_name)}
              icon={<ArrowDown />}
              onChange={handleFilters}
              name={"company"}
              searchable={true}
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
          <DropDownReport
            icon={<CloudDownload />}
            title={t("Reportes.descargar")}
          >
            <BtnWithImage
              text={t("Reportes.descargar") + " CSV"}
              icon={<CloudDownload />}
              styles={
                "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
              }
              onClick={() => importFile(dataTable)}
            />
            <BtnWithImage
              text={t("Reportes.descargar") + " Excel"}
              icon={<CloudDownload />}
              styles={
                "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
              }
              onClick={() => importFileExcel(dataTable)}
            />
          </DropDownReport>
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
          <SortedTable
            containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
            tableStyles={"table-zebra !text-sm"}
            colStyles={"p-2"}
            thStyles={"sticky text-white"}
            cols={[
              {
                rowStyles: "",
                sort: true,
                symbol: "",
                identity: "company_name",
                columnName: "Company Name",
              },
              { symbol: "", identity: "region", columnName: "Region" },
              { symbol: "", identity: "company_level", columnName: "Company Level" },
              {
                symbol: "",
                identity: "company_active_users",
                columnName: "Company Active Users",
              },
              {
                symbol: "",
                sort: true,
                identity: "so_digipoints",
                columnName: "Total DigiPoints Uploaded",
              },
              {
                symbol: "",
                sort: true,
                identity: "total_digipoints_assigned",
                columnName: "Total Digipoints Assigned",
              },
              {
                symbol: "",
                sort: true,
                identity: "digipoints_redeemed",
                columnName: "DigiPoints Redeemed",
              },
              {
                symbol: "",
                sort: true,
                identity: "total_avg_effectiveness",
                columnName: "Total % effectiveness ",
              },
            ]}
            generalRowStyles={"text-left py-3 mx-7"}
            paginate={true}
            pageCount={pageCount}
            currentItems={currentItems}
            handlePageClick={handlePageClick}
          />
        )}
      </div>
    </div>
  );
};

export default DigiPointsPerformance;
