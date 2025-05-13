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
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";

const DigiPointsPerformance = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.currentUser);
  const [filters, setFilters] = useState({
    "Company Name": "",
    "Company Level": "",
    "Region": "",
  });
  const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState([]);
  const [t] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDigipointPerfomance = async () => {
      if (user) {
        setLoading(true);
        try {
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
        } catch (error) {
          console.error("Error fetching DigiPoints performance data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDigipointPerfomance();
  }, [token, user]);

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
    setFilters((prev) => ({
      ...prev,
      [name]: value || ""
    }));
  };

  const dataTable = useMemo(() => {
    return data.filter((item) => {
      const matchCompany = !filters["Company Name"] || 
        item["Company Name"] === filters["Company Name"];
      
      const matchRegion = !filters["Region"] || 
        item["Region"] === filters["Region"];
      
      const matchLevel = !filters["Company Level"] || 
        item["Company Level"] === filters["Company Level"];
      
      return matchCompany && matchRegion && matchLevel;
    });
  }, [filters, data]);

  const clearSelects = () => {
    setFilters({
      "Company Name": "",
      "Company Level": "",
      "Region": "",
    });
  };

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return dataTable.slice(itemOffset, endOffset);
  }, [itemOffset, dataTable]);

  const pageCount = useMemo(
    () => Math.ceil(dataTable.length / itemsPerPage),
    [dataTable, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataTable.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="mt-8">
      <div className="grid grid-rows-1">
        <TitleWithIcon icon={<RocketIcon />} title={"DigiPoints Performance"} />
      </div>

      <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
        <AiOutlineHome className="cursor-pointer" onClick={() => router.push("/dashboard")} />
        <span><AiOutlineRight /></span>
        <span className="cursor-pointer" onClick={() => router.push("/reportesDashboard")}>My Reports</span>
        <span><AiOutlineRight /></span>
        <span className="font-bold text-[#1473E6]">DigiPoints Performance</span>
      </div>
      
      <div className="grid sm:grid-cols-2 mt-5">
        <div className="grid sm:grid-cols-3 grid-cols-1 sm:justify-items-start justify-items-center mt-3 gap-3">
          <div className="sm:w-[90%] w-auto">
            <SelectInputValue
              placeholder="Company Name"
              name="Company Name"
              value={filters["Company Name"]}
              data={[...new Set(data.map((item) => item["Company Name"]).filter(Boolean))].map((name) => ({
                value: name,
                label: name
              }))}
              icon={<ArrowDown />}
              onChange={(value) => handleFilters("Company Name", value)}
              searchable
            />
          </div>
          <div className="sm:w-[90%] w-auto">
            <SelectInputValue
              placeholder="Company Level"
              name="Company Level"
              value={filters["Company Level"]}
              data={[...new Set(data.map((item) => item["Company Level"]).filter(Boolean))].map((level) => ({
                value: level,
                label: level
              }))}
              icon={<ArrowDown />}
              onChange={(value) => handleFilters("Company Level", value)}
              searchable
            />
          </div>
          <div className="sm:w-[90%] w-auto">
            <SelectInputValue
              placeholder="Region"
              name="Region"
              value={filters["Region"]}
              data={[...new Set(data.map((item) => item["Region"]).filter(Boolean))].map((region) => ({
                value: region,
                label: region
              }))}
              icon={<ArrowDown />}
              onChange={(value) => handleFilters("Region", value)}
              searchable
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 sm:justify-items-end justify-items-center mt-3 gap-3">
          <div className="sm:w-[90%] w-auto">
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
          </div>
          <div className="grid sm:w-[45%] w-auto" onClick={clearSelects}>
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
