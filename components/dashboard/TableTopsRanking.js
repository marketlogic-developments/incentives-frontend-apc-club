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
            {cols.length !== 0 && cols.map((col) => <th className="text-left p-4">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {ranking.length !== 0 &&
            ranking.map((data, index) => (
              <tr>
                <td className="p-2 text-2xl font-bold text-left">#{data.ranking}</td>
                <td className="text-left">{data.names}</td>
                <td className="text-left">{data.email}</td>
                <td className="text-left">{data.region}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mb-6">{ranking.length === 0 && <NoDataRanking />}</div>
    </div>
  );
};

export default TableTopsRanking;
