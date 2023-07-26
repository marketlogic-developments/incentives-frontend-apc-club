import React from "react";
import { useSelector } from "react-redux";
import NoDataRanking from "./tableStatsElements/NoDataRanking";
import { useTranslation } from "react-i18next";
import InputReporte from "../cardReportes/InputReporte";
import { CloudDownload, SearchIcon } from "../icons";
import BtnWithImage from "../cardReportes/BtnWithImage";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";

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

  /* Download */
  const importFile = (data) => {
    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "Top_10_users.csv");
    });
  };

  console.log(ranking);

  return (
    <div className="grid w-full">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold">{t("dashboard.topUsuarios")}</h1>
        </div>
        <div className="cursor-pointer flex gap-3 items-center invisible">
          <svg
            width="19"
            height="11"
            viewBox="0 0 19 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5156 2.23438H1.48438C1.24817 2.23438 1.02163 2.14054 0.854608 1.97352C0.687583 1.80649 0.59375 1.57996 0.59375 1.34375C0.59375 1.10754 0.687583 0.881007 0.854608 0.713983C1.02163 0.546958 1.24817 0.453125 1.48438 0.453125H17.5156C17.7518 0.453125 17.9784 0.546958 18.1454 0.713983C18.3124 0.881007 18.4062 1.10754 18.4062 1.34375C18.4062 1.57996 18.3124 1.80649 18.1454 1.97352C17.9784 2.14054 17.7518 2.23438 17.5156 2.23438ZM14.5469 6.39062H4.45312C4.21692 6.39062 3.99038 6.29679 3.82336 6.12977C3.65633 5.96274 3.5625 5.73621 3.5625 5.5C3.5625 5.26379 3.65633 5.03726 3.82336 4.87023C3.99038 4.70321 4.21692 4.60938 4.45312 4.60938H14.5469C14.7831 4.60938 15.0096 4.70321 15.1766 4.87023C15.3437 5.03726 15.4375 5.26379 15.4375 5.5C15.4375 5.73621 15.3437 5.96274 15.1766 6.12977C15.0096 6.29679 14.7831 6.39062 14.5469 6.39062ZM10.9844 10.5469H8.01562C7.77942 10.5469 7.55288 10.453 7.38586 10.286C7.21883 10.119 7.125 9.89246 7.125 9.65625C7.125 9.42004 7.21883 9.19351 7.38586 9.02648C7.55288 8.85946 7.77942 8.76562 8.01562 8.76562H10.9844C11.2206 8.76562 11.4471 8.85946 11.6141 9.02648C11.7812 9.19351 11.875 9.42004 11.875 9.65625C11.875 9.89246 11.7812 10.119 11.6141 10.286C11.4471 10.453 11.2206 10.5469 10.9844 10.5469Z"
              fill="#1473E6"
            />
          </svg>
          <p className="text-info font-bold">Filtrar por</p>
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
              ranking.map((data, index) => (
                <tr>
                  <td className="p-2 text-2xl font-bold text-left">
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
