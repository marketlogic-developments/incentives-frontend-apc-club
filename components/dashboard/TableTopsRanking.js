import React from "react";
import { useSelector } from "react-redux";
import NoDataRanking from "./tableStatsElements/NoDataRanking";

const TableTopsRanking = () => {
  const ranking = useSelector((state) => state.user.ranking);
  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">Top usuarios</h2>
      </div>
      <table className="w-full table-fixed tableJustify !text-sm">
        <thead className="bg-[#000000]">
          <tr className="text-white font-[700]">
            <th className="py-3">Puesto</th>
            <th className="py-3">Nombre</th>
            <th className="py-3">Email</th>
            <th className="py-3">Región</th>
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
      <div className="mb-6">{ranking.length === 0 && <NoDataRanking />}</div>
    </div>
  );
};

export default TableTopsRanking;
