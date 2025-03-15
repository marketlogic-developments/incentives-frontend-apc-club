import React from "react";
import { Menu, Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { VeticalPoints } from "../icons";

const TableUserPerformance = ({
    containerStyles = "",
    tableStyles = "",
    thStyles = "",
    labelCbStyles = "",
    checkboxStyles = "",
    cols = [],
    datas,
  }) => {
    const [t, i18n] = useTranslation("global");
  const tableMenu = (id) => {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button color="gray.0">
            <VeticalPoints />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => console.log("id:" + id)}>
            <a className="text-black">Opcion 1</a>
          </Menu.Item>
          <Menu.Item onClick={() => console.log("Opcion 2")}>
            <a className="text-black">Opcion 2</a>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  };
  return (
    <div className={`w-full overflow-y-auto ${containerStyles}`}>
      <table className={`w-full table-auto ${tableStyles}`}>
        <thead className={`bg-black ${thStyles}`}>
          <tr>
            <th>
              <label className={labelCbStyles}>
                <input type="checkbox" className={`${checkboxStyles}`} />
              </label>
            </th>
            {cols.length !== 0 &&
              cols.map((col) => <th className="text-left py-3">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {datas.length !== 0 &&
            datas.map((data, index) => (
              <tr>
                <th>
                  <label className="text-left px-2">
                    <input
                      type="checkbox"
                      className="!checkbox-xs mt-1 border-white bg-base-200"
                    />
                  </label>
                </th>
                <td className="text-left py-2">{data.compania}</td>
                <td className="text-left py-2">{data.region}</td>
                <td className="text-left py-2">{data.pais}</td>
                <td className="text-left py-2">{data.membership_Id}</td>
                <td className="text-left py-2">{data.tipo}</td>
                <td className="text-left py-2">{data.nivel}</td>
                <td className="text-left py-2">
                  {data.status === t("Reportes.inactivo") ? (
                    <div className="badge bg-red-200 text-red-600 text-sm text-left py-2">
                      {t("Reportes.inactivo")}
                    </div>
                  ) : (
                    <div className="badge bg-green-200 text-green-600 text-sm border-green-300 text-left py-2">
                      {t("Reportes.activo")}
                    </div>
                  )}
                </td>
                <td className="text-left py-2">{data.registrado}</td>
                <td className="text-left py-2">{data.cc_renewal}</td>
                <td className="text-left py-2">{data.cc_new_business}</td>
                <td className="text-left py-2">
                  <div className="grid grid-cols-2 items-center py-2">
                    <div className="grid text-left">{data.dc_renewal}</div>
                    <div className="grid justify-items-end mr-3 cursor-pointer">
                      {tableMenu(data.id)}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableUserPerformance