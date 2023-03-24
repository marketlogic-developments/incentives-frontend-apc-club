import axios from "axios";
import React from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

const TableTyc = () => {
  const users = useSelector((state) => state.user.users);
  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState([]);
  const [dataTyc, setDataTyc] = useState([]);
  const [typeFilter, setTypeFilter] = useState(0);

  const importFile = (data) => {
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    XLSX.writeFile(workbook, "Usuarios TYC.xlsx");
  };

  const filterTyC = useMemo(() => {
    if (typeFilter === 0) {
      setData(users);
      return users;
    }
    if (typeFilter === 1) {
      setData(users.filter((data) => data.policy === true));
      return users.filter((data) => data.policy === true);
    }
    if (typeFilter === 2) {
      setData(
        users.filter((data) => data.cpf !== "active" && data.policy === false)
      );
      return users.filter(
        (data) => data.cpf !== "active" && data.policy === false
      );
    }
    if (typeFilter === 3) {
      setData(
        users.filter((data) => data.cpf === "active" && data.policy === false)
      );
      return users.filter(
        (data) => data.cpf === "active" && data.policy === false
      );
    }
  }, [typeFilter]);

  console.table(dataTyc);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex justify-between">
        <select
          className="select w-1/2 max-w-xs"
          onChange={(e) => setTypeFilter(Number(e.target.value))}
        >
          <option value="0">Selecciona un filtro</option>
          <option value="1">Quienes han sido aprobados</option>
          <option value="2">Quienes no han entrado por aprobación</option>
          <option value="3">Quienes están esperando por aprobación</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={() => {
            importFile(data);
          }}
        >
          Exportar
        </button>
      </div>

      <table className="w-full text-left text-black-500 border-2 text-xs">
        <thead className="text-xs text-black-500 uppercase">
          <tr>
            <th scope="col" className="py-3 px-6">
              Nombre
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              Esperando por Aprobación
            </th>
            <th scope="col" className="py-3 px-6">
              Acceso a APC
            </th>
          </tr>
        </thead>
        <tbody>
          {filterTyC.map((data) => {
            return (
              <tr className={`bg-white border-b dark:border-gray-500`}>
                <th className="py-4 px-6 font-bold">{data.name}</th>
                <th className="py-4 px-6 font-bold">{data.email}</th>
                <th className="py-4 px-6 font-bold">
                  {data.cpf === "active" ? "Si" : "No"}
                </th>
                <th className="py-4 px-6 font-bold">
                  {data.policy === true ? "Si" : "No"}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableTyc;
