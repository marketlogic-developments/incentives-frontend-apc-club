import React from "react";
import { useSelector } from "react-redux";
import NoDataRanking from "./tableStatsElements/NoDataRanking";
import { useTranslation } from "react-i18next";

const TableTopsRanking = ({
  containerStyles = "",
  tableStyles = "",
  thStyles = "",
  cols = [],
  children,
}) => {
  const ranking = useSelector((state) => state.user.ranking);
  const [t, i18n] = useTranslation("global");
  return (
    <div className={`w-full overflow-y-auto ${containerStyles}`}>
      <table className={`w-full table-auto ${tableStyles}`}>
        <thead className={`bg-black ${thStyles}`}>
          <tr>
            {cols.length !== 0 && cols.map((col) => <th className="p-4">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {ranking.length !== 0 &&
            ranking.map((data, index) => (
              <tr>
                <td className="p-2 text-2xl font-bold">#{data.ranking}</td>
                <td className="">{data.names}</td>
                <td className="">{data.email}</td>
                <td className="">{data.region}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mb-6">{ranking.length === 0 && <NoDataRanking />}</div>
    </div>
  );
};

export default TableTopsRanking;
{
  /* <table className="w-full table-fixed tableJustify !text-sm overflow-hidden rounded-md">
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
        </table> */
}
