import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowDown,
  CloudDownload,
  RocketIcon,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import {
  BtnWithImage,
  DropDownReport,
  TitleWithIcon,
  SelectInputValue,
} from "../../../components";
import { useRouter } from "next/router";
import SortedTable from "../../../components/table/SortedTable";
import {
  importCsvFunction,
  importExcelFunction,
  digiPointsPerformanceColumnsCsv,
  digiPointsPerformanceColumnsExcel,
} from "../../../components/functions/reports";
import axios from "axios";

const DigiPointsPerformance = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.currentUser);
  const [filters, setFilters] = useState({
    "Company Name": "",
    "Company Level": "",
    Region: "",
  });
  const [selectOne, setSelectOne] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
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
    const fetchDigipointPerfomance = async () => {
      if (user) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=04c31aa2-84b3-4d18-860d-21b2a42d088b`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token ?? token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response?.data?.result ?? []);
      }
    };

    fetchDigipointPerfomance();
  }, [token, isLoaded]);

  const importFile = async (data) => {
    const columns = digiPointsPerformanceColumnsCsv(data);
    await importCsvFunction({
      data,
      columns,
      downloadTitle: "DigiPoints Performance",
    });
  };

  const importFileExcel = async (data) => {
    await importExcelFunction({
      data,
      columns: digiPointsPerformanceColumnsExcel,
      downloadTitle: "DigiPoints Performance",
    });
  };

  const handleFilters = (name, value) => {
    if (name === "Company Name") {
      return setFilters({ "Company Level": "", Region: "", "Company Name": value });
    }
    return setFilters({ ...filters, [name]: value });
  };

  const setRegion = [
    ...new Set(data.filter((d) => d.Region !== null).map((d) => d.Region)),
  ];

  const setLevel = [
    ...new Set(
      data.filter((d) => d["Company Level"] !== null).map((d) => d["Company Level"])
    ),
  ];

  const filteredUsers = data.filter((user) => {
    if (
      selectOne &&
      !user["Company Name"]
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
      const companyFilter =
        filters["Company Name"] === "" ||
        item["Company Name"] === filters["Company Name"];
      const levelFilter =
        filters["Company Level"] === "" ||
        item["Company Level"] === filters["Company Level"];
      const regionFilter =
        filters.Region === "" || item.Region === filters.Region;
      return companyFilter && levelFilter && regionFilter;
    });
  }, [filters, filteredUsers]);

  const clearSelects = () => {
    setFilters({
      "Company Name": "",
      "Company Level": "",
      Region: "",
    });
  };

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return dataTable.length === 1
      ? dataTable
      : dataTable.slice(itemOffset, endOffset);
  }, [itemOffset, dataTable]);

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
        <TitleWithIcon icon={<RocketIcon />} title={"DigiPoints Performance"} />
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 mt-5">
        <div className="grid grid-cols-3 sm:justify-items-start justify-items-center mt-3 gap-3">
          <div className="sm:w-[90%] w-auto">
            <SelectInputValue
              placeholder={"Company Name"}
              value={filters["Company Name"]}
              data={[...new Set(filteredUsers.map((u) => u["Company Name"]))]}
              icon={<ArrowDown />}
              onChange={handleFilters}
              name={"Company Name"}
              searchable={true}
            />
          </div>
          <div className="sm:w-[90%] w-auto">
            <SelectInputValue
              placeholder={"Level"}
              value={filters["Company Level"]}
              data={setLevel}
              icon={<ArrowDown />}
              onChange={handleFilters}
              name={"Company Level"}
              disabled={filters["Company Name"] !== ""}
            />
          </div>
          <div className="sm:w-[90%] w-auto">
            <SelectInputValue
              placeholder={"Region"}
              value={filters.Region}
              data={setRegion}
              icon={<ArrowDown />}
              onChange={handleFilters}
              name={"Region"}
              disabled={filters["Company Name"] !== ""}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-rows-1 sm:justify-items-end justify-items-center mt-3">
          <DropDownReport icon={<CloudDownload />} title={t("Reportes.descargar")}>
            <BtnWithImage
              text={t("Reportes.descargar") + " CSV"}
              icon={<CloudDownload />}
              styles={"bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"}
              onClick={() => importFile(dataTable)}
            />
            <BtnWithImage
              text={t("Reportes.descargar") + " Excel"}
              icon={<CloudDownload />}
              styles={"bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"}
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
      {loading && <div className="lds-dual-ring"></div>}
      {!loading && (
        <SortedTable
          containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
          tableStyles={"table-zebra !text-sm"}
          colStyles={"p-2"}
          thStyles={"sticky text-white"}
          cols={[
            { identity: "Company Name", columnName: "Company Name" },
            { identity: "Region", columnName: "Region" },
            { identity: "Company Level", columnName: "Company Level" },
            { identity: "Active Users Count", columnName: "Company Active Users" },
            { identity: "Total Uploaded DigiPoints", columnName: "Total DigiPoints Uploaded" },
            { identity: "Total Assigned DigiPoints", columnName: "Total Digipoints Assigned" },
            { identity: "Total Redeemed Points %", columnName: "Total Redeemed Points %" },
          ]}
          generalRowStyles={"text-left py-3 mx-7"}
          paginate={true}
          pageCount={pageCount}
          currentItems={currentItems}
          handlePageClick={handlePageClick}
        />
      )}
    </div>
  );
};

export default DigiPointsPerformance;
