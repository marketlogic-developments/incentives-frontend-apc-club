import React from "react";

const TableSalePerformance = ({
  containerStyles = "",
  tableStyles = "",
  thStyles = "",
  labelCbStyles = "",
  checkboxStyles = "",
  cols = [],
  children,
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
            {cols.length !== 0 && cols.map((col) => <th>{col}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableSalePerformance;
