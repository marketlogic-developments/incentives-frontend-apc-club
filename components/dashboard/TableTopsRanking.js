import React from "react";
import { useSelector } from "react-redux";
import NoDataRanking from "./tableStatsElements/NoDataRanking";
import { useTranslation } from "react-i18next";

const TableTopsRanking = () => {
  const ranking = useSelector((state) => state.user.ranking);
  const [t, i18n] = useTranslation("global");
  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">Top usuarios</h2>
      </div>
      <div className="w-full max-h-[300px] overflow-y-auto">
        <table className="w-full table-fixed tableJustify !text-sm overflow-hidden rounded-md">
          <thead className="bg-[#000000] sticky top-0">
            <tr className="text-white font-[700]">
              <th className="py-3">Top</th>
              <th className="py-3">{t("tabla.nombre")}</th>
              <th className="py-3">Email</th>
              <th className="py-3">{t("tabla.region")}</th>
            </tr>
          </thead>
          <tbody>
            {ranking.length !== 0 &&
              ranking.map((data, index) => (
                <tr className={`${(index + 1) % 2 === 0 && "bg-[#F5F5F5]"}`}>
                  <td className="py-3">{data.ranking}</td>
                  <td className="py-3">{data.names}</td>
                  <td className="py-3">{data.email}</td>
                  <td className="py-3">{data.region}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">{ranking.length === 0 && <NoDataRanking />}</div>
    </div>
  );
};

export default TableTopsRanking;
