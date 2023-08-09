import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import NoDataRanking from "./tableStatsElements/NoDataRanking";
import { useTranslation } from "react-i18next";
import InputReporte from "../cardReportes/InputReporte";
import { ArrowDown, CloudDownload, SearchIcon } from "../icons";
import BtnWithImage from "../cardReportes/BtnWithImage";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import SelectInputValue from "../inputs/SelectInputValue";
import { comment } from "postcss";
import axios from "axios";
import BtnFilter from "../cardReportes/BtnFilter";
import DropDownReport from "../cardReportes/DropDownReport";
import { utils, write } from "xlsx";

const TableTopsRanking = ({
  containerStyles = "",
  tableStyles = "",
  thStyles = "",
  cols = [],
  children,
}) => {
  const ranking = useSelector((state) => state.user.ranking);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [allCompanies, setAllCompanies] = useState([]);
  const [regions, setRegions] = useState([]);
  const [level, setLevel] = useState([]);
  const [t, i18n] = useTranslation("global");
  const [filters, setFilters] = useState({
    company: "",
    region: "",
  });

  /* Download */
  const importFile = (data) => {
    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Top_5_users.csv");
    });
  };

  const importFileExcel = (data) => {
    jsonexport(data, (error) => {
      if (error) {
        console.error(error);
        return;
      }
      const ws = utils.json_to_sheet(data);
      const wb = utils.book_new();
      utils.sheet_add_aoa(
        ws,
        [
          [
            "Ranking",
            "Names",
            "Email",
            "Region",
            "Country Id",
            "Position",
            "Amount by User",
            "Company",
            "Points Assigned",
          ],
        ],
        { origin: "A1" }
      );

      ws["!cols"] = [
        { wch: 8 },
        { wch: 30 },
        { wch: 38 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
        { wch: 14 },
        { wch: 50 },
        { wch: 14 },
      ];
      utils.book_append_sheet(wb, ws, "Top 5 usuarios");
      const blob = new Blob([write(wb, { bookType: "xlsx", type: "array" })], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Top_5_users.xlsx");
    });
  };

  useEffect(() => {
    const companies = axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/companies`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const distribution = axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/distribution-channel`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Promise.allSettled([companies, distribution]).then((res) => {
      const arrMap1 = res[0].value.data.map(({ name }) => ({ name: name }));
      const arrMap2 = res[1].value.data.map(({ nameDist }) => ({
        nameDist: nameDist,
      }));

      setAllCompanies([...arrMap1, ...arrMap2].sort());
    });
  }, []);

  const funRegions = useMemo(() => {
    const regions = [...new Set(ranking.map(({ region }) => region))];

    setRegions(regions);
  }, [ranking]);

  const handleFilter = (name, info) => {
    const { [name]: extractedValue, ...rest } = filters;
    const keys = Object.keys(rest);
    console.log(keys);
    setFilters({ [keys[0]]: "", [name]: info });
  };

  return (
    <div className="grid w-full">
      <div className="sm:flex justify-between items-center">
        <div>
          <h2 className="!text-xl font-bold">{t("dashboard.topUsuarios")}</h2>
        </div>
        <div className="cursor-pointer flex gap-3 items-center">
          <div className="sm:w-[90%] w-[60%]">
            <SelectInputValue
              placeholder={"Company Name"}
              searchable={true}
              value={filters.company}
              data={allCompanies
                .map(({ name, nameDist }) => name || nameDist)
                .sort()}
              icon={<ArrowDown />}
              onChange={handleFilter}
              name={"company"}
            />
          </div>
          <div className="sm:w-[90%] w-[60%]">
            <SelectInputValue
              placeholder={"Región"}
              value={filters.region}
              data={regions.map((i) => i)}
              icon={<ArrowDown />}
              onChange={handleFilter}
              name={"region"}
            />
          </div>
          <BtnFilter
            text={t("Reportes.limpiar_filtros")}
            styles="bg-white !text-blue-500 sm:!text-base hover:bg-white border-none hover:border-none m-1"
            onClick={() => setFilters({ company: "", region: "" })}
          />
        </div>
        {user.roleId === 1 && (
          <div className="sm:w-[20%] w-[60%]">
            <DropDownReport
              icon={<CloudDownload />}
              title={t("Reportes.descargar")}
            >
              <BtnWithImage
                text={t("Reportes.descargar") + " csv"}
                icon={<CloudDownload />}
                styles={
                  "bg-white btn-sm !text-blue-500 sm:!text-base hover:bg-white border-none mt-2"
                }
                onClick={() => {
                  const newRank = ranking.map((data) => {
                    const { employ_id, ...info } = data;

                    return info;
                  });
                  return importFile(newRank);
                }}
              />
              <BtnWithImage
                text={t("Reportes.descargar") + " excel"}
                icon={<CloudDownload />}
                styles={
                  "bg-white btn-sm !text-blue-500 sm:!text-base hover:bg-white border-none mt-2"
                }
                onClick={() => {
                  const newRank = ranking.map((data) => {
                    const { employ_id, ...info } = data;

                    return info;
                  });
                  return importFileExcel(newRank);
                }}
              />
            </DropDownReport>
          </div>
        )}
      </div>

      <div className={`w-full overflow-y-auto ${containerStyles}`}>
        <table className={`w-full table-auto ${tableStyles}`}>
          <thead className={`bg-black ${thStyles}`}>
            <tr>
              {cols.length !== 0 &&
                cols.map((col) => <th className="text-left p-4">{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {ranking.length !== 0 &&
              [...ranking]
                .filter((i) => {
                  if (filters.region.length > 0) {
                    return (
                      i.region ===
                      (filters.region == "LATAM"
                        ? setFilters({
                            ...filters,
                            region: "",
                          })
                        : filters.region)
                    );
                  }
                  if (filters.company.length > 0) {
                    return i.company === filters.company;
                  }

                  return i;
                })
                .slice(0, 5)
                .map((data, index) => (
                  <tr>
                    {filters.company !== "" || filters.region !== "" ? (
                      <td className="p-2 text-xl font-bold text-left">
                        #{index + 1}
                      </td>
                    ) : (
                      <td className="p-2 text-xl font-bold text-left">
                        #{data.ranking}
                      </td>
                    )}

                    <td className="text-left">{data.names}</td>
                    <td className="text-left">{data.email}</td>
                    <td className="text-left">{data.region}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        <div className="mb-6">{ranking.length === 0 && <NoDataRanking />}</div>
      </div>
    </div>
  );
};

export default TableTopsRanking;
