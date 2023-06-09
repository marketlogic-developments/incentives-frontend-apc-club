import React from "react";

const TableSalePerformance = ({
  containerStyles = "",
  tableStyles = "",
  thStyles = "",
  labelCbStyles = "",
  checkboxStyles = "",
  cols = [],
}) => {
  return (
    <div className={`w-full overflow-y-auto ${containerStyles}`}>
      <table className={`w-full table-auto ${tableStyles}`}>
        <thead className={`bg-black ${thStyles}`}>
          <tr>
            <th>
              <label className={labelCbStyles}>
                <input
                  type="checkbox"
                  className={`checkbox ${checkboxStyles}`}
                />
              </label>
            </th>
            {cols.length !== 0 &&
              cols.map((col) => (
                  <th>{col}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm mt-1 border-white bg-base-200"
                />
              </label>
            </th>
            <td>
              <div className="flex justify-center">Adobe</div>
            </td>
            <td>
              <div className="flex justify-center">-</div>
            </td>
            <th>
              <div className="flex justify-center">Colombia</div>
            </th>
            <th>
              <div className="flex justify-center">Adobe</div>
            </th>
            <th>
              <div className="flex justify-center">ML0001</div>
            </th>
            <th>
              <div className="flex justify-center">Gold certified</div>
            </th>
            <th>
              <div className="flex justify-center">
                {"activo" === "inactivo" ? (
                  <div class="badge bg-red-200 text-red-600 text-sm">
                    Inactivo
                  </div>
                ) : (
                  <div class="badge bg-green-200 text-green-600 text-sm border-green-300">
                    Activo
                  </div>
                )}
              </div>
            </th>
            <th>
              <div className="flex justify-center">Sí</div>
            </th>
            <th>
              <div className="flex justify-center">0</div>
            </th>
            <th>
              <div className="flex justify-center">396,942</div>
            </th>
            <th>
              <div className="flex justify-center">0</div>
            </th>
          </tr>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm mt-1 border-white bg-base-200"
                />
              </label>
            </th>
            <td>
              <div className="flex justify-center">Adobe</div>
            </td>
            <td>
              <div className="flex justify-center">-</div>
            </td>
            <th>
              <div className="flex justify-center">Colombia</div>
            </th>
            <th>
              <div className="flex justify-center">Adobe</div>
            </th>
            <th>
              <div className="flex justify-center">ML0001</div>
            </th>
            <th>
              <div className="flex justify-center">Gold certified</div>
            </th>
            <th>
              <div className="flex justify-center">
                {"inactivo" === "inactivo" ? (
                  <div class="badge bg-red-200 text-red-600 text-sm">
                    Inactivo
                  </div>
                ) : (
                  <div class="badge bg-green-200 text-green-600 text-sm border-green-300">
                    Activo
                  </div>
                )}
              </div>
            </th>
            <th>
              <div className="flex justify-center">Sí</div>
            </th>
            <th>
              <div className="flex justify-center">0</div>
            </th>
            <th>
              <div className="flex justify-center">396,942</div>
            </th>
            <th>
              <div className="flex justify-center">0</div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableSalePerformance;
