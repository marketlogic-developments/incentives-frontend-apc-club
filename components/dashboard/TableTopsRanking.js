import React from "react";
import { useSelector } from "react-redux";
import NoDataRanking from "./tableStatsElements/NoDataRanking";
import { useTranslation } from "react-i18next";
import InputReporte from "../cardReportes/InputReporte";
import { ArrowDown, CloudDownload, SearchIcon } from "../icons";
import BtnWithImage from "../cardReportes/BtnWithImage";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import SelectInputValue from "../inputs/SelectInputValue";

const TableTopsRanking = ({
  containerStyles = "",
  tableStyles = "",
  thStyles = "",
  cols = [],
  children,
}) => {
  const ranking = useSelector((state) => state.user.ranking);
  const user = useSelector((state) => state.user.user);
  const [t, i18n] = useTranslation("global");
  const filters = {
    company: "",
    region: "",
    level: "",
  };

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

  return (
    <div className="grid w-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="!text-xl font-bold">{t("dashboard.topUsuarios")}</h2>
        </div>
        <div className="cursor-pointer flex gap-3 items-center invisible">
          <div className="sm:w-[90%] w-[60%]">
            <SelectInputValue
              placeholder={"Company Name"}
              // value={filters.company}
              // // data={filteredUsers.map(({ company_name }) => company_name)}
              icon={<ArrowDown />}
              // onChange={handleFilters}
              name={"company"}
            />
          </div>
        </div>
        <div className="cursor-pointer flex items-center invisible">
          <p className="text-[#828282]">Limpiar filtros</p>
        </div>
        {user.roleId === 1 && (
          <div>
            <BtnWithImage
              text={t("Reportes.descargar")}
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
          </div>
        )}
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
              ranking.slice(0, 5).map((data, index) => (
                <tr>
                  <td className="p-2 text-xl font-bold text-left">
                    #{data.ranking}
                  </td>
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
